const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    image: {
        type: String,
        default: ""
    },

    isVeg: {
        type: Boolean,
        default: false
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);