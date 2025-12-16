import homepageBg from "./assets/homepage_bg.png"; // Import the image

// ... imports

export default function App({ config }: AppProps) {
  // ... state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homepageBg})` }}
        aria-hidden="true"
      />

      {/* Overlay to dim background slightly if needed, adjust opacity as desired */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Main Content Area - Centered Logo Cube */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="mt-[32px]"> {/* Adjust top margin to align perfect with logo position if needed */}
          <LogoCubeScene
            config={config}
            onLearnMore={handleLearnMore}
            onBookNow={handleBookNow}
            hideOverlay={hideOverlay}
          />
        </div>
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
