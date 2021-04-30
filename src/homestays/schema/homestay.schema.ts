import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Owner } from '../../owners/schema/owner.schema';
import { Promotion } from './promotion.schema';

// @InputType()
@ObjectType()
@Schema()
export class RoomPlan {
  @Field(() => String) @Prop({ required: true }) id: string;
  @Field(() => String) @Prop({ required: true }) name: string;
  @Field(() => Float) @Prop({ required: true }) rate: number;
  @Field(() => String, { nullable: true })
  @Prop({ default: 'INR' })
  currency: string;
  @Field(() => Float, { nullable: true })
  @Prop({ default: 0 })
  discount: number;
  @Field(() => Boolean, { nullable: true })
  @Prop({ default: true })
  isDiscountPercentage: boolean;
}
@InputType()
export class RoomPlanInput {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => Float) rate: number;
  @Field(() => String, { nullable: true }) currency: string;
  @Field(() => Float, { nullable: true }) discount: number;
  @Field(() => Boolean, { nullable: true }) isDiscountPercentage: boolean;
}

export const RoomPlanSchema = SchemaFactory.createForClass(RoomPlan);
@ObjectType()
@Schema()
export class Room {
  @Field(() => String) @Prop({ required: true }) id: string;
  @Field(() => String) @Prop() name: string;
  @Field(() => String) @Prop() description: string;
  @Field(() => Int, { nullable: true }) @Prop({ default: 1 }) count: number;
  @Field(() => Int, { nullable: true }) @Prop({ default: 2 }) noOfHeads: number;
  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({ type: [String], default: [] })
  amenities: string[];
  @Field(() => [RoomPlan])
  @Prop({ type: [RoomPlanSchema] })
  plans: RoomPlan[];
}
@InputType()
export class RoomInput {
  @Field(() => String) id: string;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) description: string;
  @Field(() => Int, { nullable: true }) count: number;
  @Field(() => Int, { nullable: true }) noOfHeads: number;
  @Field(() => [String], { nullable: 'itemsAndList' }) amenities: string[];
  @Field(() => [RoomPlanInput])
  plans: RoomPlanInput[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

@ObjectType()
@Schema()
export class CancellationPolicy {
  @Field(() => Int) @Prop({ default: 7 }) daysAgo: number;
  @Field(() => Float) @Prop({ default: 5 }) charge: number;
  @Field(() => Boolean) @Prop({ default: true }) isPercentage: boolean;
}
@InputType()
export class CancellationPolicyInput {
  @Field(() => Int, { nullable: true }) daysAgo: number;
  @Field(() => Float, { nullable: true }) charge: number;
  @Field(() => Boolean, { nullable: true }) isPercentage: boolean;
}

export const CancellationPolicySchema = SchemaFactory.createForClass(
  CancellationPolicy,
);

@ObjectType()
@Schema()
export class Gallery {
  @Field(() => String) @Prop() name: string;
  @Field(() => String) @Prop() path: string;
}
@InputType()
export class GalleryInput {
  @Field(() => String) name: string;
  @Field(() => String) path: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);

@ObjectType()
@Schema()
export class Homestay {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;

  @Field(() => String) @Prop({ required: true }) name: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: 'Economy' })
  category: string;

  @Field(() => String, { nullable: true }) @Prop() description: string;

  @Field(() => String, { nullable: true }) @Prop() address: string;

  @Field(() => String) @Prop() place: string;

  @Field(() => String) @Prop({ required: true }) state: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: 'India' })
  country: string;

  @Field(() => String) @Prop({ required: true }) mobile: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: '11:00' })
  checkinTime: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: '10.00' })
  checkoutTime: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({ type: [String], default: [] })
  locationTags: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({ type: [String], default: [] })
  tags: string[];

  @Field(() => Boolean, { nullable: true })
  @Prop({ default: true })
  isActive: boolean;

  @Field(() => [CancellationPolicy], { nullable: 'itemsAndList' })
  @Prop({
    type: [CancellationPolicySchema],
    default: [],
  })
  cancellationPolicies: CancellationPolicy[];

  @Field(() => [Gallery], { nullable: 'itemsAndList' })
  @Prop({
    type: [GallerySchema],
    default: [],
  })
  gallery: Gallery[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Owner.name,
    default: [],
  })
  owners: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Promotion.name,
    default: [],
  })
  promotions: MongooseSchema.Types.ObjectId[];

  @Field(() => [Room])
  @Prop({ type: [RoomSchema], default: [] })
  rooms: Room[];
}

export type HomeStayDocument = Homestay & Document;

export const HomestaySchema = SchemaFactory.createForClass(Homestay);
