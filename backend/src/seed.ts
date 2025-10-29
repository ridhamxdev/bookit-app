import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';

dotenv.config();

const experiences = [
  {
    title: "Kayaking",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    location: "Udupi",
    price: 999,
    duration: "3 hours",
    category: "Adventure",
    rating: 4.8,
    reviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Professional kayaking instruction",
      "Safety equipment provided",
      "Small group experience (max 8 people)",
      "Scenic river route",
      "Expert guide included"
    ],
    included: [
      "All safety equipment",
      "Professional guide",
      "Helmet and life jacket",
      "Basic kayaking training"
    ],
    notIncluded: [
      "Transportation to meeting point",
      "Meals",
      "Personal expenses"
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before the experience starts.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "07:00 am", availableSpots: 4, maxCapacity: 8, price: 999 },
          { time: "09:00 am", availableSpots: 2, maxCapacity: 8, price: 999 },
          { time: "11:00 am", availableSpots: 5, maxCapacity: 8, price: 999 },
          { time: "1:00 pm", availableSpots: 0, maxCapacity: 8, price: 999 }
        ]
      },
      {
        date: "2025-10-23",
        slots: [
          { time: "07:00 am", availableSpots: 6, maxCapacity: 8, price: 999 },
          { time: "09:00 am", availableSpots: 4, maxCapacity: 8, price: 999 }
        ]
      },
      {
        date: "2025-10-24",
        slots: [
          { time: "07:00 am", availableSpots: 8, maxCapacity: 8, price: 999 }
        ]
      },
      {
        date: "2025-10-25",
        slots: [
          { time: "07:00 am", availableSpots: 5, maxCapacity: 8, price: 999 }
        ]
      },
      {
        date: "2025-10-26",
        slots: [
          { time: "07:00 am", availableSpots: 3, maxCapacity: 8, price: 999 }
        ]
      }
    ]
  },
  {
    title: "Nandi Hills Sunrise",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the breathtaking sunrise from Nandi Hills with a guided trek.",
    location: "Bangalore",
    price: 899,
    duration: "4 hours",
    category: "Nature",
    rating: 4.9,
    reviews: 243,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Witness stunning sunrise views",
      "Guided trek experience",
      "Small group setting",
      "Photography opportunities",
      "Refreshments included"
    ],
    included: [
      "Transportation from Bangalore",
      "Professional guide",
      "Morning refreshments",
      "Entry fees"
    ],
    notIncluded: [
      "Breakfast",
      "Personal expenses",
      "Camera equipment"
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before the experience.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "04:00 am", availableSpots: 10, maxCapacity: 15, price: 899 },
          { time: "04:30 am", availableSpots: 8, maxCapacity: 15, price: 899 }
        ]
      },
      {
        date: "2025-10-23",
        slots: [
          { time: "04:00 am", availableSpots: 12, maxCapacity: 15, price: 899 }
        ]
      }
    ]
  },
  {
    title: "Coffee Trail",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore the lush coffee plantations of Coorg with an expert guide.",
    location: "Coorg",
    price: 1299,
    duration: "5 hours",
    category: "Nature",
    rating: 4.7,
    reviews: 189,
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Tour of coffee plantations",
      "Learn about coffee processing",
      "Taste fresh coffee",
      "Nature walk through estates",
      "Local expert guide"
    ],
    included: [
      "Plantation tour",
      "Coffee tasting session",
      "Expert guide",
      "Traditional lunch",
      "Transportation within estate"
    ],
    notIncluded: [
      "Hotel pickup",
      "Additional food and drinks",
      "Shopping"
    ],
    cancellationPolicy: "Free cancellation up to 24 hours in advance.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "09:00 am", availableSpots: 6, maxCapacity: 10, price: 1299 },
          { time: "02:00 pm", availableSpots: 8, maxCapacity: 10, price: 1299 }
        ]
      }
    ]
  },
  {
    title: "Kayaking",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience kayaking through serene backwaters with complete safety gear.",
    location: "Udupi, Karnataka",
    price: 999,
    duration: "3 hours",
    category: "Adventure",
    rating: 4.8,
    reviews: 198,
    imageUrl: "https://images.unsplash.com/photo-1493787039806-2edcbe808750?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493787039806-2edcbe808750?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Backwater kayaking experience",
      "Complete safety equipment",
      "Professional instructor",
      "Scenic natural beauty",
      "Small group size"
    ],
    included: [
      "Kayak and paddle",
      "Life jacket and helmet",
      "Professional guide",
      "Training session",
      "Bottled water"
    ],
    notIncluded: [
      "Transportation",
      "Meals",
      "Camera",
      "Personal expenses"
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before start time.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "07:00 am", availableSpots: 5, maxCapacity: 8, price: 999 },
          { time: "10:00 am", availableSpots: 3, maxCapacity: 8, price: 999 }
        ]
      }
    ]
  },
  {
    title: "Boat Cruise",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Enjoy a relaxing boat cruise through scenic waterways.",
    location: "Sunderban",
    price: 999,
    duration: "4 hours",
    category: "Nature",
    rating: 4.6,
    reviews: 167,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Scenic boat ride",
      "Wildlife spotting opportunity",
      "Comfortable seating",
      "Refreshments onboard",
      "Expert commentary"
    ],
    included: [
      "Boat ride",
      "Life jackets",
      "Guide services",
      "Snacks and beverages",
      "Entry permits"
    ],
    notIncluded: [
      "Hotel transfers",
      "Lunch",
      "Gratuities"
    ],
    cancellationPolicy: "Free cancellation up to 48 hours in advance.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "09:00 am", availableSpots: 15, maxCapacity: 20, price: 999 },
          { time: "02:00 pm", availableSpots: 12, maxCapacity: 20, price: 999 }
        ]
      }
    ]
  },
  {
    title: "Bunjee Jumping",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the ultimate adrenaline rush with bungee jumping from 83 meters.",
    location: "Manali",
    price: 999,
    duration: "2 hours",
    category: "Adventure",
    rating: 5.0,
    reviews: 234,
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop"
    ],
    highlights: [
      "83-meter high jump",
      "International safety standards",
      "Experienced instructors",
      "Video recording available",
      "Certificate of bravery"
    ],
    included: [
      "All safety equipment",
      "Professional jump master",
      "Safety briefing",
      "Jump certificate",
      "Medical check"
    ],
    notIncluded: [
      "Video recording (₹500 extra)",
      "Photos (₹300 extra)",
      "Transportation",
      "Food and beverages"
    ],
    cancellationPolicy: "No refund for cancellations. Reschedule allowed once.",
    availableDates: [
      {
        date: "2025-10-22",
        slots: [
          { time: "10:00 am", availableSpots: 4, maxCapacity: 6, price: 999 },
          { time: "12:00 pm", availableSpots: 2, maxCapacity: 6, price: 999 },
          { time: "02:00 pm", availableSpots: 6, maxCapacity: 6, price: 999 }
        ]
      }
    ]
  },
  {
    title: "Nandi Hills Sunrise",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Early morning trek to catch the mesmerizing sunrise.",
    location: "Bangalore",
    price: 899,
    duration: "4 hours",
    category: "Nature",
    rating: 4.9,
    reviews: 312,
    imageUrl: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Pre-dawn departure",
      "Summit sunrise viewing",
      "Historical fort visit",
      "Bird watching opportunity",
      "Morning tea included"
    ],
    included: [
      "Round trip transportation",
      "Expert guide",
      "Morning tea and snacks",
      "Entry fees",
      "First aid support"
    ],
    notIncluded: [
      "Breakfast",
      "Camera fees",
      "Personal expenses"
    ],
    cancellationPolicy: "Weather dependent. Full refund if canceled due to weather.",
    availableDates: [
      {
        date: "2025-10-23",
        slots: [
          { time: "04:00 am", availableSpots: 10, maxCapacity: 15, price: 899 }
        ]
      }
    ]
  },
  {
    title: "Coffee Trail",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Immersive coffee plantation tour in the hills of Coorg.",
    location: "Coorg",
    price: 1299,
    duration: "5 hours",
    category: "Culture",
    rating: 4.8,
    reviews: 145,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop"
    ],
    highlights: [
      "Guided plantation walk",
      "Coffee processing demonstration",
      "Cupping session",
      "Organic farming insights",
      "Traditional Coorgi hospitality"
    ],
    included: [
      "Plantation guided tour",
      "Coffee tasting",
      "Traditional lunch",
      "Take-home coffee sample",
      "Expert guide"
    ],
    notIncluded: [
      "Hotel pickup and drop",
      "Coffee purchases",
      "Additional beverages"
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before start time.",
    availableDates: [
      {
        date: "2025-10-23",
        slots: [
          { time: "09:00 am", availableSpots: 8, maxCapacity: 12, price: 1299 },
          { time: "01:00 pm", availableSpots: 10, maxCapacity: 12, price: 1299 }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit';
    await mongoose.connect(mongoURI);
    
    console.log('✓ Connected to MongoDB');
    
    // Clear existing data
    await Experience.deleteMany({});
    console.log('✓ Cleared existing experiences');
    
    // Insert new experiences
    await Experience.insertMany(experiences);
    console.log(`✓ Successfully seeded ${experiences.length} experiences`);
    
    console.log('\nSample experiences:');
    experiences.forEach((exp, index) => {
      console.log(`  ${index + 1}. ${exp.title} - ${exp.location}`);
    });
    
    mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
