import { useState } from 'react';
import { X, Calendar, Clock, Users, CreditCard, Check } from 'lucide-react';
import { Venue } from '../config';

interface BookingModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ venue, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '4',
    guests: '',
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    specialRequests: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
      // Here you would integrate with actual payment processor
      setTimeout(() => {
        onClose();
        setStep('details');
      }, 3000);
    }
  };

  const calculateTotal = () => {
    const hourlyRate = 350;
    const hours = parseInt(formData.duration) || 4;
    return hourlyRate * hours;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 md:p-8 rounded-t-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {step === 'confirmation' ? 'Booking Confirmed!' : `Book ${venue.name}`}
          </h2>
          <p className="text-white/80 text-sm">
            {step === 'details' && 'Enter your event details'}
            {step === 'payment' && 'Complete your payment'}
            {step === 'confirmation' && 'Your reservation is confirmed'}
          </p>
        </div>

        {/* Progress indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-2 py-4 bg-gray-50">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === 'details' ? 'bg-black text-white' : 'bg-green-500 text-white'}`}>
              {step === 'payment' ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Step 1: Event Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <select
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours</option>
                    <option value="10">10 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="200"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    placeholder="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Estimated Total:</span>
                  <span className="text-2xl">${calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">*Final price may vary based on additional services</p>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Booking Summary:</strong> {formData.duration} hours on {formData.date} for {formData.guests} guests
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    required
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Deposit (50%):</span>
                  <span className="font-semibold">${(calculateTotal() * 0.5).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Due Today:</span>
                    <span className="text-2xl">${(calculateTotal() * 0.5).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                A confirmation email has been sent to {formData.email}
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-2"><strong>Venue:</strong> {venue.name}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {formData.date}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Time:</strong> {formData.time}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Duration:</strong> {formData.duration} hours</p>
                <p className="text-sm text-gray-600"><strong>Guests:</strong> {formData.guests}</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {step !== 'confirmation' && (
            <div className="flex gap-3 mt-6">
              {step === 'payment' && (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {step === 'details' ? 'Continue to Payment' : 'Complete Booking'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
