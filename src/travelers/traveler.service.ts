import { Injectable } from '@nestjs/common';
import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Traveler, TravelerDocument } from './schema/traveler.schema';
import { GraphQLError } from 'graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TravelerService {
  saltOrRounds: string;

  constructor(
    @InjectModel(Traveler.name) private travelerModel: Model<TravelerDocument>,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {
    this.saltOrRounds = genSaltSync(configService.get<number>('SALT'));
  }

  async create(payload: CreateTravelerInput) {
    payload.password = hashSync(payload.password, this.saltOrRounds);
    const savedTraveler = await this.travelerModel.create(payload);
    return savedTraveler;
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.travelerModel.findById(_id).exec();
  }

  list(filters: ListTravelerInput) {
    return this.travelerModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateTravelerInput) {
    const updatedTraveler = await this.travelerModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();

    return updatedTraveler;
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.travelerModel.findByIdAndDelete(_id).exec();
  }

  async login(email: string, password: string) {
    const traveler = await this.travelerModel.findOne({ email }).exec();
    return traveler && compareSync(password, traveler.password)
      ? {
          token: await this.jwtService.signAsync({ id: traveler._id, email }),
          email,
          id: traveler._id,
        }
      : new GraphQLError('email/password is invalid');
  }

  async mobileLogin(mobile: string, password: string) {
    const traveler = await this.travelerModel.findOne({ mobile }).exec();
    return traveler && compareSync(password, traveler.password)
      ? {
          token: await this.jwtService.signAsync({ id: traveler._id, mobile }),
          mobile,
          id: traveler._id,
        }
      : new GraphQLError('email/password is invalid');
  }

  /**
   * Update Traveler's password in DB
   * @param param0: UpdateTravelerPassword
   * @returns
   */
  async updateTravelerPassword({
    _id,
    currentPassword,
    newPassword,
  }: UpdateTravelerPassword) {
    const traveler = await this.travelerModel.findById(_id).exec();
    if (traveler && compareSync(currentPassword, traveler.password)) {
      const updatedTraveler = await this.travelerModel
        .findByIdAndUpdate(_id, {
          password: hashSync(newPassword, this.saltOrRounds),
        })
        .exec();
      return { email: updatedTraveler.email, _id };
    } else {
      return new GraphQLError('Current Password is invalid');
    }
  }
}

@InputType()
export class CreateTravelerInput extends PartialType(Traveler, InputType) {
  @Field(() => String) password: string;
}
@InputType()
export class ListTravelerInput extends PartialType(
  OmitType(CreateTravelerInput, ['password'] as const),
) {}

@InputType()
export class UpdateTravelerInput extends OmitType(CreateTravelerInput, [
  '_id',
  'password',
  'createdAt',
  'lastModifiedAt',
] as const) {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;
}
@InputType()
export class UpdateTravelerPassword {
  @Field(() => ID) _id: MongooseSchema.Types.ObjectId;
  @Field(() => String) currentPassword: string;
  @Field(() => String) newPassword: string;
}
