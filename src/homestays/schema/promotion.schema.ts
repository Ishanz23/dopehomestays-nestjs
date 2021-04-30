import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';

@Schema()
export class Promotion {
  @Prop() plan: string;

  @Prop() priority: number;
}

export type PromotionDocument = Promotion & Document;

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
