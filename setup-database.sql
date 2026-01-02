-- RankRides Database Setup - FINAL VERSION
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop existing objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Step 2: Create users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT 'User',
  phone TEXT DEFAULT '',
  license_number TEXT DEFAULT '',
  license_expiry DATE,
  address TEXT DEFAULT '',
  profile_picture TEXT DEFAULT '',
  favorites JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  vehicle_id TEXT NOT NULL,
  vehicle_name TEXT NOT NULL,
  vehicle_image TEXT,
  vehicle_category TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  pickup_location TEXT NOT NULL,
  include_insurance BOOLEAN DEFAULT FALSE,
  promo_code TEXT,
  days INTEGER NOT NULL,
  base_cost DECIMAL(10, 2) NOT NULL,
  insurance_cost DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total_cost DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'confirmed',
  rating INTEGER,
  review TEXT,
  rated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 4: Create indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- Step 5: Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Step 6: Users table policies - ALLOW ALL operations for own data
CREATE POLICY "Users can do anything with their own profile"
  ON public.users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Step 7: Bookings table policies
CREATE POLICY "Users can do anything with their own bookings"
  ON public.bookings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Step 8: Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, license_number, license_expiry)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'license_number', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'license_expiry' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'license_expiry')::date
      ELSE NULL
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Success message
SELECT 'Database setup complete! Tables: users, bookings' as status;
