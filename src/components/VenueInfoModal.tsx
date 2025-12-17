import { useState } from 'react';
import { X } from 'lucide-react';
import { Venue } from '../config';

interface VenueInfoModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export function VenueInfoModal({ venue, isOpen, onClose, onBookNow }: VenueInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{venue.name}</h2>
            <p className="text-white/90 text-xs md:text-sm">{venue.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Features & Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Capacity: 50-200 guests</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Premium AV System</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Catering Available</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Flexible Layout</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Space Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Our {venue.name.toLowerCase()} offers a stunning environment perfect for your special occasion.
                With state-of-the-art facilities, customizable layouts, and dedicated event support,
                we ensure your event is memorable and seamless from start to finish.
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">$2,500</p>
                  <p className="text-xs text-gray-500">per event</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hourly rate</p>
                  <p className="text-xl font-semibold text-gray-900">$350/hr</p>
                  <p className="text-xs text-gray-500">4 hour minimum</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onBookNow}
                className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
