import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Owner {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;

  @Field(() => String) @Prop({ required: true }) firstName: string;

  @Field(() => String, { nullable: true }) @Prop() lastName: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ type: MongooseSchema.Types.Date })
  dob: Date;

  @Field(() => String) @Prop({ required: true }) sex: string;

  @Field(() => String) @Prop({ required: true }) mobile: string;

  @Field(() => String, { nullable: true })
  @Prop()
  email: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Homestay',
    default: [],
  })
  homestays: MongooseSchema.Types.ObjectId[];
}

export type OwnerDocument = Owner & Document;

export const OwnerSchema = SchemaFactory.createForClass(Owner);
