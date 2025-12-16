# Adding Interactive Venue Square to Squarespace

This guide will help you add the Interactive Venue Square component to your Squarespace website.

## Quick Start (3 Steps)

### Step 1: Add Code Block to Squarespace

1. Log in to your Squarespace website
2. Go to the page where you want to add the component
3. Click **Edit** on the page
4. Click the **+** button where you want to add the component
5. Search for and select **Code** block
6. Paste the following code:

```html
<div id="venue-square-container"></div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

7. Click **Apply**
8. Click **Save** on the page

### Step 2: Customize (Optional)

To customize the size and position, replace the code with:

```html
<div id="venue-square-container" 
     data-width="800" 
     data-height="600"
     data-position="center">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

**Available Options:**
- `data-width`: Width in pixels (default: 800)
- `data-height`: Height in pixels (default: 600)
- `data-position`: "left", "center", or "right" (default: center)

### Step 3: Publish

Click **Save** and then **Publish** your site!

---

## Customization Options

### Size Customization

#### Small (Mobile-friendly)
```html
<div id="venue-square-container" 
     data-width="400" 
     data-height="400">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

#### Medium (Default)
```html
<div id="venue-square-container" 
     data-width="800" 
     data-height="600">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

#### Large (Full-width)
```html
<div id="venue-square-container" 
     data-width="1200" 
     data-height="800">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

### Position Customization

#### Left-aligned
```html
<div id="venue-square-container" data-position="left"></div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

#### Center-aligned (Default)
```html
<div id="venue-square-container" data-position="center"></div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

#### Right-aligned
```html
<div id="venue-square-container" data-position="right"></div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

---

## Functional Buttons

The component includes two functional buttons:

### 1. **Learn More Button**
- Opens a lightbox modal with venue details
- Shows venue image, features, amenities, and pricing
- Includes a "Book Now" button to proceed to booking

### 2. **Book Now Button**
- Opens a booking payment portal
- Two-step process: Event Details → Payment
- Collects event information and processes payment
- Shows confirmation upon completion

## Routing & Integration with Squarespace

### Option 1: Use Built-in Modals (Default)
The component includes built-in lightbox modals that work out of the box. No additional setup needed!

### Option 2: Route to Squarespace Pages

To route buttons to your Squarespace pages instead of using modals:

1. **Edit the venue links** in your config:
   ```typescript
   {
     id: "wedding",
     name: "The Grand Ballroom",
     link: "/wedding-venue"  // Your Squarespace page URL
   }
   ```

2. **Create corresponding pages** in Squarespace:
   - `/wedding-venue`
   - `/corporate-venue`
   - `/dining-venue`
   - `/gallery-venue`

3. **Add booking forms** to each page using:
   - Squarespace's built-in booking system
   - Acuity Scheduling integration
   - Custom form blocks

### Option 3: External Booking System

To integrate with external booking systems (e.g., Calendly, Acuity):

1. **Update venue links** to external URLs:
   ```typescript
   link: "https://calendly.com/your-venue/booking"
   ```

2. **The buttons will open** the external booking page in a new tab

## Customizing Venue Information

To change the venue names, descriptions, colors, and links:

1. Go to your GitHub repository: https://github.com/steisaden/squareSpaceComponent
2. Navigate to `src/config/venueConfig.ts` (or `src/components/RubiksCubeScene.tsx`)
3. Click the **Edit** (pencil) icon
4. Find the `venues` array and modify:

```typescript
export const venues: Venue[] = [
  {
    id: "wedding",
    name: "Your Venue Name",           // Change this
    description: "Your description",    // Change this
    imageUrl: "your-image-url",        // Change this
    position: "top-left",
    color: "#E8D5C4",                  // Change color (hex code)
    link: "/your-squarespace-page"     // Change to your page URL
  },
  // ... repeat for other venues
];
```

5. Click **Commit changes**
6. Run `npm run deploy` to update your live site

## Customizing Modal Content

### Edit Venue Details in Info Modal:
Edit `src/components/VenueInfoModal.tsx` to customize:
- Features & amenities list
- Pricing information
- Space details text
- Button labels

### Edit Booking Form:
Edit `src/components/BookingModal.tsx` to customize:
- Form fields
- Pricing calculation
- Payment processing
- Confirmation message

## Payment Integration

The booking modal includes a payment form UI. To connect to a real payment processor:

### Stripe Integration:
```typescript
// In BookingModal.tsx, add Stripe:
import { loadStripe } from '@stripe/stripe-js';

const handlePayment = async () => {
  const stripe = await loadStripe('your_publishable_key');
  // Process payment
};
```

### Square Integration:
```typescript
// Add Square payment form
import { PaymentForm } from 'react-square-web-payments-sdk';
```

### PayPal Integration:
```typescript
// Add PayPal buttons
import { PayPalButtons } from "@paypal/react-paypal-js";
```

For detailed payment integration, see your payment processor's documentation.

---

## Advanced Customization

### Custom Colors for Each Square

Edit the `color` field in `RubiksCubeScene.tsx`:

```typescript
color: "#E8D5C4"  // Beige/Cream
color: "#C4D5E8"  // Light Blue
color: "#D4E8C4"  // Light Green
color: "#E8C4D5"  // Light Pink
```

Use any hex color code from [HTML Color Codes](https://htmlcolorcodes.com/)

### Custom Animation Speed

Edit `src/components/RubiksCube.tsx` and change:

```typescript
const ANIMATION_DURATION = 1.5; // Change to 1.0 for faster, 2.5 for slower
```

### Custom Spacing Between Squares

Edit `src/components/RubiksCube.tsx` and change:

```typescript
const GAP = 0.05; // Increase for more space (e.g., 0.1), decrease for less (e.g., 0.02)
```

---

## Responsive Design

The component automatically adjusts for mobile devices. For better mobile experience, use these settings:

```html
<div id="venue-square-container" 
     data-width="100%" 
     data-height="500"
     data-responsive="true">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>
```

---

## Troubleshooting

### Component Not Showing
- Make sure you're using a **Code Block**, not an Embed Block
- Check that the script URL is correct
- Wait a few seconds for the component to load

### Component Too Small/Large
- Adjust the `data-width` and `data-height` attributes
- Use percentages for responsive sizing: `data-width="100%"`

### Links Not Working
- Verify the `link` field in `RubiksCubeScene.tsx`
- Make sure links start with `/` for internal pages or `https://` for external

### Animation Not Smooth
- Check your internet connection
- Try reducing the animation duration
- Ensure no other heavy scripts are running on the page

---

## Support

For issues or questions:
1. Check the [main README](./README.md)
2. Review the [GitHub repository](https://github.com/steisaden/squareSpaceComponent)
3. Open an issue on GitHub

---

## Example: Complete Custom Setup

```html
<!-- Full-width, centered, with custom size -->
<div id="venue-square-container" 
     data-width="1000" 
     data-height="700"
     data-position="center"
     data-responsive="true"
     style="margin: 40px auto;">
</div>
<script src="https://steisaden.github.io/squareSpaceComponent/embed.js"></script>

<style>
  /* Optional: Add custom styling */
  #venue-square-container {
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    overflow: hidden;
  }
</style>
```

This will create a beautifully styled, responsive venue selector that fits perfectly in your Squarespace site! 🎨
