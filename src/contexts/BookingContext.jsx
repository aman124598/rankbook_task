import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/config';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

const PROMO_CODES = {
  'FIRST10': { discount: 10, type: 'percentage', description: '10% off for first-time users' },
  'WEEKEND20': { discount: 20, type: 'percentage', description: '20% weekend discount' },
  'FLAT500': { discount: 500, type: 'flat', description: '₹500 flat discount' },
  'SUMMER15': { discount: 15, type: 'percentage', description: '15% summer special' }
};

export function BookingProvider({ children }) {
  const { currentUser } = useAuth();
  const [currentBooking, setCurrentBooking] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);

  function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  }

  function calculateCost(vehicle, startDate, endDate, includeInsurance = false) {
    const days = calculateDays(startDate, endDate);
    let baseCost = vehicle.pricePerDay * days;
    let insuranceCost = includeInsurance ? Math.round(baseCost * 0.1) : 0;
    let discount = 0;

    if (appliedPromo) {
      if (appliedPromo.type === 'percentage') {
        discount = Math.round(baseCost * (appliedPromo.discount / 100));
      } else {
        discount = appliedPromo.discount;
      }
    }

    const totalCost = baseCost + insuranceCost - discount;
    
    return {
      days,
      baseCost,
      insuranceCost,
      discount,
      totalCost: Math.max(0, totalCost)
    };
  }

  function applyPromoCode(code) {
    const promo = PROMO_CODES[code.toUpperCase()];
    if (promo) {
      setAppliedPromo({ code: code.toUpperCase(), ...promo });
      return { success: true, promo };
    }
    return { success: false, message: 'Invalid promo code' };
  }

  function clearPromoCode() {
    setAppliedPromo(null);
  }

  async function createBooking(bookingData) {
    if (!currentUser) throw new Error('User not authenticated');

    const booking = {
      user_id: currentUser.id,
      user_email: currentUser.email,
      vehicle_id: bookingData.vehicleId,
      vehicle_name: bookingData.vehicleName,
      vehicle_image: bookingData.vehicleImage,
      vehicle_category: bookingData.vehicleCategory,
      start_date: bookingData.startDate,
      end_date: bookingData.endDate,
      pickup_location: bookingData.pickupLocation,
      include_insurance: bookingData.includeInsurance,
      promo_code: bookingData.promoCode,
      days: bookingData.days,
      base_cost: bookingData.baseCost,
      insurance_cost: bookingData.insuranceCost,
      discount: bookingData.discount,
      total_cost: bookingData.totalCost,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;

    setCurrentBooking(data);
    setAppliedPromo(null);
    return data;
  }

  async function getUserBookings() {
    if (!currentUser) return [];

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }

    return data || [];
  }

  async function cancelBooking(bookingId) {
    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) throw error;
  }

  async function extendBooking(bookingId, newEndDate, additionalCost) {
    const { error } = await supabase
      .from('bookings')
      .update({
        end_date: newEndDate,
        total_cost: additionalCost,
        status: 'extended',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) throw error;
  }

  async function rateVehicle(bookingId, rating, review) {
    const { error } = await supabase
      .from('bookings')
      .update({
        rating,
        review,
        rated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) throw error;
  }

  const value = {
    currentBooking,
    setCurrentBooking,
    appliedPromo,
    calculateDays,
    calculateCost,
    applyPromoCode,
    clearPromoCode,
    createBooking,
    getUserBookings,
    cancelBooking,
    extendBooking,
    rateVehicle
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
