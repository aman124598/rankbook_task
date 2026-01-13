export const vehicles = [
  // === SEDANS ===
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
    year: 2024,
    color: 'Pearl White',
    engineCapacity: '2.5L',
    horsepower: 203,
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
    year: 2024,
    color: 'Metallic Gray',
    engineCapacity: '2.0L Turbo',
    horsepower: 252,
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
    year: 2024,
    color: 'Obsidian Black',
    engineCapacity: '2.0L Turbo',
    horsepower: 255,
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
    year: 2024,
    color: 'Alpine White',
    engineCapacity: '2.0L TwinPower Turbo',
    horsepower: 255,
    features: ['M Sport Package', 'Live Cockpit', 'Harman Kardon Audio', 'Adaptive Suspension', 'Gesture Control', 'Wireless Charging'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 167,
    description: 'The ultimate driving machine. BMW 3 Series delivers exhilarating performance and luxury.'
  },
  {
    id: 'sedan-5',
    name: 'Audi A4',
    brand: 'Audi',
    model: 'A4 Premium Plus',
    category: 'sedan',
    pricePerDay: 5800,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '13 km/l',
    year: 2024,
    color: 'Mythos Black',
    engineCapacity: '2.0L TFSI',
    horsepower: 261,
    features: ['Virtual Cockpit', 'Quattro AWD', 'Bang & Olufsen Audio', 'Matrix LED Headlights', 'Parking Assist', 'Adaptive Cruise'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 134,
    description: 'Precision meets sophistication. The Audi A4 offers cutting-edge technology and refined performance.'
  },
  {
    id: 'sedan-6',
    name: 'Hyundai Sonata',
    brand: 'Hyundai',
    model: 'Sonata N Line',
    category: 'sedan',
    pricePerDay: 2200,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '16 km/l',
    year: 2024,
    color: 'Flame Red',
    engineCapacity: '2.5L Turbo',
    horsepower: 290,
    features: ['Smart Cruise Control', 'Bose Premium Audio', 'Wireless Charging', 'Ventilated Seats', 'Digital Key', 'Remote Start'],
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800'
    ],
    available: true,
    rating: 4.6,
    reviews: 89,
    description: 'Bold design meets athletic performance. The Hyundai Sonata N Line stands out from the crowd.'
  },
  {
    id: 'sedan-7',
    name: 'Skoda Superb',
    brand: 'Skoda',
    model: 'Superb L&K',
    category: 'sedan',
    pricePerDay: 3800,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '14 km/l',
    year: 2024,
    color: 'Lava Blue',
    engineCapacity: '2.0L TSI',
    horsepower: 190,
    features: ['Canton Sound System', 'Virtual Pedal', 'Panoramic Sunroof', 'Massage Seats', 'Area View Camera', 'Heated Steering'],
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1537984822441-cff330929b84?w=800'
    ],
    available: true,
    rating: 4.7,
    reviews: 112,
    description: 'Simply clever. The Skoda Superb offers European luxury with exceptional space and features.'
  },
  {
    id: 'sedan-8',
    name: 'Lexus ES',
    brand: 'Lexus',
    model: 'ES 300h Luxury',
    category: 'sedan',
    pricePerDay: 6500,
    seatingCapacity: 5,
    fuelType: 'hybrid',
    transmission: 'automatic',
    mileage: '22 km/l',
    year: 2024,
    color: 'Sonic Titanium',
    engineCapacity: '2.5L Hybrid',
    horsepower: 215,
    features: ['Mark Levinson Audio', 'Air Suspension', 'Heads-Up Display', 'Semi-Aniline Leather', 'Panoramic View Monitor', 'Climate Concierge'],
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 145,
    description: 'Experience amazing. The Lexus ES combines Japanese craftsmanship with hybrid efficiency.'
  },
  
  // === SUVs ===
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
    year: 2024,
    color: 'Attitude Black',
    engineCapacity: '2.8L D-4D',
    horsepower: 204,
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
    year: 2024,
    color: 'Sting Grey',
    engineCapacity: '2.0L Multijet',
    horsepower: 170,
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
    pricePerDay: 12500,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '8 km/l',
    year: 2024,
    color: 'Santorini Black',
    engineCapacity: '3.0L V6 Supercharged',
    horsepower: 395,
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
    year: 2024,
    color: 'Napoli Black',
    engineCapacity: '2.2L mHawk',
    horsepower: 185,
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
    id: 'suv-5',
    name: 'Tata Harrier',
    brand: 'Tata',
    model: 'Harrier Dark Edition',
    category: 'suv',
    pricePerDay: 2800,
    seatingCapacity: 5,
    fuelType: 'diesel',
    transmission: 'automatic',
    mileage: '16 km/l',
    year: 2024,
    color: 'Atlas Black',
    engineCapacity: '2.0L Kryotec',
    horsepower: 170,
    features: ['JBL Audio', 'Panoramic Sunroof', 'Air Purifier', 'Connected Car Tech', 'ADAS', 'Ventilated Seats'],
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
    ],
    available: true,
    rating: 4.5,
    reviews: 178,
    description: 'Bold, masculine, and sophisticated. The Tata Harrier Dark Edition makes a statement.'
  },
  {
    id: 'suv-6',
    name: 'Hyundai Tucson',
    brand: 'Hyundai',
    model: 'Tucson Signature',
    category: 'suv',
    pricePerDay: 3500,
    seatingCapacity: 5,
    fuelType: 'diesel',
    transmission: 'automatic',
    mileage: '15 km/l',
    year: 2024,
    color: 'Amazon Gray',
    engineCapacity: '2.0L CRDi',
    horsepower: 186,
    features: ['Parametric Grille', 'BOSE Audio', 'Level 2 ADAS', 'Ventilated Seats', '360 Camera', 'Dual Zone AC'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    available: true,
    rating: 4.6,
    reviews: 132,
    description: 'Futuristic design meets advanced technology. The Hyundai Tucson redefines SUV luxury.'
  },
  {
    id: 'suv-7',
    name: 'BMW X5',
    brand: 'BMW',
    model: 'X5 xDrive40i',
    category: 'suv',
    pricePerDay: 9500,
    seatingCapacity: 7,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '9 km/l',
    year: 2024,
    color: 'Carbon Black',
    engineCapacity: '3.0L TwinPower Turbo',
    horsepower: 335,
    features: ['xDrive AWD', 'Laserlight', 'Sky Lounge Panoramic Roof', 'Bowers & Wilkins Audio', 'Gesture Control', 'Parking Assistant Plus'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 198,
    description: 'The boss of luxury SUVs. BMW X5 delivers commanding presence and dynamic performance.'
  },
  {
    id: 'suv-8',
    name: 'Mercedes-Benz GLC',
    brand: 'Mercedes-Benz',
    model: 'GLC 300 AMG Line',
    category: 'suv',
    pricePerDay: 8500,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '11 km/l',
    year: 2024,
    color: 'Polar White',
    engineCapacity: '2.0L Turbo',
    horsepower: 255,
    features: ['AMG Line Package', 'Burmester Audio', 'MBUX System', 'Air Balance', '64-Color Ambient Lighting', 'Energizing Comfort'],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 167,
    description: 'Where luxury meets versatility. The Mercedes-Benz GLC offers premium comfort in every journey.'
  },
  {
    id: 'suv-9',
    name: 'Audi Q7',
    brand: 'Audi',
    model: 'Q7 Premium Plus',
    category: 'suv',
    pricePerDay: 10000,
    seatingCapacity: 7,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '10 km/l',
    year: 2024,
    color: 'Galaxy Blue',
    engineCapacity: '3.0L TFSI',
    horsepower: 335,
    features: ['Quattro AWD', 'Air Suspension', 'Bang & Olufsen 3D Audio', 'Virtual Cockpit', 'Matrix LED', 'Predictive Active Suspension'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 145,
    description: 'Sophistication meets capability. The Audi Q7 offers seven-seat luxury with quattro confidence.'
  },
  {
    id: 'suv-10',
    name: 'Volvo XC90',
    brand: 'Volvo',
    model: 'XC90 Inscription',
    category: 'suv',
    pricePerDay: 9000,
    seatingCapacity: 7,
    fuelType: 'hybrid',
    transmission: 'automatic',
    mileage: '15 km/l',
    year: 2024,
    color: 'Crystal White',
    engineCapacity: '2.0L T8 Plug-in Hybrid',
    horsepower: 400,
    features: ['Pilot Assist', 'Bowers & Wilkins Audio', 'Air Purifier', 'Lounge Console', 'Four-Zone Climate', 'Orrefors Gear Shifter'],
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 156,
    description: 'Scandinavian luxury at its finest. The Volvo XC90 prioritizes safety, sustainability, and style.'
  },
  
  // === BIKES ===
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
    year: 2024,
    color: 'Chrome Red',
    engineCapacity: '349cc',
    horsepower: 20,
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
    year: 2024,
    color: 'Lime Green',
    engineCapacity: '649cc',
    horsepower: 68,
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
    year: 2024,
    color: 'Black Denim',
    engineCapacity: '883cc',
    horsepower: 50,
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
    year: 2024,
    color: 'Racing Red',
    engineCapacity: '310cc',
    horsepower: 34,
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
    id: 'bike-5',
    name: 'KTM Duke 390',
    brand: 'KTM',
    model: 'Duke 390',
    category: 'bike',
    pricePerDay: 1100,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '28 km/l',
    year: 2024,
    color: 'Orange',
    engineCapacity: '373cc',
    horsepower: 43,
    features: ['Quickshifter+', 'TFT Display', 'Cornering ABS', 'WP Suspension', 'LED Lights'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800'
    ],
    available: true,
    rating: 4.7,
    reviews: 234,
    description: 'Ready to race. The KTM Duke 390 brings MotoGP DNA to the streets.'
  },
  {
    id: 'bike-6',
    name: 'Triumph Street Triple',
    brand: 'Triumph',
    model: 'Street Triple RS',
    category: 'bike',
    pricePerDay: 2000,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '20 km/l',
    year: 2024,
    color: 'Crystal White',
    engineCapacity: '765cc',
    horsepower: 123,
    features: ['Triple Engine', '5-inch TFT', 'Öhlins Suspension', 'Brembo Brakes', 'Riding Modes'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 145,
    description: 'The benchmark for street naked bikes. Triumph Street Triple RS delivers pure exhilaration.'
  },
  {
    id: 'bike-7',
    name: 'Ducati Monster',
    brand: 'Ducati',
    model: 'Monster 821',
    category: 'bike',
    pricePerDay: 2500,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '18 km/l',
    year: 2024,
    color: 'Ducati Red',
    engineCapacity: '937cc',
    horsepower: 111,
    features: ['Testastretta Engine', 'Cornering ABS', 'Ducati Quick Shift', 'TFT Display', 'Riding Modes'],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800'
    ],
    available: true,
    rating: 4.8,
    reviews: 178,
    description: 'Italian passion on two wheels. The Ducati Monster is an icon of naked bike design.'
  },
  {
    id: 'bike-8',
    name: 'Yamaha MT-15',
    brand: 'Yamaha',
    model: 'MT-15 V2',
    category: 'bike',
    pricePerDay: 700,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '40 km/l',
    year: 2024,
    color: 'Metallic Black',
    engineCapacity: '155cc',
    horsepower: 18,
    features: ['Variable Valve Actuation', 'LED Headlight', 'Digital Meter', 'Assist & Slipper Clutch', 'USD Forks'],
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d795003b6ce?w=800',
      'https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=800'
    ],
    available: true,
    rating: 4.4,
    reviews: 289,
    description: 'The Dark Side of Japan. Yamaha MT-15 brings aggression to the commuter segment.'
  },
  {
    id: 'bike-9',
    name: 'Honda CB350',
    brand: 'Honda',
    model: 'H\'ness CB350',
    category: 'bike',
    pricePerDay: 900,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '35 km/l',
    year: 2024,
    color: 'Pearl Igneous Black',
    engineCapacity: '348.36cc',
    horsepower: 21,
    features: ['Smartphone Voice Control', 'Honda Selectable Torque Control', 'Dual Channel ABS', 'LED Lighting', 'Semi-Digital Meter'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'
    ],
    available: true,
    rating: 4.6,
    reviews: 198,
    description: 'Modern classic meets Honda reliability. The H\'ness CB350 is crafted for the long road.'
  },
  {
    id: 'bike-10',
    name: 'Suzuki Gixxer SF 250',
    brand: 'Suzuki',
    model: 'Gixxer SF 250',
    category: 'bike',
    pricePerDay: 800,
    seatingCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    mileage: '32 km/l',
    year: 2024,
    color: 'Triton Blue',
    engineCapacity: '249cc',
    horsepower: 26,
    features: ['Oil-cooled Engine', 'Full-Digital LCD', 'Clip-on Handlebars', 'ABS', 'LED Tail Light'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800'
    ],
    available: true,
    rating: 4.5,
    reviews: 156,
    description: 'Faired and fierce. The Suzuki Gixxer SF 250 delivers sport bike thrills at an accessible price.'
  },

  // === LUXURY CARS ===
  {
    id: 'luxury-1',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    model: 'S500 AMG Line',
    category: 'sedan',
    pricePerDay: 18000,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '10 km/l',
    year: 2024,
    color: 'Obsidian Black',
    engineCapacity: '3.0L I6 Turbo',
    horsepower: 429,
    features: ['MBUX Hyperscreen', 'Burmester 4D Sound', 'E-Active Body Control', 'Rear-Axle Steering', 'Digital Light', 'Executive Rear Seats'],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    available: true,
    rating: 5.0,
    reviews: 98,
    description: 'The pinnacle of automotive luxury. The Mercedes-Benz S-Class defines what a flagship should be.'
  },
  {
    id: 'luxury-2',
    name: 'BMW 7 Series',
    brand: 'BMW',
    model: '740i M Sport',
    category: 'sedan',
    pricePerDay: 16000,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '11 km/l',
    year: 2024,
    color: 'Mineral White',
    engineCapacity: '3.0L TwinPower Turbo',
    horsepower: 375,
    features: ['Theatre Screen', 'Sky Lounge Panoramic Roof', 'Executive Lounge Seating', 'Bowers & Wilkins Diamond', 'Interaction Bar', 'Automatic Doors'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    available: true,
    rating: 4.9,
    reviews: 87,
    description: 'Redefining luxury mobility. The BMW 7 Series combines bold design with groundbreaking technology.'
  },
  {
    id: 'luxury-3',
    name: 'Porsche Cayenne',
    brand: 'Porsche',
    model: 'Cayenne Turbo GT',
    category: 'suv',
    pricePerDay: 22000,
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: '7 km/l',
    year: 2024,
    color: 'GT Silver',
    engineCapacity: '4.0L V8 Twin-Turbo',
    horsepower: 631,
    features: ['PASM', 'Rear-Axle Steering', 'Carbon Ceramic Brakes', 'Sport Chrono Package', 'Burmester Audio', 'Lightweight Forged Wheels'],
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800',
      'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800'
    ],
    available: true,
    rating: 5.0,
    reviews: 76,
    description: 'The fastest production SUV on the Nürburgring. Porsche Cayenne Turbo GT is pure performance.'
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
  { id: 'loc-8', name: 'Pune - Koregaon Park', address: 'Lane 7, Koregaon Park, Pune 411001', city: 'Pune' },
  { id: 'loc-9', name: 'Hyderabad - Banjara Hills', address: 'Road No. 10, Banjara Hills, Hyderabad 500034', city: 'Hyderabad' },
  { id: 'loc-10', name: 'Kolkata - Park Street', address: 'Quest Mall, Park Street, Kolkata 700016', city: 'Kolkata' }
];

export function getVehicleById(id) {
  return vehicles.find(v => v.id === id);
}

export function getVehiclesByCategory(category) {
  if (!category || category === 'all') return vehicles;
  return vehicles.filter(v => v.category === category);
}

export function filterVehicles({ category, minPrice, maxPrice, seatingCapacity, fuelType, transmission, search, brand }) {
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

  if (transmission && transmission !== 'all') {
    filtered = filtered.filter(v => v.transmission === transmission);
  }

  if (brand && brand !== 'all') {
    filtered = filtered.filter(v => v.brand === brand);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(v => 
      v.name.toLowerCase().includes(searchLower) ||
      v.brand.toLowerCase().includes(searchLower) ||
      v.model.toLowerCase().includes(searchLower) ||
      v.category.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

export function getUniqueBrands() {
  return [...new Set(vehicles.map(v => v.brand))].sort();
}

export function getPriceRange() {
  const prices = vehicles.map(v => v.pricePerDay);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
