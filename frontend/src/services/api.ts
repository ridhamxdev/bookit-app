import axios from 'axios';
import type { Experience, BookingRequest, BookingResponse, PromoCodeResponse } from '../types';

// Backend API base URL - set in .env.local
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API calls for experiences
export const experiencesApi = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data;
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

// API calls for bookings
export const bookingsApi = {
  create: async (bookingData: BookingRequest): Promise<BookingResponse> => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
};

// API calls for promo codes
export const promoApi = {
  validate: async (code: string, amount: number): Promise<PromoCodeResponse> => {
    const response = await api.post('/promo/validate', { code, amount });
    return response.data;
  },
};

export default api;

