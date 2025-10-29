import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, bookingId, message } = location.state || {};

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-800 font-medium">No booking information found</p>
          <button onClick={() => navigate('/')} className="mt-4 btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        {success ? (
          <>
            {/* Success Icon */}
            <div className="flex justify-center animate-fade-in-up">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-14 h-14 text-white animate-pulse-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Booking Confirmed
              </h1>
              {bookingId && (
                <p className="text-lg text-gray-600 font-medium">
                  Ref ID: <span className="font-mono font-bold text-gray-900">{bookingId}</span>
                </p>
              )}
            </div>

            {/* Back Button */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary text-base"
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <div className="flex justify-center animate-fade-in-up">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Booking Failed
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                {message || 'An error occurred during booking'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => navigate(-1)}
                className="btn-primary"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Result;
