import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  date: string;
  slotId: string;
  numberOfPeople: number;
  customerInfo: ICustomerInfo;
  promoCode?: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingId: string;
}

const CustomerInfoSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specialRequests: { type: String },
});

const BookingSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  slotId: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  customerInfo: { type: CustomerInfoSchema, required: true },
  promoCode: { type: String },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'confirmed' },
  bookingId: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);

