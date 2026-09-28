const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    /* ---------- Registration Details ---------- */

    restaurantName: {
        type: String,
        required: true,
        trim: true
    },

    ownerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    /* ---------- Editable Details ---------- */

    description: {
        type: String,
        default: ""
    },

    logo: {
        type: String,
        default: ""
    },

    cuisine: [
        {
            type: String
        }
    ],

    address: {
        building: String,
        street: String,
        city: String,
        state: String,
        pincode: String
    },

    openingTime: {
        type: String,
        default: "09:00 AM"
    },

    closingTime: {
        type: String,
        default: "09:00 PM"
    },

    deliveryFee: {
        type: Number,
        default: 0
    },

    minimumOrder: {
        type: Number,
        default: 0
    },

    averagePreparationTime: {
        type: Number,
        default: 30
    },

    deliveryRadius: {
        type: Number,
        default: 5
    },

    isOpen: {
        type: Boolean,
        default: true
    },

    /* ---------- Admin ---------- */

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    hygieneCertified: {
        type: Boolean,
        default: false
    },

    rejectionReason: {
        type: String,
        default: ""
    },

    rating: {
        average: {
            type: Number,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    }

}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);