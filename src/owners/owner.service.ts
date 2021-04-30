import { Injectable } from '@nestjs/common';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Owner, OwnerDocument } from './schema/owner.schema';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  create(payload: CreateOwnerInput) {
    const owner = new this.ownerModel(payload);
    return owner.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.ownerModel.findById(_id).exec();
  }

  list(filters: ListOwnerInput) {
    return this.ownerModel.find({ ...filters }).exec();
  }

  update(payload: UpdateOwnerInput) {
    return this.ownerModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.ownerModel.findByIdAndDelete(_id).exec();
  }
}

@InputType()
export class CreateOwnerInput {
  @Field(() => String) firstName: string;
  @Field(() => String, { nullable: true }) lastName: string;
  @Field(() => GraphQLISODateTime, { nullable: true }) dob: Date;
  @Field(() => String) sex: string;
  @Field(() => String) mobile: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => [String], { nullable: 'itemsAndList' })
  homestays: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListOwnerInput {
  @Field(() => String, { nullable: true }) _id?: MongooseSchema.Types.ObjectId;
  @Field(() => String, { nullable: true }) firstName?: string;
  @Field(() => String, { nullable: true }) lastName?: string;
  @Field(() => GraphQLISODateTime, { nullable: true }) dob?: Date;
  @Field(() => String, { nullable: true }) sex?: string;
  @Field(() => String, { nullable: true }) mobile?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => [String], { nullable: 'itemsAndList' })
  homestays?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdateOwnerInput {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;
  @Field(() => String, { nullable: true }) firstName?: string;
  @Field(() => String, { nullable: true }) lastName?: string;
  @Field(() => GraphQLISODateTime, { nullable: true }) dob?: Date;
  @Field(() => String, { nullable: true }) sex?: string;
  @Field(() => String, { nullable: true }) mobile?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => [String], { nullable: 'itemsAndList' })
  homestays?: MongooseSchema.Types.ObjectId[];
}
