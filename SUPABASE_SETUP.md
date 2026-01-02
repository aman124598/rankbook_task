# Supabase Setup Guide for RankRides

## Step 1: Get Your Supabase Anon Key

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/bpfpzyosggdorqlcvxla
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under Project Settings
4. Copy the **anon/public** key (it's a long string starting with `eyJ...`)

## Step 2: Update .env File

Open your `.env` file and add the anon key:

```env
VITE_SUPABASE_URL=https://bpfpzyosggdorqlcvxla.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with the actual key you copied.

## Step 3: Set Up Database Tables

1. Go to your Supabase dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-schema.sql` file
5. Click **Run** to execute the SQL

This will create:

- `users` table for user profiles
- `bookings` table for rental bookings
- Storage bucket for profile pictures
- Row Level Security (RLS) policies
- Indexes for better performance

## Step 4: Enable Email Authentication

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Make sure **Email** provider is enabled
3. Configure email templates if needed (optional)

## Step 5: Test the Application

1. Start the development server:

```bash
npm run dev
```

2. Open http://localhost:5173
3. Try signing up with a new account
4. Check if user data is saved in Supabase:
   - Go to **Table Editor** > **users** to see user profiles
   - Go to **Table Editor** > **bookings** to see bookings

## Database Schema Overview

### users table

- `id` (UUID) - Primary key, linked to auth.users
- `email` (TEXT) - User email
- `full_name` (TEXT) - Full name
- `phone` (TEXT) - Phone number
- `license_number` (TEXT) - Driver's license number
- `license_expiry` (DATE) - License expiry date
- `address` (TEXT) - User address
- `profile_picture` (TEXT) - URL to profile picture
- `favorites` (JSONB) - Array of favorite vehicle IDs
- `created_at`, `updated_at` (TIMESTAMPTZ) - Timestamps

### bookings table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `vehicle_id` (TEXT) - Vehicle identifier
- `vehicle_name`, `vehicle_image`, `vehicle_category` (TEXT) - Vehicle details
- `start_date`, `end_date` (DATE) - Rental period
- `pickup_location` (TEXT) - Pickup location ID
- `include_insurance` (BOOLEAN) - Insurance option
- `promo_code` (TEXT) - Applied promo code
- `days` (INTEGER) - Number of rental days
- `base_cost`, `insurance_cost`, `discount`, `total_cost` (DECIMAL) - Pricing
- `status` (TEXT) - Booking status
- `rating` (INTEGER), `review` (TEXT) - User feedback
- `created_at`, `updated_at` (TIMESTAMPTZ) - Timestamps

## Security Features

- **Row Level Security (RLS)** is enabled on all tables
- Users can only view and modify their own data
- Profile pictures are stored in Supabase Storage with proper access policies
- All sensitive operations require authentication

## Troubleshooting

### Issue: "Invalid API key" error

- Make sure you copied the **anon** key, not the **service_role** key
- Check that the key is properly set in `.env` file
- Restart the dev server after updating `.env`

### Issue: "User not found in database"

- Check if the user was created in the `users` table
- Verify RLS policies are set up correctly
- Check browser console for errors

### Issue: Profile picture upload fails

- Verify the `profile-pictures` storage bucket exists
- Check storage policies are set up correctly
- Ensure file size is under 5MB

## Next Steps

Once everything is working:

1. Test all features (signup, login, booking, favorites)
2. Verify data is being saved correctly in Supabase
3. Test profile picture upload
4. Make a test booking and check the bookings table

For production deployment, you may want to:

- Set up custom email templates
- Configure email rate limits
- Add additional security rules
- Set up database backups
