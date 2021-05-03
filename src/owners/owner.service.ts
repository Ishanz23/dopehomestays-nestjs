import { Injectable } from '@nestjs/common';
import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import {
  Homestay,
  HomeStayDocument,
} from 'src/homestays/schema/homestay.schema';
import { Owner, OwnerDocument } from './schema/owner.schema';
import { GraphQLError } from 'graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OwnerService {
  saltOrRounds: string;

  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
    @InjectModel(Homestay.name) private homestayModel: Model<HomeStayDocument>,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {
    this.saltOrRounds = genSaltSync(configService.get<number>('SALT'));
  }

  async create(payload: CreateOwnerInput) {
    payload.password = hashSync(payload.password, this.saltOrRounds);
    const savedOwner = await this.ownerModel.create(payload);

    this.addOwnerToHomestay(payload.homestays, savedOwner._id);

    return savedOwner;
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.ownerModel.findById(_id).exec();
  }

  list(filters: ListOwnerInput) {
    return this.ownerModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateOwnerInput) {
    const updatedOwner = await this.ownerModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();

    this.addOwnerToHomestay(payload.homestays, updatedOwner._id);

    return updatedOwner;
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.ownerModel.findByIdAndDelete(_id).exec();
  }

  async login(email: string, password: string) {
    const owner = await this.ownerModel.findOne({ email }).exec();
    return owner && compareSync(password, owner.password)
      ? {
          token: await this.jwtService.signAsync({ id: owner._id, email }),
          email,
          id: owner._id,
        }
      : new GraphQLError('email/password is invalid');
  }

  /**
   * Update Owner's password in DB
   * @param param0: UpdateOwnerPassword
   * @returns
   */
  async updateOwnerPassword({
    _id,
    currentPassword,
    newPassword,
  }: UpdateOwnerPassword) {
    const owner = await this.ownerModel.findById(_id).exec();
    if (owner && compareSync(currentPassword, owner.password)) {
      const updatedOwner = await this.ownerModel
        .findByIdAndUpdate(_id, {
          password: hashSync(newPassword, this.saltOrRounds),
        })
        .exec();
      return { email: updatedOwner.email, _id };
    } else {
      return new GraphQLError('Current Password is invalid');
    }
  }

  private addOwnerToHomestay(
    homestays: MongooseSchema.Types.ObjectId[],
    ownerId: MongooseSchema.Types.ObjectId,
  ) {
    if (homestays && homestays.length) {
      homestays.forEach((homestayId) => {
        console.log(homestayId);
        const homestayCursor = this.homestayModel.findById(homestayId);
        homestayCursor.exec().then((homestay) => {
          console.log(ownerId);
          let owners = [];
          if (homestay) {
            owners = [...homestay.owners, ownerId].filter((owner) => owner);
          } else {
            owners = [];
          }
          homestayCursor.updateOne({ _id: homestayId }, { owners }).exec();
        });
      });
    }
  }
}

@InputType()
export class CreateOwnerInput extends PartialType(Owner, InputType) {
  @Field(() => String) password: string;
}
@InputType()
export class ListOwnerInput extends PartialType(
  OmitType(CreateOwnerInput, ['password'] as const),
) {}

@InputType()
export class UpdateOwnerInput extends OmitType(CreateOwnerInput, [
  '_id',
  'password',
  'createdAt',
  'lastModifiedAt',
] as const) {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;
}
@InputType()
export class UpdateOwnerPassword {
  @Field(() => ID) _id: MongooseSchema.Types.ObjectId;
  @Field(() => String) currentPassword: string;
  @Field(() => String) newPassword: string;
}
