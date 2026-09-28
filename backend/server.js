const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const restaurantRoutes =require("./routes/restaurants");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orders");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("EatUp Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(
    "/api/restaurants",
    restaurantRoutes
);
const path = require("path");

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);