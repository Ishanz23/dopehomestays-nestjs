import {
  Field,
  GraphQLISODateTime,
  HideField,
  ObjectType,
  OmitType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MaritalStatus, Sex } from 'src/shared/enums';
import { hideMiddleware } from '../middlewares/hide.middleware';

registerEnumType(Sex, { name: 'Sex' });
registerEnumType(MaritalStatus, { name: 'MaritalStatus' });

@ObjectType()
@Schema()
export class Owner {
  @Field(() => String) _id: MongooseSchema.Types.ObjectId;

  @Field(() => String) @Prop({ required: true }) firstName: string;

  @Field(() => String, { nullable: true }) @Prop() middleName?: string;

  @Field(() => String, { nullable: true }) @Prop() lastName?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ type: MongooseSchema.Types.Date })
  dob?: Date;

  @Field(() => Sex) @Prop({ required: true }) sex: Sex;

  @Field(() => String) @Prop({ required: true, unique: true }) mobile: string;

  @Field(() => String, { nullable: true })
  @Prop()
  email?: string;

  @Field(() => MaritalStatus, { nullable: true })
  @Prop()
  maritalStatus?: MaritalStatus;

  @HideField()
  @Prop({ required: true })
  password?: string;

  @Field(() => String, { nullable: true }) @Prop() address?: string;

  @Field(() => String) @Prop() state: string;

  @Field(() => String) @Prop() country: string;

  @Field(() => String, { nullable: true })
  @Prop()
  dpPath?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Homestay',
    default: [],
  })
  homestays?: MongooseSchema.Types.ObjectId[];
}

export class OwnerOutput extends OmitType(Owner, ['password']) {}

export type OwnerDocument = Owner & Document;

export const OwnerSchema = SchemaFactory.createForClass(Owner);
