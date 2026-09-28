const express = require("express");
const router = express.Router();

const {
    createRestaurant,
    getMyRestaurant,
    updateRestaurant,
    toggleRestaurantStatus,
    getAllRestaurants,
    getRestaurantById
} = require("../controllers/restaurantController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/uploadRestaurantImages");

// Restaurant Owner
router.post(
    "/",
    auth,
    authorize("restaurantOwner"),
    upload.single("logo"),
    createRestaurant
);

router.get(
    "/my",
    auth,
    authorize("restaurantOwner"),
    getMyRestaurant
);

router.put(
    "/my",
    auth,
    authorize("restaurantOwner"),
    upload.single("logo"),
    updateRestaurant
);

router.patch(
    "/toggle",
    auth,
    authorize("restaurantOwner"),
    toggleRestaurantStatus
);

// Customer
router.get("/", getAllRestaurants);

router.get("/:id", getRestaurantById);

module.exports = router;