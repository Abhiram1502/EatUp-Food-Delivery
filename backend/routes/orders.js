const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    getVendorOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.post("/", auth, authorize("customer"), placeOrder);

router.get("/my-orders", auth, authorize("customer"), getMyOrders);

router.get(
    "/vendor-orders",
    auth,
    authorize("restaurantOwner"),
    getVendorOrders
);

router.put(
    "/:id/status",
    auth,
    authorize("restaurantOwner"),
    updateOrderStatus
);

module.exports = router;