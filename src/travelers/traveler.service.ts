import { Injectable } from '@nestjs/common';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Traveler, TravelerDocument } from './schema/traveler.schema';

@Injectable()
export class TravelerService {
  constructor(
    @InjectModel(Traveler.name) private travelerModel: Model<TravelerDocument>,
  ) {}

  async create(payload: CreateTravelerInput) {
    const savedTraveler = await this.travelerModel.create(payload);

    return savedTraveler;
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.travelerModel.findById(_id).exec();
  }

  getByEmail(email: string) {
    return this.travelerModel.findOne({ email }).exec();
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
}

@InputType()
export class CreateTravelerInput extends PartialType(Traveler, InputType) {
  @Field(() => String) password: string;
}
@InputType()
export class ListTravelerInput extends PartialType(CreateTravelerInput) {}

@InputType()
export class UpdateTravelerInput extends OmitType(ListTravelerInput, ['_id']) {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;
}
