export const vehicles = [
  {
    id: 'sedan-1',
    name: 'Toyota Camry',
    brand: 'Toyota',
    model: 'Camry XLE',
    category: 'sedan',
    pricePerDay: 2500,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '15 km/l',
    features: ['Air Conditioning', 'Bluetooth', 'Cruise Control', 'Backup Camera', 'Leather Seats', 'Sunroof'],
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 124,
    description: 'Experience luxury and comfort with the Toyota Camry XLE. Perfect for long drives and city commutes alike.'
  },
  {
    id: 'sedan-2',
    name: 'Honda Accord',
    brand: 'Honda',
    model: 'Accord Sport',
    category: 'sedan',
    pricePerDay: 2800,
    seatingCapacity: 5,
    fuelType: 'hybrid',
    transmission: 'automatic',
    mileage: '20 km/l',
    features: ['Air Conditioning', 'Bluetooth', 'Android Auto', 'Apple CarPlay', 'Lane Assist', 'Heated Seats'],
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'
    ],
    available: true,
    rating: 4.7,
    reviews: 98,
    description: 'The Honda Accord Sport combines sporty handling with exceptional fuel efficiency.'
  },
  {
    id: 'sedan-3',
    name: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    model: 'C300',
    category: 'sedan',
    pricePerDay: 5500,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '12 km/l',
    features: ['Premium Sound System', 'Panoramic Sunroof', 'Leather Interior', 'Navigation', 'Wireless Charging', 'Ambient Lighting'],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 156,
    description: 'Indulge in German engineering excellence with the Mercedes-Benz C-Class. Luxury redefined.'
  },
  {
    id: 'suv-1',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    model: 'Fortuner Legender',
    category: 'suv',
    pricePerDay: 4500,
    seatingCapacity: 7,
    fuelType: 'diesel',
    transmission: 'automatic',
    mileage: '10 km/l',
    features: ['4WD', 'Hill Assist', 'Roof Rails', 'Third Row Seating', 'Touchscreen Display', 'Premium Audio'],
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
    ],
    available: true,
    rating: 4.6,
    reviews: 203,
    description: 'Conquer any terrain with the powerful Toyota Fortuner. Perfect for adventures and family trips.'
  },
  {
    id: 'suv-2',
    name: 'Jeep Compass',
    brand: 'Jeep',
    model: 'Compass Trailhawk',
    category: 'suv',
    pricePerDay: 3800,
    seatingCapacity: 5,
    fuelType: 'diesel',
    transmission: 'automatic',
    mileage: '12 km/l',
    features: ['Trail Rated Badge', 'Terrain Management', 'Panoramic Sunroof', 'Uconnect System', 'All-Weather Mats'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    available: true,
    rating: 4.5,
    reviews: 87,
    description: 'The Jeep Compass Trailhawk is built for those who seek adventure off the beaten path.'
  },
  {
    id: 'suv-3',
    name: 'Range Rover Sport',
    brand: 'Land Rover',
    model: 'Sport HSE',
    category: 'suv',
    pricePerDay: 8500,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '8 km/l',
    features: ['Air Suspension', 'Meridian Sound', 'Gesture Control', 'Matrix LED Lights', 'Massage Seats', 'Off-Road Pack'],
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800',
      'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 178,
    description: 'The ultimate luxury SUV. Range Rover Sport offers unparalleled comfort and capability.'
  },
  {
    id: 'suv-4',
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    model: 'XUV700 AX7',
    category: 'suv',
    pricePerDay: 3200,
    seatingCapacity: 7,
    fuelType: 'diesel',
    transmission: 'automatic',
    mileage: '14 km/l',
    features: ['ADAS', 'Alexa Built-in', 'Panoramic Sunroof', 'Flush Door Handles', 'Wireless Charging', 'Sony Audio'],
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
    ],
    available: true,
    rating: 4.7,
    reviews: 245,
    description: 'Experience advanced technology and bold design with the Mahindra XUV700.'
  },
  {
    id: 'bike-1',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    category: 'bike',
    pricePerDay: 800,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '35 km/l',
    features: ['Retro Design', 'Dual Channel ABS', 'USB Charging', 'Tripper Navigation'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'
    ],
    available: true,
    rating: 4.6,
    reviews: 312,
    description: 'The timeless Royal Enfield Classic 350. A legend on two wheels.'
  },
  {
    id: 'bike-2',
    name: 'Kawasaki Ninja 650',
    brand: 'Kawasaki',
    model: 'Ninja 650',
    category: 'bike',
    pricePerDay: 1500,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '22 km/l',
    features: ['Parallel Twin Engine', 'TFT Display', 'Traction Control', 'Slipper Clutch', 'LED Lights'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 156,
    description: 'Feel the thrill of the track with the Kawasaki Ninja 650. Pure performance.'
  },
  {
    id: 'bike-3',
    name: 'Harley-Davidson Iron 883',
    brand: 'Harley-Davidson',
    model: 'Iron 883',
    category: 'bike',
    pricePerDay: 2200,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '18 km/l',
    features: ['V-Twin Engine', 'Blacked-Out Style', 'Low Seat Height', 'Forward Controls', 'Drag-Style Bars'],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 203,
    description: 'Raw, stripped-down style meets legendary Harley-Davidson power.'
  },
  {
    id: 'bike-4',
    name: 'BMW G 310 R',
    brand: 'BMW',
    model: 'G 310 R',
    category: 'bike',
    pricePerDay: 1200,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '30 km/l',
    features: ['Reverse Cylinder Engine', 'ABS', 'Digital Display', 'LED Headlight', 'Upside-Down Forks'],
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d795003b6ce?w=800',
      'https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=800'
    ],
    available: true,
    rating: 4.5,
    reviews: 89,
    description: 'German precision in a nimble package. The BMW G 310 R is perfect for city riding.'
  },
  {
    id: 'sedan-4',
    name: 'BMW 3 Series',
    brand: 'BMW',
    model: '330i M Sport',
    category: 'sedan',
    pricePerDay: 6000,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '14 km/l',
    features: ['M Sport Package', 'Live Cockpit', 'Harman Kardon Audio', 'Adaptive Suspension', 'Gesture Control', 'Wireless Charging'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 167,
    description: 'The ultimate driving machine. BMW 3 Series delivers exhilarating performance and luxury.'
  }
];

