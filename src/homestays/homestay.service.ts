import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CancellationPolicy,
  CancellationPolicyInput,
  Gallery,
  GalleryInput,
  Homestay,
  HomeStayDocument,
  Room,
  RoomInput,
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
    return this.homestayModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.homestayModel.findByIdAndDelete(_id).exec();
  }
}

@InputType()
export class CreateHomestayInput {
  @Field(() => String) name: string;

  @Field(() => String, { nullable: true }) category: string;

  @Field(() => String, { nullable: true }) description: string;

  @Field(() => String) address: string;

  @Field(() => String) place: string;

  @Field(() => String, { nullable: true }) state: string;

  @Field(() => String, { nullable: true }) country: string;

  @Field(() => String) mobile: string;

  @Field(() => String, { nullable: true }) checkinTime: string;

  @Field(() => String, { nullable: true }) checkoutTime: string;

  @Field(() => [String], { nullable: 'itemsAndList' }) locationTags: string[];

  @Field(() => [String], { nullable: 'itemsAndList' }) tags: string[];

  @Field(() => Boolean, { nullable: true }) isActive: boolean;

  @Field(() => [GalleryInput], { nullable: 'itemsAndList' })
  gallery?: GalleryInput[];

  @Field(() => [CancellationPolicyInput], { nullable: 'itemsAndList' })
  cancellationPolicies?: CancellationPolicyInput[];

  @Field(() => [RoomInput]) rooms: RoomInput[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  owners: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  promotions?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListHomestaysInput {
  @Field(() => String, { nullable: true }) _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true }) name?: string;

  @Field(() => String, { nullable: true }) category?: string;

  @Field(() => String, { nullable: true }) description?: string;

  @Field(() => String, { nullable: true }) address?: string;

  @Field(() => String, { nullable: true }) place: string;

  @Field(() => String, { nullable: true }) state?: string;

  @Field(() => String, { nullable: true }) country?: string;

  @Field(() => String, { nullable: true }) mobile?: string;

  @Field(() => String, { nullable: true }) checkinTime?: string;

  @Field(() => String, { nullable: true }) checkoutTime?: string;

  @Field(() => [String], { nullable: 'itemsAndList' }) locationTags?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' }) tags?: string[];

  @Field(() => Boolean, { nullable: true }) isActive?: boolean;

  @Field(() => [GalleryInput], { nullable: 'itemsAndList' })
  gallery: GalleryInput[];

  @Field(() => [CancellationPolicyInput], { nullable: 'itemsAndList' })
  cancellationPolicies: CancellationPolicyInput[];

  @Field(() => [RoomInput], { nullable: 'itemsAndList' })
  rooms?: RoomInput[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  owners?: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  promotions?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdateHomestayInput {
  @Field(() => String) _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true }) name?: string;

  @Field(() => String, { nullable: true }) category?: string;

  @Field(() => String, { nullable: true }) description?: string;

  @Field(() => String, { nullable: true }) address?: string;

  @Field(() => String, { nullable: true }) place: string;

  @Field(() => String, { nullable: true }) state?: string;

  @Field(() => String, { nullable: true }) country?: string;

  @Field(() => String, { nullable: true }) mobile?: string;

  @Field(() => String, { nullable: true }) checkinTime?: string;

  @Field(() => String, { nullable: true }) checkoutTime?: string;

  @Field(() => [String], { nullable: 'itemsAndList' }) locationTags?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' }) tags?: string[];

  @Field(() => Boolean, { nullable: true }) isActive?: boolean;

  @Field(() => [GalleryInput], { nullable: 'itemsAndList' })
  gallery?: GalleryInput[];

  @Field(() => [CancellationPolicyInput], { nullable: 'itemsAndList' })
  cancellationPolicies?: CancellationPolicyInput[];

  @Field(() => [RoomInput], { nullable: 'itemsAndList' })
  rooms?: RoomInput[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  owners?: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  promotions?: MongooseSchema.Types.ObjectId[];
}
