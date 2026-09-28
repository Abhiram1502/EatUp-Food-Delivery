const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const placeOrder = async (req, res) => {
    try {
        const {
            customerName,
            restaurantId,
            restaurantName,
            items,
            deliveryAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            totalAmount,
            specialInstructions
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty." });
        }

        const formattedItems = items.map((item) => ({
            itemId: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const order = await Order.create({
            customerId: req.user._id,
            customerName,
            restaurantId,
            restaurantName,
            items: formattedItems,
            deliveryAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            totalAmount,
            specialInstructions,
            status: "Pending"
        });

        res.status(201).json({
            message: "Order placed successfully.",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customerId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to fetch orders."
        });
    }
};
const getVendorOrders = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            ownerId: req.user._id
        });

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const orders = await Order.find({
            restaurantId: restaurant._id
        }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch vendor orders."
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Accepted",
            "Preparing",
            "Ready",
            "Picked Up",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status."
            });
        }

        const restaurant = await Restaurant.findOne({
            ownerId: req.user._id
        });

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const order = await Order.findOne({
            _id: req.params.id,
            restaurantId: restaurant._id
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found."
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully.",
            order
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update order status."
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getVendorOrders,
    updateOrderStatus
};