# RankRides - Premium Vehicle Rental Platform

A modern, full-featured vehicle rental web application built with React and Firebase.

## Features

### User Authentication

- ✅ Sign up with driver's license and email
- ✅ Login/logout functionality
- ✅ User profile with license details
- ✅ Profile picture upload to Firebase Storage

### Vehicle Browsing

- ✅ View available vehicles by category (sedan, SUV, bike)
- ✅ Filter vehicles by price, seating capacity, fuel type
- ✅ Search vehicles by model or brand
- ✅ Vehicle details with photos and features

### Booking System

- ✅ Select rental dates and pickup location
- ✅ Calculate rental cost with insurance options
- ✅ Apply promo codes (FIRST10, WEEKEND20, FLAT500, SUMMER15)
- ✅ Confirm booking with payment details
- ✅ View booking confirmation

### Booking Management

- ✅ View current and past bookings
- ✅ Cancel upcoming bookings
- ✅ Extend rental period
- ✅ Rate vehicle after rental
- ✅ Save favorite vehicles

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Styling**: Custom CSS with modern design system
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rankbook_task
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Cloud Storage

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Firebase Setup

### Firestore Collections

The app uses the following Firestore collections:

1. **users** - User profiles

   - uid, email, fullName, phone, licenseNumber, licenseExpiry
   - address, profilePicture, favorites
   - createdAt, updatedAt

2. **bookings** - Vehicle bookings
   - userId, userEmail, vehicleId, vehicleName, vehicleImage
   - startDate, endDate, pickupLocation
   - baseCost, insuranceCost, discount, totalCost
   - status, rating, review
   - createdAt, updatedAt

### Storage Structure

```
/profilePictures/{userId}
```

## Available Promo Codes

- **FIRST10**: 10% off for first-time users
- **WEEKEND20**: 20% weekend discount
- **FLAT500**: ₹500 flat discount
- **SUMMER15**: 15% summer special

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── VehicleCard.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   ├── AuthContext.jsx
│   └── BookingContext.jsx
├── data/              # Static data
│   └── vehicles.js
├── firebase/          # Firebase configuration
│   └── config.js
├── pages/             # Page components
│   ├── HomePage.jsx
│   ├── VehiclesPage.jsx
│   ├── VehicleDetailPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ProfilePage.jsx
│   ├── BookingsPage.jsx
│   ├── BookingConfirmationPage.jsx
│   └── FavoritesPage.jsx
├── App.jsx            # Main app component
├── App.css            # App-level styles
├── index.css          # Global styles
└── main.jsx           # Entry point
```

## Features in Detail

### User Authentication

- Secure email/password authentication via Firebase
- Driver's license validation during signup
- Profile management with editable fields
- Profile picture upload to Firebase Storage

### Vehicle Management

- 12+ pre-loaded vehicles across 3 categories
- Real-time filtering and search
- Detailed vehicle information pages
- Image galleries for each vehicle

### Booking Flow

1. Browse vehicles
2. Select vehicle and view details
3. Choose rental dates and pickup location
4. Add optional insurance
5. Apply promo code
6. Review cost breakdown
7. Confirm booking
8. Receive confirmation

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Modern glassmorphism effects
- Smooth animations and transitions

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## License

MIT

## Support

For support, email hello@rankrides.com
