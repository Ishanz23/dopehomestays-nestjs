import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Owner } from '../../owners/schema/owner.schema';
import { Promotion } from './promotion.schema';

@InputType()
@ObjectType()
@Schema()
export class RoomPlan {
  @Field(() => String) @Prop() name: string;
  @Field(() => Float) @Prop() rate: number;
  @Field(() => String) @Prop({ default: 'INR' }) currency: string;
  @Field(() => Float) @Prop({ default: 0 }) discount: number;
  @Field(() => Boolean) @Prop({ default: true }) isDiscountPercentage: boolean;
}

@InputType()
@ObjectType()
@Schema()
export class Room {
  @Field(() => String) @Prop({ required: true }) roomType: string;
  @Field(() => Int) @Prop({ default: 1 }) count: number;
  @Field(() => Int) @Prop({ default: 2 }) numberOfHeads: number;
  @Field(() => [String]) @Prop([String]) amenities: string[];
  // @Field(() => [RoomPlan])
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: RoomPlan.name }] })
  // plans: RoomPlan[];
}

@InputType()
@ObjectType()
@Schema()
export class CancellationPolicy {
  @Field(() => Int) @Prop({ default: 7 }) daysAgo: number;
  @Field(() => Float) @Prop({ default: 5 }) charge: number;
  @Field(() => Boolean) @Prop({ default: true }) isPercentage: boolean;
}

@InputType()
@ObjectType()
@Schema()
export class Gallery {
  @Field(() => String) @Prop() name: string;
  @Field(() => String) @Prop() path: string;
}

@ObjectType()
@Schema()
export class Homestay {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;

  @Field(() => String) @Prop({ required: true }) name: string;

  @Field(() => String) @Prop() category: string;

  @Field(() => String) @Prop() description: string;

  @Field(() => String) @Prop() address: string;

  @Field(() => String) @Prop({ required: true }) state: string;

  @Field(() => String) @Prop({ required: true }) country: string;

  @Field(() => String) @Prop({ required: true }) mobile: string;

  @Field(() => String) @Prop({ default: '11:00' }) checkinTime: string;

  @Field(() => String) @Prop({ default: '10.00' }) checkoutTime: string;

  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  locationTags: string[];

  @Field(() => [String]) @Prop({ type: [String], default: [] }) tags: string[];

  @Field(() => Boolean)
  @Prop({ default: true })
  isActive: boolean;

  // @Field(() => [CancellationPolicy])
  // @Prop({
  //   type: [
  //     {
  //       type: MongooseSchema.Types.ObjectId,
  //       ref: CancellationPolicy.name,
  //     },
  //   ],
  //   default: [],
  // })
  // cancellationPolicies: CancellationPolicy[];

  // @Field(() => [Gallery])
  // @Prop({
  //   type: [
  //     {
  //       type: MongooseSchema.Types.ObjectId,
  //       ref: Gallery.name,
  //     },
  //   ],
  //   default: [],
  // })
  // gallery: Gallery[];

  @Field(() => [String])
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Owner.name,
    default: [],
  })
  owners: MongooseSchema.Types.ObjectId[];

  @Field(() => [String])
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Promotion.name,
    default: [],
  })
  promotions: MongooseSchema.Types.ObjectId[];

  // @Field(() => [Room])
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Room.name }] })
  // rooms: Room[];
}

export type HomeStayDocument = Homestay & Document;

export const HomestaySchema = SchemaFactory.createForClass(Homestay);
