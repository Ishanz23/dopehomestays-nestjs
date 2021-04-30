import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { Booking } from '../../bookings/schema/booking.schema';

@Schema()
export class Traveler {
  @Prop() firstName: string;
  @Prop() middleName: string;
  @Prop() lastName: string;
  @Prop({ type: [{ type: schema.Types.ObjectId, ref: 'Booking' }] })
  bookings: Booking[];
}

export type TravelerDocument = Traveler & Document;

export const TravelerSchema = SchemaFactory.createForClass(Traveler);
