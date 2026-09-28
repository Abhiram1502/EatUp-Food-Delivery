import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import "../styles/Restaurants.css";
import FloatingEmojis from "./FloatingEmojis";

function Restaurants({ category }) {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/restaurants");

      const data = await res.json();

      if (res.ok) {
        setRestaurants(data);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  let filtered = restaurants;
  if (category === "veg") {
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.cuisine?.toLowerCase().includes("veg")
    );
  } else if (category) {
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.cuisine?.toLowerCase() === category.toLowerCase()
    );
  }
  return (
    <div className="restaurant-wrapper">
      <FloatingEmojis count={10} />
      <div className="restaurant-list">
        {loading ? (
          <h2>Loading Restaurants...</h2>
        ) : filtered.length === 0 ? (
          <p>No restaurants found 😔</p>
        ) : (
          filtered.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant}/>
          ))
        )}
      </div>
    </div>
  );
}

export default Restaurants;