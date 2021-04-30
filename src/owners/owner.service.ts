import { Injectable } from '@nestjs/common';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  Homestay,
  HomeStayDocument,
} from 'src/homestays/schema/homestay.schema';
import { Owner, OwnerDocument } from './schema/owner.schema';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
    @InjectModel(Homestay.name) private homestayModel: Model<HomeStayDocument>,
  ) {}

  async create(payload: CreateOwnerInput) {
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
export class CreateOwnerInput extends PartialType(Owner, InputType) {}
@InputType()
export class ListOwnerInput extends PartialType(CreateOwnerInput) {}

@InputType()
export class UpdateOwnerInput extends OmitType(ListOwnerInput, ['_id']) {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;
}
