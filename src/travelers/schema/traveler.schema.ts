import {
  Field,
  GraphQLISODateTime,
  HideField,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
@ObjectType()
@Schema()
export class Traveler {
  @Field(() => ID) _id: MongooseSchema.Types.ObjectId;
  @Field(() => String) @Prop() firstName: string;
  @Field(() => String, { nullable: true }) @Prop() middleName?: string;
  @Field(() => String, { nullable: true }) @Prop() lastName?: string;
  @Field(() => String) @Prop({ required: true, unique: true }) email: string;
  @Field(() => String) @Prop({ required: true, unique: true }) mobile: string;
  @HideField() @Prop({ required: true }) password: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: new Date() })
  createdAt?: MongooseSchema.Types.Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: new Date() })
  lastModifiedAt?: MongooseSchema.Types.Date;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [
      { type: [MongooseSchema.Types.ObjectId], ref: 'Booking', default: [] },
    ],
  })
  bookings: MongooseSchema.Types.ObjectId[];
}

export type TravelerDocument = Traveler & Document;

export const TravelerSchema = SchemaFactory.createForClass(Traveler);
