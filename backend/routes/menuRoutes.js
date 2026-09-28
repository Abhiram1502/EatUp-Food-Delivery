const express = require("express");
const router = express.Router();
const {
    addMenuItem,
    getMyMenu,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    getMenuByRestaurant
} = require("../controllers/menuController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/uploadMenuImage");
router.post(
    "/",
    auth,
    authorize("restaurantOwner"),
    upload.single("image"),
    addMenuItem
);

router.get(
    "/my",
    auth,
    authorize("restaurantOwner"),
    getMyMenu
);

router.put(
    "/:id",
    auth,
    authorize("restaurantOwner"),
    upload.single("image"),
    updateMenuItem
);

router.delete(
    "/:id",
    auth,
    authorize("restaurantOwner"),
    deleteMenuItem
);

router.patch(
    "/:id/availability",
    auth,
    authorize("restaurantOwner"),
    toggleAvailability
);

router.get(
    "/restaurant/:restaurantId",
    getMenuByRestaurant
);

module.exports = router;