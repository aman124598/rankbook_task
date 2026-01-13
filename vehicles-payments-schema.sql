-- Create vehicles table for storing vehicle data
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('sedan', 'suv', 'bike', 'hatchback', 'luxury')),
  price_per_day DECIMAL(10, 2) NOT NULL,
  seating_capacity INTEGER NOT NULL,
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'hybrid', 'electric')),
  transmission TEXT NOT NULL CHECK (transmission IN ('automatic', 'manual')),
  mileage TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  engine_capacity TEXT,
  horsepower INTEGER,
  features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price_per_day);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to vehicles
CREATE POLICY "Anyone can view vehicles"
  ON vehicles FOR SELECT
  USING (true);

-- Create policy for admin to manage vehicles (you'll need to set up admin role)
CREATE POLICY "Admin can manage vehicles"
  ON vehicles FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create reviews table
CREATE TABLE IF NOT EXISTS vehicle_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id TEXT REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_vehicle ON vehicle_reviews(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON vehicle_reviews(user_id);

ALTER TABLE vehicle_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON vehicle_reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON vehicle_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON vehicle_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Create payments table for Razorpay integration
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'authorized', 'captured', 'refunded', 'failed')),
  payment_method TEXT,
  error_code TEXT,
  error_description TEXT,
  receipt TEXT,
  notes JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments for their bookings"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add payment_status to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' 
  CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed'));
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id UUID REFERENCES payments(id);

-- Function to update vehicle rating when new review is added
CREATE OR REPLACE FUNCTION update_vehicle_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vehicles 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM vehicle_reviews 
      WHERE vehicle_id = NEW.vehicle_id
    ),
    reviews_count = (
      SELECT COUNT(*) 
      FROM vehicle_reviews 
      WHERE vehicle_id = NEW.vehicle_id
    ),
    updated_at = NOW()
  WHERE id = NEW.vehicle_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vehicle_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON vehicle_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_vehicle_rating();

-- Trigger for updated_at on vehicles
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON vehicle_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
