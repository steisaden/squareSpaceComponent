import { useState } from "react";
import { LogoCubeScene } from "./components/LogoCubeScene";
import { VenueInfoModal } from "./components/VenueInfoModal";
import { BookingModal } from "./components/BookingModal";
import { ResolvedConfig, Venue } from "./config";

interface AppProps {
  config: ResolvedConfig;
}

export default function App({ config }: AppProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  const handleLearnMore = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowInfoModal(true);
    setHideOverlay(true); // Hide overlay when modal opens
  };

  const handleBookNow = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
    setHideOverlay(true); // Hide overlay when modal opens
  };

  const handleBookFromInfo = () => {
    setShowInfoModal(false);
    setShowBookingModal(true);
  };

  // Reset hide overlay when modals close
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setHideOverlay(false);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setHideOverlay(false);
  };

  return (
    <div className="relative w-full h-full bg-transparent flex justify-center">

      {/* Main Content Area - Component fits parent container */}
      <div className="relative z-10">
        <LogoCubeScene
          config={config}
          onLearnMore={handleLearnMore}
          onBookNow={handleBookNow}
          hideOverlay={hideOverlay}
        />
      </div>

      {/* Modals */}
      {selectedVenue && (
        <>
          <VenueInfoModal
            venue={selectedVenue}
            isOpen={showInfoModal}
            onClose={handleCloseInfoModal}
            onBookNow={handleBookFromInfo}
          />
          <BookingModal
            venue={selectedVenue}
            isOpen={showBookingModal}
            onClose={handleCloseBookingModal}
          />
        </>
      )}
    </div>
  );
}
