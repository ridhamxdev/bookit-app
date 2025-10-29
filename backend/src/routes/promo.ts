import express, { Request, Response } from 'express';

const router = express.Router();

// POST /api/promo/validate - Validate promo code
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code, amount } = req.body;

    if (!code || amount === undefined) {
      return res.status(400).json({
        valid: false,
        message: 'Code and amount are required',
        discountType: 'fixed',
        discountValue: 0,
      });
    }

    // Define promo codes
    const promoCodes: { 
      [key: string]: { 
        type: 'percentage' | 'fixed', 
        value: number,
        description: string 
      } 
    } = {
      'SAVE10': { type: 'percentage', value: 10, description: 'Save 10% on your booking' },
      'FLAT100': { type: 'fixed', value: 100, description: 'Get $100 off your booking' },
      'WELCOME20': { type: 'percentage', value: 20, description: 'Welcome discount: 20% off' },
      'FIRSTBOOK': { type: 'fixed', value: 50, description: 'First booking special: $50 off' },
    };

    const upperCode = code.toUpperCase();
    const promo = promoCodes[upperCode];

    if (!promo) {
      return res.json({
        valid: false,
        message: 'Invalid promo code',
        discountType: 'fixed',
        discountValue: 0,
      });
    }

    res.json({
      valid: true,
      discountType: promo.type,
      discountValue: promo.value,
      message: promo.description,
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      valid: false,
      message: 'Failed to validate promo code',
      discountType: 'fixed',
      discountValue: 0,
    });
  }
});

export default router;

