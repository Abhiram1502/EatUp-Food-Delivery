const restaurants = [
  {
    id: 1,
    name: "Hyderabadi Biryani House",
    phone: 987654321,
    image: "food_1",
    category: "Biryani",
    rating: 4.7,
    deliveryTime: "35-40 mins",
    price: "₹200 for one",
    isOpen: false,
    veg: false,
    address: "Governerpet",
    dishes: ["Chicken Biryani", "Mutton Biryani"],
    menu: [
      {
        id: 1,
        name: "Chicken Biryani",
        price: 220,
        description: "Aromatic basmati rice with spicy chicken",
        rating: 4.8,
        image: "food_1",
        veg: false
      },
      {
        id: 2,
        name: "Mutton Biryani",
        price: 280,
        description: "Rich and flavorful mutton dum biryani",
        rating: 4.7,
        image: "https://source.unsplash.com/300x200/?mutton-biryani",
        veg: false
      },
      {
        id: 3,
        name: "Egg Biryani",
        price: 180,
        description: "Delicious biryani with boiled eggs",
        rating: 4.3,
        image: "https://source.unsplash.com/300x200/?egg-biryani",
        veg: false
      },
      {
        id: 4,
        name: "Veg Biryani",
        price: 160,
        description: "Mixed vegetables cooked with spices",
        rating: 4.2,
        image: "https://source.unsplash.com/300x200/?veg-biryani",
        veg: true
      },
      {
        id: 5,
        name: "Chicken 65",
        price: 190,
        description: "Spicy deep-fried chicken starter",
        rating: 4.5,
        image: "https://source.unsplash.com/300x200/?chicken65",
        veg: false
      }
    ]
  },

  {
    id: 2,
    name: "Paradise Biryani",
    phone: 987654321,
    image: "food_2",
    category: "Biryani",
    rating: 4.6,
    deliveryTime: "30-35 mins",
    price: "₹220 for one",
    isOpen: true,
    veg: false,
    address: "MG Road",
    dishes: ["Special Biryani"],
    menu: [
      { id: 1, name: "Special Chicken Biryani", price: 240 },
      { id: 2, name: "Mutton Biryani", price: 300 },
      { id: 3, name: "Chicken Fry Piece Biryani", price: 260 },
      { id: 4, name: "Egg Biryani", price: 180 },
      { id: 5, name: "Paneer Biryani", price: 200 }
    ]
  },

  {
    id: 3,
    name: "Amritsar Da Dhaba",
    phone: 987654321,
    image: "food_3",
    category: "North Indian",
    rating: 4.5,
    deliveryTime: "30-35 mins",
    price: "₹180 for one",
    isOpen: true,
    veg: false,
    address: "Kannur",
    dishes: ["Butter Chicken", "Naan"],
    menu: [
      { id: 1, name: "Butter Chicken", price: 250 },
      { id: 2, name: "Paneer Butter Masala", price: 220 },
      { id: 3, name: "Dal Makhani", price: 180 },
      { id: 4, name: "Butter Naan", price: 40 },
      { id: 5, name: "Tandoori Roti", price: 30 }
    ]
  },

  {
    id: 4,
    name: "Tandoori Nights",
    phone: 987654321,
    image: "food_4",
    category: "North Indian",
    rating: 4.6,
    deliveryTime: "40-45 mins",
    price: "₹250 for one",
    isOpen: true,
    veg: false,
    address: "Poranki",
    dishes: ["Tandoori Chicken"],
    menu: [
      { id: 1, name: "Tandoori Chicken", price: 300 },
      { id: 2, name: "Chicken Tikka", price: 280 },
      { id: 3, name: "Dal Fry", price: 150 },
      { id: 4, name: "Garlic Naan", price: 50 },
      { id: 5, name: "Jeera Rice", price: 120 }
    ]
  },

  {
    id: 5,
    name: "Udupi Tiffins",
    phone: 987654321,
    image: "food_5",
    category: "South Indian",
    rating: 4.4,
    deliveryTime: "25-30 mins",
    price: "₹120 for one",
    isOpen: true,
    veg: true,
    address: "MG Road",
    dishes: ["Masala Dosa", "Idli"],
    menu: [
      { id: 1, name: "Masala Dosa", price: 90 },
      { id: 2, name: "Plain Dosa", price: 70 },
      { id: 3, name: "Idli", price: 50 },
      { id: 4, name: "Vada", price: 60 },
      { id: 5, name: "Filter Coffee", price: 40 }
    ]
  },

  {
    id: 6,
    name: "Chennai Dosa Plaza",
    phone: 987654321,
    image: "food_6",
    category: "South Indian",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    price: "₹110 for one",
    isOpen: true,
    veg: true,
    address: "Poranki",
    dishes: ["Plain Dosa"],
    menu: [
      { id: 1, name: "Plain Dosa", price: 80 },
      { id: 2, name: "Rava Dosa", price: 100 },
      { id: 3, name: "Onion Uttapam", price: 110 },
      { id: 4, name: "Idli", price: 50 },
      { id: 5, name: "Coffee", price: 40 }
    ]
  },

  {
    id: 7,
    name: "Mumbai Street Adda",
    phone: 987654321,
    image: "food_7",
    category: "Street Food",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    price: "₹100 for one",
    isOpen: true,
    veg: true,
    address: "Krishna Lanka",
    dishes: ["Pav Bhaji", "Vada Pav"],
    menu: [
      { id: 1, name: "Pav Bhaji", price: 120 },
      { id: 2, name: "Vada Pav", price: 40 },
      { id: 3, name: "Bhel Puri", price: 60 },
      { id: 4, name: "Sev Puri", price: 70 },
      { id: 5, name: "Dahi Puri", price: 80 }
    ]
  },

  {
    id: 8,
    name: "Delhi Chaat Corner",
    phone: 987654321,
    image: "food_8",
    category: "Street Food",
    rating: 4.2,
    deliveryTime: "18-25 mins",
    price: "₹90 for one",
    isOpen: true,
    veg: true,
    address: "Eat Street",
    dishes: ["Pani Puri"],
    menu: [
      { id: 1, name: "Pani Puri", price: 50 },
      { id: 2, name: "Aloo Chaat", price: 70 },
      { id: 3, name: "Papdi Chaat", price: 80 },
      { id: 4, name: "Raj Kachori", price: 100 },
      { id: 5, name: "Samosa Chaat", price: 90 }
    ]
  },

  {
    id: 9,
    name: "Chinese Wok",
    phone: 987654321,
    image: "food_9",
    category: "Chinese",
    rating: 4.3,
    deliveryTime: "25-30 mins",
    price: "₹150 for one",
    isOpen: true,
    veg: false,
    address: "Benz Circle",
    dishes: ["Noodles"],
    menu: [
      { id: 1, name: "Veg Noodles", price: 140 },
      { id: 2, name: "Chicken Noodles", price: 170 },
      { id: 3, name: "Fried Rice", price: 150 },
      { id: 4, name: "Manchurian", price: 160 },
      { id: 5, name: "Spring Rolls", price: 120 }
    ]
  },

  {
    id: 10,
    name: "Wok Express",
    phone: 987654321,
    image: "food_10",
    category: "Chinese",
    rating: 4.4,
    deliveryTime: "30-35 mins",
    price: "₹160 for one",
    isOpen: true,
    veg: false,
    address: "Kannur",
    dishes: ["Schezwan Noodles"],
    menu: [
      { id: 1, name: "Schezwan Noodles", price: 160 },
      { id: 2, name: "Hakka Noodles", price: 150 },
      { id: 3, name: "Veg Fried Rice", price: 140 },
      { id: 4, name: "Chicken Fried Rice", price: 170 },
      { id: 5, name: "Chilli Chicken", price: 190 }
    ]
  },

  {
    id: 11,
    name: "Sweet Treats",
    phone: 987654321,
    image: "food_11",
    category: "Desserts",
    rating: 4.5,
    deliveryTime: "20-25 mins",
    price: "₹100 for one",
    isOpen: true,
    veg: true,
    address: "MG Road",
    dishes: ["Ice Cream"],
    menu: [
      { id: 1, name: "Chocolate Brownie", price: 120 },
      { id: 2, name: "Ice Cream", price: 80 },
      { id: 3, name: "Waffle", price: 150 },
      { id: 4, name: "Cup Cake", price: 90 },
      { id: 5, name: "Milkshake", price: 110 }
    ]
  },

  {
    id: 12,
    name: "Sweet Magic",
    phone: 987654321,
    image: "food_12",
    category: "Desserts",
    rating: 4.4,
    deliveryTime: "18-20 mins",
    price: "₹90 for one",
    isOpen: true,
    veg: true,
    address: "Eat Street",
    dishes: ["Rasgulla"],
    menu: [
      { id: 1, name: "Rasgulla", price: 30 },
      { id: 2, name: "Gulab Jamun", price: 35 },
      { id: 3, name: "Sandesh", price: 40 },
      { id: 4, name: "Rasmalai", price: 60 },
      { id: 5, name: "Kheer", price: 70 }
    ]
  },

  {
    id: 13,
    name: "Burger King",
    phone: 987654321,
    image: "food_13",
    category: "Fast Food",
    rating: 4.2,
    deliveryTime: "20-25 mins",
    price: "₹120 for one",
    isOpen: true,
    veg: false,
    address: "MG Road",
    dishes: ["Burger"],
    menu: [
      { id: 1, name: "Veg Burger", price: 120 },
      { id: 2, name: "Chicken Burger", price: 150 },
      { id: 3, name: "French Fries", price: 90 },
      { id: 4, name: "Pizza Slice", price: 110 },
      { id: 5, name: "Cold Drink", price: 50 }
    ]
  },

  {
    id: 14,
    name: "Delight Dhaba",
    phone: 987654321,
    image: "food_14",
    category: "Pure Veg",
    rating: 4.3,
    deliveryTime: "25-30 mins",
    price: "₹130 for one",
    isOpen: true,
    veg: true,
    address: "Mangalagiri",
    dishes: ["Veg Meals"],
    menu: [
      { id: 1, name: "Veg Thali", price: 150 },
      { id: 2, name: "Paneer Curry", price: 180 },
      { id: 3, name: "Dal Fry", price: 120 },
      { id: 4, name: "Chapati", price: 20 },
      { id: 5, name: "Rice", price: 80 }
    ]
  }
];
module.exports = { restaurants };