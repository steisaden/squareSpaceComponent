# Booking Features Guide

## ✨ New Functional Features

Your Interactive Venue Square now includes fully functional booking features!

### 1. **Learn More Button** 📖

When users hover over a venue and click "Learn More":
- Opens a beautiful lightbox modal
- Shows venue image and details
- Displays features & amenities
- Shows pricing information
- Includes "Book Now" button to proceed

**Features Shown:**
- Capacity (50-200 guests)
- Premium AV System
- Catering Available
- Flexible Layout
- Starting price: $2,500
- Hourly rate: $350/hr

### 2. **Book Now Button** 💳

Opens a 2-step booking portal:

**Step 1: Event Details**
- Event date picker
- Start time
- Duration (4, 6, 8, or 10 hours)
- Number of guests
- Contact information (name, email, phone)
- Special requests (optional)
- Shows estimated total

**Step 2: Payment**
- Credit card information
- Expiry date and CVV
- Shows booking summary
- Calculates 50% deposit
- Secure payment indicator

**Step 3: Confirmation**
- Success message with checkmark
- Booking details summary
- Confirmation email notification

## 🎨 Customization

### Change Pricing:

Edit `src/components/VenueInfoModal.tsx`:
```typescript
<p className="text-2xl font-bold">$2,500</p>  // Change starting price
```

Edit `src/components/BookingModal.tsx`:
```typescript
const hourlyRate = 350;  // Change hourly rate
```

### Change Form Fields:

Add/remove fields in `BookingModal.tsx`:
```typescript
<input
  type="text"
  name="customField"
  placeholder="Your custom field"
/>
```

### Change Features List:

Edit the features in `VenueInfoModal.tsx`:
```typescript
<span>Your custom feature</span>
```

## 🔗 Integration Options

### Option 1: Use Built-in Modals (Current)
✅ Works out of the box
✅ No additional setup
✅ Beautiful UI included
❌ Requires payment processor integration

### Option 2: Route to Squarespace Pages
1. Update venue links to Squarespace URLs
2. Create booking pages in Squarespace
3. Use Squarespace's booking system

### Option 3: External Booking (Calendly, Acuity)
1. Update venue links to external URLs
2. Buttons open external booking in new tab

## 💳 Payment Integration

The booking form includes payment UI but needs a processor:

### Stripe (Recommended):
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');
```

### Square:
```bash
npm install react-square-web-payments-sdk
```

### PayPal:
```bash
npm install @paypal/react-paypal-js
```

## 📱 Mobile Optimization

Both modals are fully responsive:
- Stacks vertically on mobile
- Touch-friendly buttons (44px minimum)
- Scrollable content
- Optimized form inputs

## 🎯 User Flow

1. User hovers over venue square
2. Overlay appears with venue info
3. User clicks "Learn More"
   → Info modal opens with details
4. User clicks "Book Now" (from overlay or modal)
   → Booking portal opens
5. User fills event details
   → Clicks "Continue to Payment"
6. User enters payment info
   → Clicks "Complete Booking"
7. Confirmation screen shows
   → Auto-closes after 3 seconds

## 🔧 Testing

Test the booking flow:
1. Hover over any venue square
2. Click "Learn More" to see info modal
3. Click "Book Now" to test booking form
4. Fill in dummy data (no real payment processed)
5. See confirmation screen

## 📝 Customization Checklist

- [ ] Update pricing in VenueInfoModal.tsx
- [ ] Customize features list
- [ ] Update form fields if needed
- [ ] Integrate payment processor
- [ ] Test on mobile devices
- [ ] Update confirmation email logic
- [ ] Add analytics tracking
- [ ] Test with real booking flow

## 🚀 Deployment

After customizing:
```bash
npm run build
npm run deploy
```

Your booking features will be live!

---

**Note**: The payment form is UI-only. You must integrate a real payment processor (Stripe, Square, PayPal) for actual transactions.