export const pickupLocations = [
  { id: 'loc-1', name: 'Mumbai - Andheri', address: 'WestPoint Mall, Andheri West, Mumbai 400053', city: 'Mumbai' },
  { id: 'loc-2', name: 'Mumbai - BKC', address: 'Platina Tower, BKC, Mumbai 400051', city: 'Mumbai' },
  { id: 'loc-3', name: 'Delhi - Connaught Place', address: 'Block A, Connaught Place, New Delhi 110001', city: 'Delhi' },
  { id: 'loc-4', name: 'Delhi - Gurgaon', address: 'DLF Cyber Hub, Gurgaon 122002', city: 'Delhi' },
  { id: 'loc-5', name: 'Bangalore - Koramangala', address: 'Sony World Junction, Koramangala, Bangalore 560095', city: 'Bangalore' },
  { id: 'loc-6', name: 'Bangalore - Whitefield', address: 'Phoenix Marketcity, Whitefield, Bangalore 560066', city: 'Bangalore' },
  { id: 'loc-7', name: 'Chennai - Anna Nagar', address: 'VR Mall, Anna Nagar, Chennai 600040', city: 'Chennai' },
  { id: 'loc-8', name: 'Pune - Koregaon Park', address: 'Lane 7, Koregaon Park, Pune 411001', city: 'Pune' }
];

export function getVehicleById(id) {
  return vehicles.find(v => v.id === id);
}

export function getVehiclesByCategory(category) {
  if (!category || category === 'all') return vehicles;
  return vehicles.filter(v => v.category === category);
}

export function filterVehicles({ category, minPrice, maxPrice, seatingCapacity, fuelType, search }) {
  let filtered = [...vehicles];

  if (category && category !== 'all') {
    filtered = filtered.filter(v => v.category === category);
  }

  if (minPrice) {
    filtered = filtered.filter(v => v.pricePerDay >= parseInt(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(v => v.pricePerDay <= parseInt(maxPrice));
  }

  if (seatingCapacity) {
    filtered = filtered.filter(v => v.seatingCapacity >= parseInt(seatingCapacity));
  }

  if (fuelType && fuelType !== 'all') {
    filtered = filtered.filter(v => v.fuelType === fuelType);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(v => 
      v.name.toLowerCase().includes(searchLower) ||
      v.brand.toLowerCase().includes(searchLower) ||
      v.model.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}
