import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { experiencesApi } from '../services/api';
import Loading from '../components/Loading';
import type { Experience, Slot } from '../types';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await experiencesApi.getById(id!);
      setExperience(data);
      if (data.availableDates.length > 0) {
        setSelectedDate(data.availableDates[0].date);
      }
    } catch (err) {
      setError('Failed to load experience details. Please try again later.');
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    navigate('/checkout', {
      state: {
        experience,
        selectedDate,
        selectedSlot,
        numberOfPeople,
      },
    });
  };

  if (loading) return <Loading />;

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error || 'Experience not found'}</p>
          <button onClick={() => navigate('/')} className="mt-4 btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const selectedDateData = experience.availableDates.find(d => d.date === selectedDate);
  // Calculate pricing - 5.9% tax
  const subtotal = (selectedSlot?.price || experience.price) * numberOfPeople;
  const taxes = Math.round(subtotal * 0.059);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-900 mb-6 font-semibold hover:text-[#f0c419] transition-all duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="card">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Title */}
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {experience.title}
              </h1>
              <p className="text-gray-700 leading-relaxed text-base">{experience.description}</p>
            </div>

            {/* Choose Date */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Choose date</h2>
              <div className="flex flex-wrap gap-2">
                {experience.availableDates.map((dateData) => (
                  <button
                    key={dateData.date}
                    onClick={() => {
                      setSelectedDate(dateData.date);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedDate === dateData.date
                        ? 'bg-[#F4D03F] text-black shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {format(parseISO(dateData.date), 'MMM d')}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            {selectedDateData && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Choose time</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedDateData.slots.map((slot) => {
                    const isSoldOut = slot.availableSpots < numberOfPeople;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => !isSoldOut && setSelectedSlot(slot)}
                        disabled={isSoldOut}
                        className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 relative ${
                          selectedSlot?._id === slot._id
                            ? 'bg-[#F4D03F] text-black shadow-md'
                            : isSoldOut
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span>{slot.time}</span>
                        {!isSoldOut && (
                          <span className="ml-2 text-xs font-bold text-red-500 animate-pulse-subtle">{slot.availableSpots} left</span>
                        )}
                        {isSoldOut && (
                          <span className="ml-2 text-xs font-medium">Sold out</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* About */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">{experience.description}</p>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span className="font-medium">Starts at</span>
                <span className="font-bold text-xl text-gray-900">₹{selectedSlot?.price || experience.price}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 font-bold text-gray-700"
                  >
                    −
                  </button>
                  <span className="font-bold text-base">{numberOfPeople}</span>
                  <button
                    onClick={() => setNumberOfPeople(Math.min(8, numberOfPeople + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 font-bold text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!selectedSlot}
                  className={`w-full py-3 rounded-md font-bold text-base transition-all duration-300 ${
                    selectedSlot
                      ? 'bg-[#F4D03F] hover:bg-[#f0c419] text-black transform hover:scale-105 hover:shadow-lg active:scale-95'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
