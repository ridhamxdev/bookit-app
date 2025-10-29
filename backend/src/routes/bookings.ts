import express, { Request, Response } from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import mongoose from 'mongoose';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', async (req: Request, res: Response) => {
  try {
    const { experienceId, date, slotId, numberOfPeople, customerInfo, promoCode } = req.body;

    // Validation
    if (!experienceId || !date || !slotId || !numberOfPeople || !customerInfo) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields' 
      });
    }

    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      return res.status(400).json({ 
        success: false,
        message: 'Customer information is incomplete' 
      });
    }

    // Find the experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ 
        success: false,
        message: 'Experience not found' 
      });
    }

    // Find the date and slot
    const dateData = experience.availableDates.find(d => d.date === date);
    if (!dateData) {
      return res.status(400).json({ 
        success: false,
        message: 'Selected date is not available' 
      });
    }

    const slot = dateData.slots.find(s => s._id?.toString() === slotId);
    if (!slot) {
      return res.status(400).json({ 
        success: false,
        message: 'Selected slot is not available' 
      });
    }

    // Check availability
    if (slot.availableSpots < numberOfPeople) {
      return res.status(400).json({ 
        success: false,
        message: 'Not enough spots available for the selected slot' 
      });
    }

    // Calculate pricing
    let totalAmount = slot.price * numberOfPeople;
    let discountAmount = 0;

    if (promoCode) {
      const promoResult = validatePromoCode(promoCode, totalAmount);
      if (promoResult.valid) {
        discountAmount = promoResult.discount;
      }
    }

    const finalAmount = totalAmount - discountAmount;

    // Generate booking ID
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create booking
    const booking = new Booking({
      experienceId: new mongoose.Types.ObjectId(experienceId),
      date,
      slotId,
      numberOfPeople,
      customerInfo,
      promoCode: promoCode || undefined,
      totalAmount,
      discountAmount,
      finalAmount,
      status: 'confirmed',
      bookingId,
    });

    await booking.save();

    // Update slot availability
    slot.availableSpots -= numberOfPeople;
    await experience.save();

    res.status(201).json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully',
      totalAmount,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create booking. Please try again.' 
    });
  }
});

// Helper function to validate promo codes
function validatePromoCode(code: string, amount: number) {
  const promoCodes: { [key: string]: { type: 'percentage' | 'fixed', value: number } } = {
    'SAVE10': { type: 'percentage', value: 10 },
    'FLAT100': { type: 'fixed', value: 100 },
    'WELCOME20': { type: 'percentage', value: 20 },
    'FIRSTBOOK': { type: 'fixed', value: 50 },
  };

  const promo = promoCodes[code.toUpperCase()];
  if (!promo) {
    return { valid: false, discount: 0 };
  }

  let discount = 0;
  if (promo.type === 'percentage') {
    discount = (amount * promo.value) / 100;
  } else {
    discount = promo.value;
  }

  return { valid: true, discount };
}

export default router;

