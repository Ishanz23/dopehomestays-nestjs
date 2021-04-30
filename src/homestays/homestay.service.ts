import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CancellationPolicy,
  Gallery,
  Homestay,
  HomeStayDocument,
  Room,
} from './schema/homestay.schema';
import { Field, InputType } from '@nestjs/graphql';

@Injectable()
export class HomestayService {
  constructor(
    @InjectModel(Homestay.name) private homestayModel: Model<HomeStayDocument>,
  ) {}

  create(payload: CreateHomestayInput) {
    const createdHomestay = new this.homestayModel(payload);
    return createdHomestay.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.homestayModel.findById(_id).exec();
  }

  list(filters: ListHomestaysInput) {
    return this.homestayModel.find({ ...filters }).exec();
  }

  update(payload: UpdateHomestayInput) {
    this.homestayModel.updateOne(payload._id, payload, { new: true }).exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.homestayModel.findByIdAndDelete(_id).exec();
  }
}

@InputType()
export class CreateHomestayInput {
  @Field(() => String) name: string;

  @Field(() => String) category: string;

  @Field(() => String) description: string;

  @Field(() => String) address: string;

  @Field(() => String) state: string;

  @Field(() => String) country: string;

  @Field(() => String) mobile: string;

  @Field(() => String) checkinTime: string;

  @Field(() => String) checkoutTime: string;

  @Field(() => [String]) locationTags: string[];

  @Field(() => [String]) tags: string[];

  @Field(() => Boolean) isActive: boolean;

  @Field(() => [Gallery]) gallery?: Gallery[];

  @Field(() => [CancellationPolicy])
  cancellationPolicies?: CancellationPolicy[];

  @Field(() => [Room]) rooms: Room[];

  @Field(() => [String]) owners: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  promotions?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListHomestaysInput {
  @Field(() => String, { nullable: true }) _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true }) name?: string;

  @Field(() => String, { nullable: true }) category?: string;

  @Field(() => String, { nullable: true }) description?: string;

  @Field(() => String, { nullable: true }) address?: string;

  @Field(() => String, { nullable: true }) state?: string;

  @Field(() => String, { nullable: true }) country?: string;

  @Field(() => String, { nullable: true }) mobile?: string;

  @Field(() => String, { nullable: true }) checkinTime?: string;

  @Field(() => String, { nullable: true }) checkoutTime?: string;

  @Field(() => [String], { nullable: true }) locationTags?: string[];

  @Field(() => [String], { nullable: true }) tags?: string[];

  @Field(() => Boolean, { nullable: true }) isActive?: boolean;

  @Field(() => [Gallery], { nullable: true })
  gallery: Gallery[];

  @Field(() => [CancellationPolicy], { nullable: true })
  cancellationPolicies: CancellationPolicy[];

  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @Field(() => [String], { nullable: true })
  owners?: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  promotions?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdateHomestayInput {
  @Field(() => String, { nullable: true }) _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true }) name?: string;

  @Field(() => String, { nullable: true }) category?: string;

  @Field(() => String, { nullable: true }) description?: string;

  @Field(() => String, { nullable: true }) address?: string;

  @Field(() => String, { nullable: true }) state?: string;

  @Field(() => String, { nullable: true }) country?: string;

  @Field(() => String, { nullable: true }) mobile?: string;

  @Field(() => String, { nullable: true }) checkinTime?: string;

  @Field(() => String, { nullable: true }) checkoutTime?: string;

  @Field(() => [String], { nullable: true }) locationTags?: string[];

  @Field(() => [String], { nullable: true }) tags?: string[];

  @Field(() => Boolean, { nullable: true }) isActive?: boolean;

  @Field(() => [Gallery], { nullable: true })
  gallery?: Gallery[];

  @Field(() => [CancellationPolicy], { nullable: true })
  cancellationPolicies?: CancellationPolicy[];

  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @Field(() => [String], { nullable: true })
  owners?: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  promotions?: MongooseSchema.Types.ObjectId[];
}
