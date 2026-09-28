const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

// Helper function
const getRestaurant = async (ownerId) => {
    return await Restaurant.findOne({ ownerId });
};

// Add Menu Item
const addMenuItem = async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.user._id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const {
            name,
            description,
            category,
            price,
            isVeg
        } = req.body;

        const menuItem = await MenuItem.create({
            restaurantId: restaurant._id,
            name,
            description,
            category,
            price,
            isVeg,
            image: req.file ? req.file.filename : ""
        });

        res.status(201).json({
            message: "Menu item added successfully.",
            menuItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get My Menu
const getMyMenu = async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.user._id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const menu = await MenuItem.find({
            restaurantId: restaurant._id
        }).sort({ createdAt: -1 });

        res.status(200).json(menu);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Menu Item
const updateMenuItem = async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.user._id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const menuItem = await MenuItem.findOne({
            _id: req.params.id,
            restaurantId: restaurant._id
        });

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found."
            });
        }

        const {
            name,
            description,
            category,
            price,
            isVeg,
            isAvailable
        } = req.body;

        if (name !== undefined) menuItem.name = name;
        if (description !== undefined) menuItem.description = description;
        if (category !== undefined) menuItem.category = category;
        if (price !== undefined) menuItem.price = price;
        if (isVeg !== undefined) menuItem.isVeg = isVeg;
        if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

        if (req.file) {
            menuItem.image = req.file.filename;
        }

        await menuItem.save();

        res.status(200).json({
            message: "Menu item updated successfully.",
            menuItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Menu Item
const deleteMenuItem = async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.user._id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const menuItem = await MenuItem.findOneAndDelete({
            _id: req.params.id,
            restaurantId: restaurant._id
        });

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found."
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Toggle Availability
const toggleAvailability = async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.user._id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const menuItem = await MenuItem.findOne({
            _id: req.params.id,
            restaurantId: restaurant._id
        });

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found."
            });
        }

        menuItem.isAvailable = !menuItem.isAvailable;

        await menuItem.save();

        res.status(200).json({
            message: "Availability updated successfully.",
            isAvailable: menuItem.isAvailable
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Customer - Get Menu By Restaurant
const getMenuByRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        const menu = await MenuItem.find({
            restaurantId: restaurant._id,
            isAvailable: true
        }).sort({
            category: 1,
            name: 1
        });

        res.status(200).json(menu);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addMenuItem,
    getMyMenu,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    getMenuByRestaurant
};