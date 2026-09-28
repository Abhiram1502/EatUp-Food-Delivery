const Restaurant = require("../models/Restaurant");
const createRestaurant = async (req, res) => {
    try {
        const owner = req.user;
        const existingRestaurant =
            await Restaurant.findOne({
                ownerId: owner._id
            });
        if (existingRestaurant) {
            return res.status(400).json({
                message: "Restaurant already exists."
            });
        }
        const {
            restaurantName,
            description,
            address,
            cuisine,
            openingTime,
            closingTime,
            averagePreparationTime,
            deliveryRadius,
            minimumOrderAmount,
            deliveryFee
        } = req.body;
        const restaurant =
            await Restaurant.create({
                ownerId: owner._id,
                ownerName: owner.name,
                email: owner.email,
                phone: owner.phone,
                restaurantName,
                description,
                address,
                cuisine,
                openingTime,
                closingTime,
                averagePreparationTime,
                deliveryRadius,
                minimumOrderAmount,
                deliveryFee,
                logo: req.files?.logo
                    ? req.files.logo[0].filename
                    : ""
            });

        res.status(201).json({
            message: "Restaurant Created",
            restaurant
        });
    }

    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMyRestaurant = async (req, res) => {
    try {
        const restaurant =
            await Restaurant.findOne({
                ownerId: req.user._id
            });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }
        res.json(restaurant);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateRestaurant = async (req, res) => {
    try {
        const restaurant =
            await Restaurant.findOne({
                ownerId: req.user._id
            });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }
        const {
            restaurantName,
            description,
            address,
            cuisine,
            openingTime,
            closingTime,
            averagePreparationTime,
            deliveryRadius,
            minimumOrderAmount,
            deliveryFee,
            isOpen
        } = req.body;
        restaurant.restaurantName = restaurantName ?? restaurant.restaurantName;
        restaurant.description = description ?? restaurant.description;
        restaurant.address =address ?? restaurant.address;
        restaurant.cuisine =cuisine ?? restaurant.cuisine;
        restaurant.openingTime =openingTime ?? restaurant.openingTime;
        restaurant.closingTime = closingTime ?? restaurant.closingTime;
        restaurant.averagePreparationTime = averagePreparationTime ?? restaurant.averagePreparationTime;
        restaurant.deliveryRadius =deliveryRadius ??restaurant.deliveryRadius;
        restaurant.minimumOrderAmount =minimumOrderAmount ??restaurant.minimumOrderAmount;
        restaurant.deliveryFee =deliveryFee ??restaurant.deliveryFee;
        restaurant.isOpen =isOpen ??restaurant.isOpen;
        if (req.files?.logo) {
            restaurant.logo = req.files.logo[0].filename;
        }
        await restaurant.save();
        res.json({
            message: "Restaurant Updated",
            restaurant
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const toggleRestaurantStatus = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            ownerId: req.user._id
        });

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        restaurant.isOpen = !restaurant.isOpen;
        await restaurant.save();

        res.status(200).json({
            message: restaurant.isOpen
                ? "Restaurant is now Open."
                : "Restaurant is now Closed.",
            restaurant
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update restaurant status."
        });
    }
};

/*const getAllRestaurants = async (req, res)=>{
    try {
        const restaurants =
            await Restaurant.find({
                status: "approved"
            });
        res.json(restaurants);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}*/
const getAllRestaurants = async (req, res) => {
    try {

        const restaurants = await Restaurant.find();

        res.status(200).json(restaurants);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant =
            await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }
        res.json(restaurant);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createRestaurant,
    getMyRestaurant,
    updateRestaurant,
    toggleRestaurantStatus,
    getAllRestaurants,
    getRestaurantById
};