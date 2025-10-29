import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingsApi, promoApi } from '../services/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedDate, selectedSlot, numberOfPeople } = location.state || {};

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (!experience || !selectedDate || !selectedSlot) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-medium">No booking information found</p>
          <button onClick={() => navigate('/')} className="mt-4 btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Price calculations
  const subtotal = selectedSlot.price * numberOfPeople;
  const taxes = Math.round(subtotal * 0.059); // 5.9% tax
  const total = subtotal + taxes - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    try {
      setValidatingPromo(true);
      setPromoError('');
      // Check if promo code is valid
      const result = await promoApi.validate(promoCode, subtotal);

      if (result.valid) {
        let discountAmount = 0;
        if (result.discountType === 'percentage') {
          discountAmount = (subtotal * result.discountValue) / 100;
        } else {
          discountAmount = result.discountValue;
        }
        setDiscount(discountAmount);
        setPromoApplied(true);
      } else {
        setPromoError(result.message);
      }
    } catch (error) {
      setPromoError('Failed to validate promo code');
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!agreeTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);

      // Split full name into first and last
      const [firstName, ...lastNameParts] = fullName.trim().split(' ');
      const bookingData = {
        experienceId: experience._id,
        date: selectedDate,
        slotId: selectedSlot._id,
        numberOfPeople,
        customerInfo: {
          firstName,
          lastName: lastNameParts.join(' ') || firstName,
          email,
          phone: '0000000000',
        },
        promoCode: promoApplied ? promoCode : undefined,
      };

      const result = await bookingsApi.create(bookingData);

      navigate('/result', {
        state: {
          success: result.success,
          bookingId: result.bookingId,
          message: result.message,
          experience,
          selectedDate,
          selectedSlot,
          numberOfPeople,
          finalAmount: result.finalAmount,
        },
      });
    } catch (error: any) {
      navigate('/result', {
        state: {
          success: false,
          message: error.response?.data?.message || 'Booking failed. Please try again.',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-900 mb-6 font-semibold hover:text-[#f0c419] transition-all duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Checkout
        </button>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Promo code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      placeholder="Enter promo code"
                      className="input-field flex-1"
                      disabled={promoApplied || validatingPromo}
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || validatingPromo}
                      className="px-6 py-2.5 bg-black text-white rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-sm text-red-600">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="mt-2 text-sm text-green-600">Promo code applied!</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the terms and safety policy
                  </label>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Experience</span>
                    <span className="font-semibold">{experience.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Date</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Time</span>
                    <span className="font-semibold">{selectedSlot.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Qty</span>
                    <span className="font-semibold">{numberOfPeople}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span className="font-medium">Taxes</span>
                    <span className="font-semibold">₹{taxes}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#F4D03F] hover:bg-[#f0c419] text-black font-bold py-3 rounded-md transition-all duration-300 disabled:opacity-50 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    {submitting ? 'Processing...' : 'Pay and Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
