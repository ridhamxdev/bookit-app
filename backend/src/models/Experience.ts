import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
  _id?: string;
  time: string;
  availableSpots: number;
  maxCapacity: number;
  price: number;
}

export interface IAvailableDate {
  date: string;
  slots: ISlot[];
}

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  cancellationPolicy: string;
  availableDates: IAvailableDate[];
}

const SlotSchema = new Schema({
  time: { type: String, required: true },
  availableSpots: { type: Number, required: true },
  maxCapacity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const AvailableDateSchema = new Schema({
  date: { type: String, required: true },
  slots: [SlotSchema],
});

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  images: [String],
  highlights: [String],
  included: [String],
  notIncluded: [String],
  cancellationPolicy: { type: String },
  availableDates: [AvailableDateSchema],
}, { timestamps: true });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);

