import { supabase } from './config';
import { vehicles as localVehicles } from '../data/vehicles';

// Fetch vehicles from Supabase, fallback to local data
export async function fetchVehicles() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('available', true)
      .order('rating', { ascending: false });

    if (error) {
      console.warn('Error fetching from Supabase, using local data:', error);
      return localVehicles;
    }

    // Transform Supabase data to match local format
    return data.map(vehicle => ({
      id: vehicle.id,
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      category: vehicle.category,
      pricePerDay: parseFloat(vehicle.price_per_day),
      seatingCapacity: vehicle.seating_capacity,
      fuelType: vehicle.fuel_type,
      transmission: vehicle.transmission,
      mileage: vehicle.mileage,
      year: vehicle.year,
      color: vehicle.color,
      engineCapacity: vehicle.engine_capacity,
      horsepower: vehicle.horsepower,
      features: vehicle.features || [],
      images: vehicle.images || [],
      available: vehicle.available,
      rating: parseFloat(vehicle.rating) || 0,
      reviews: vehicle.reviews_count || 0,
      description: vehicle.description
    }));
  } catch (error) {
    console.warn('Supabase error, using local data:', error);
    return localVehicles;
  }
}

// Fetch single vehicle by ID
export async function fetchVehicleById(id) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn('Vehicle not found in Supabase, using local data');
      return localVehicles.find(v => v.id === id);
    }

    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      model: data.model,
      category: data.category,
      pricePerDay: parseFloat(data.price_per_day),
      seatingCapacity: data.seating_capacity,
      fuelType: data.fuel_type,
      transmission: data.transmission,
      mileage: data.mileage,
      year: data.year,
      color: data.color,
      engineCapacity: data.engine_capacity,
      horsepower: data.horsepower,
      features: data.features || [],
      images: data.images || [],
      available: data.available,
      rating: parseFloat(data.rating) || 0,
      reviews: data.reviews_count || 0,
      description: data.description
    };
  } catch (error) {
    console.warn('Supabase error, using local data:', error);
    return localVehicles.find(v => v.id === id);
  }
}

// Seed vehicles to Supabase from local data
export async function seedVehiclesToSupabase() {
  const vehiclesData = localVehicles.map(vehicle => ({
    id: vehicle.id,
    name: vehicle.name,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    price_per_day: vehicle.pricePerDay,
    seating_capacity: vehicle.seatingCapacity,
    fuel_type: vehicle.fuelType,
    transmission: vehicle.transmission,
    mileage: vehicle.mileage,
    year: vehicle.year || 2024,
    color: vehicle.color || 'Black',
    engine_capacity: vehicle.engineCapacity || null,
    horsepower: vehicle.horsepower || null,
    features: vehicle.features,
    images: vehicle.images,
    available: vehicle.available,
    rating: vehicle.rating,
    reviews_count: vehicle.reviews,
    description: vehicle.description
  }));

  const { data, error } = await supabase
    .from('vehicles')
    .upsert(vehiclesData, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding vehicles:', error);
    throw error;
  }

  return data;
}

// Fetch vehicle reviews
export async function fetchVehicleReviews(vehicleId) {
  try {
    const { data, error } = await supabase
      .from('vehicle_reviews')
      .select(`
        *,
        users:user_id (
          full_name,
          profile_picture
        )
      `)
      .eq('vehicle_id', vehicleId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// Create vehicle review
export async function createVehicleReview(vehicleId, userId, bookingId, rating, title, reviewText) {
  const { data, error } = await supabase
    .from('vehicle_reviews')
    .insert([{
      vehicle_id: vehicleId,
      user_id: userId,
      booking_id: bookingId,
      rating,
      title,
      review_text: reviewText
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
