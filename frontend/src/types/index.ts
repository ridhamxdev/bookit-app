export interface Experience {
  _id: string;
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
  availableDates: AvailableDate[];
}

export interface AvailableDate {
  date: string;
  slots: Slot[];
}

export interface Slot {
  _id: string;
  time: string;
  availableSpots: number;
  maxCapacity: number;
  price: number;
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  slotId: string;
  numberOfPeople: number;
  customerInfo: CustomerInfo;
  promoCode?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
  totalAmount?: number;
  discountAmount?: number;
  finalAmount?: number;
}

export interface PromoCodeResponse {
  valid: boolean;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  message: string;
}

export interface PriceSummary {
  basePrice: number;
  numberOfPeople: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
}

