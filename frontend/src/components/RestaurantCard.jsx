import { useNavigate } from "react-router-dom";
function RestaurantCard({ restaurant }) {
    const navigate = useNavigate();
    return (
        <div
            className="card"
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
        >
            <img
                src={
                    restaurant.logo
                        ? `http://localhost:5000/uploads/restaurants/logos/${restaurant.logo}`
                        : "https://placehold.co/400x250?text=Restaurant"
                }
                alt={restaurant.restaurantName}
            />
            <div className="card-details">
                <h3>{restaurant.restaurantName}</h3>
                <div className="rate-det">
                    <p className="rating">
                        <i className="fa-solid fa-star"></i>
                        &nbsp;4.5
                    </p>
                    <p>
                        &nbsp;&nbsp;
                        {restaurant.averagePreparationTime} mins
                    </p>
                </div>
                <p className={restaurant.isOpen ? "open" : "closed"}>
                    {restaurant.isOpen ? "Open" : "Closed"}
                </p>
                <p className="shortM">
                    {Array.isArray(restaurant.cuisine)
                        ? restaurant.cuisine.join(", ")
                        : restaurant.cuisine}
                </p>
                <p className="loc">
                    {restaurant.address?.city},{" "}
                    {restaurant.address?.state}
                </p>

            </div>

        </div>
    );
}

export default RestaurantCard;















/*import { useNavigate } from "react-router-dom";
function RestaurantCard({ restaurant }) {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="card-details">
                <h3>{restaurant.name}</h3>
                <div className="rate-det">
                    <p className="rating"><i class="fa-solid fa-star"></i> {restaurant.rating} </p>
                    <p>&nbsp;&nbsp;{restaurant.deliveryTime}</p>
                </div>
                <p className={restaurant.isOpen ? "open" : "closed"}>
                    {restaurant.isOpen ? "Open" : "Closed"}
                </p>
                <p className="shortM">{restaurant.menu[0].name},{restaurant.menu[1].name}</p>
                <p className="loc">{restaurant.address}</p>
            </div>
        </div>
    )
}
export default RestaurantCard;*/