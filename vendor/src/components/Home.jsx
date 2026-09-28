import "../styles/Home.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Home() {
    const [restaurant, setRestaurant] = useState(null);
    const vendor = JSON.parse(localStorage.getItem("user"));

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning ☀️";
        if (hour < 18) return "Good Afternoon 🌤️";
        return "Good Evening 🌙";
    };

    const fetchRestaurant = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/restaurants/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                setRestaurant(data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch restaurant.");
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const toggleRestaurant = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/restaurants/toggle", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setRestaurant(data.restaurant);
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update restaurant status.");
        }
    };

    return (
        <>
            <div className="profile-banner">
                <img className="user-icon" src={assets.user_icon} alt="user" />

                <div className="vendor-info">
                    <h1 className="username">
                        {restaurant?.restaurantName || "Loading..."}
                    </h1>

                    <h2>
                        {getGreeting()} , <span>{vendor?.name}</span>
                    </h2>
                </div>
            </div>

            <button
                className={`restaurant-status-btn ${restaurant?.isOpen ? "open" : "closed"}`}
                onClick={toggleRestaurant}
            >
                <i
                    className={`fa-solid ${restaurant?.isOpen ? "fa-toggle-on" : "fa-toggle-off"}`}
                ></i>
                {restaurant?.isOpen ? "Open" : "Closed"}
            </button>
        </>
    );
}

export default Home;