const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    restaurantName: {
        type: String,
        required: true
    },

    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true
            },

            name: {
                type: String,
                required: true
            },

            price: {
                type: Number,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    deliveryAddress: {
        label: String,
        street: String,
        city: String,
        state: String,
        pincode: String
    },

    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "UPI", "Card"],
        default: "Cash on Delivery"
    },

    subtotal: {
        type: Number,
        required: true
    },

    deliveryFee: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },
    specialInstructions: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Preparing",
            "Ready",
            "Picked Up",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);