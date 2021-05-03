import {
  Field,
  GraphQLISODateTime,
  HideField,
  ID,
  ObjectType,
  OmitType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MaritalStatus, Sex } from 'src/shared/enums';

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
  @Prop({ type: String })
  dob?: string;

  @Field(() => Sex) @Prop({ required: true }) sex: Sex;

  @Field(() => String) @Prop({ required: true, unique: true }) mobile: string;

  @Field(() => String)
  @Prop({ required: true, unique: true })
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

  @Field(() => String, { nullable: true }) @Prop() dpPath?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: new Date().toISOString() })
  createdAt?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: new Date().toISOString() })
  lastModifiedAt?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Homestay',
    default: [],
  })
  homestays?: MongooseSchema.Types.ObjectId[];
}

@ObjectType()
export class OwnerLoginResponse {
  @Field(() => String) token: string;
  @Field(() => String) email: string;
  @Field(() => ID) _id: MongooseSchema.Types.ObjectId;
}
@ObjectType()
export class OwnerPaswordUpdateResponse {
  @Field(() => String) email: string;
  @Field(() => ID) _id: MongooseSchema.Types.ObjectId;
}

export class OwnerOutput extends OmitType(Owner, ['password']) {}

export type OwnerDocument = Owner & Document;

export const OwnerSchema = SchemaFactory.createForClass(Owner);
