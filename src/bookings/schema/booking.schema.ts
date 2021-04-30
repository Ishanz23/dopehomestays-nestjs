import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Homestay } from '../../homestays/schema/homestay.schema';
import { Document, Schema as schema } from 'mongoose';

export class Guest {
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() mmiddleName: string;
  @Prop() dob: string;
  @Prop() age: string;
  @Prop() sex: string;
  @Prop() isMinor: boolean;
}

@Schema()
export class Booking {
  @Prop() bookingDate: string;
  @Prop() checkinDate: string;
  @Prop() checkoutDate: string;
  @Prop() totalAmount: number;
  @Prop() currency: string;
  @Prop() bookedDayCount: number;
  @Prop() advanceAmount: number;
  @Prop() dueAmount: number;
  @Prop() guests: Guest[];
  @Prop({ type: { type: schema.Types.ObjectId, ref: 'Homestay' } })
  homestay: Homestay;
}

export type BookingDocument = Booking & Document;

export const BookingSchema = SchemaFactory.createForClass(Booking);
