import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Promotion {
  @Field(() => String) @Prop() plan: string;

  @Field(() => Int) @Prop() priority: number;

  @Field(() => GraphQLISODateTime)
  @Prop({ default: new Date() })
  createdAt?: MongooseSchema.Types.Date;

  @Field(() => GraphQLISODateTime)
  @Prop({ default: new Date() })
  lastModifiedAt?: MongooseSchema.Types.Date;
}

export type PromotionDocument = Promotion & Document;

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
