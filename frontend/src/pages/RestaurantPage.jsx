import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import "../styles/RestaurantPage.css";

function RestaurantDetails() {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [activeTab, setActiveTab] = useState("menu");

    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    useEffect(() => {
        fetchRestaurant();
        fetchMenu();
    }, [id]);

    const fetchRestaurant = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/restaurants/${id}`);
            const data = await res.json();
            if (res.ok) {
                setRestaurant(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchMenu = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/menu/restaurant/${id}`);
            const data = await res.json();
            if (res.ok) {
                setMenu(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!restaurant) {
        return (
            <>
                <Navbar />
                <h2 style={{ textAlign: "center", margin: "100px" }}>
                    Loading Restaurant...
                </h2>
                <Footer />
            </>
        );
    }
    return (
        <>
            <Navbar />
            <div className="details-page">
                <div className="restaurant-top">
                    <img className="restaurant-logo"
                        src={
                            restaurant.logo
                                ? `http://localhost:5000/uploads/restaurants/logos/${restaurant.logo}`
                                : "https://placehold.co/180x180"
                        }
                        alt={restaurant.restaurantName}
                    />
                    <div className="restaurant-data">
                        <h1>{restaurant.restaurantName}</h1>
                        <p className="restaurant-description">{restaurant.description}</p>
                        <p className="restaurant-cuisine">
                            {Array.isArray(restaurant.cuisine)
                                ? restaurant.cuisine.join(", ")
                                : restaurant.cuisine}
                        </p>
                        <p className="restaurant-address">
                            <i className="fa-solid fa-map-location-dot"></i>&nbsp;{restaurant.address?.building},{" "}
                            {restaurant.address?.street},{" "}
                            {restaurant.address?.city},{" "}
                            {restaurant.address?.state} -
                            {restaurant.address?.pincode}
                        </p>
                        <div className="restaurant-info">
                            <div>
                                <i className="fa-regular fa-clock"></i>&nbsp;
                                <span>{restaurant.averagePreparationTime} mins</span>
                            </div>
                            <div>
                                <i class="fa-regular fa-truck"></i>&nbsp;
                                <span>₹{restaurant.deliveryFee}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-cart-shopping"></i>&nbsp;
                                <span>Min ₹{restaurant.minimumOrderAmount}</span>
                            </div>
                        </div>
                        <div className="restaurant-buttons">
                            <button><i className="fa-solid fa-phone"></i>&nbsp;Call</button>
                            <button><i className="fa-solid fa-location-arrow"></i>&nbsp;Directions</button> 
                        </div>
                        <div  className="page-sides">
                            <span className={restaurant.isOpen ? "opened" : "close"}>
                                {restaurant.isOpen ? "Open" : "Closed"}
                            </span>
                            <button className="fav-btn"><i className="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <button className={activeTab === "menu" ? "active" : ""} onClick={() => setActiveTab("menu")}>Menu</button>
                    <button className={activeTab === "photos" ? "active" : ""} onClick={() => setActiveTab("photos")}>Photos</button>
                    <button className={activeTab === "safety" ? "active" : ""} onClick={() => setActiveTab("safety")}>Food Safety</button>
                </div>
                {activeTab === "menu" && (
                    <div className="menu-list">
                        {menu.length === 0 ? (
                            <h3 style={{ textAlign: "center", marginTop: "40px" }}>
                                No Menu Items Available
                            </h3>
                        ) : (
                            menu.map((item) => {
                                const cartItem = cart.find(
                                    (i) =>
                                        i._id === item._id &&
                                        i.restaurantId === restaurant._id
                                );
                                return (
                                    <div className="menu-item" key={item._id}>
                                        <div className="menu-left">
                                            <h3 className="item-name">{item.name}<span className={item.isVeg ? "veg" : "nveg"}>{item.isVeg ? "Veg" : "Non Veg"}</span><span className="rating inpage"><i className="fa-solid fa-star"></i>&nbsp;4.5</span></h3>
                                            <p className="item-price">₹{item.price}</p>
                                            <p className="item-description">{item.description}</p>
                                            <p className={item.isAvailable ? "available" : "unavailable"}>
                                                {item.isAvailable ? "Available" : "Currently Unavailable"}
                                            </p>
                                        </div>
                                        <div className="menu-right">
                                            <img
                                                src={
                                                    item.image
                                                        ? `http://localhost:5000/uploads/menu/${item.image}`
                                                        : "https://placehold.co/180"
                                                }
                                                alt={item.name}
                                            />
                                            {item.isAvailable && (
                                                <>
                                                    {!cartItem ? (
                                                        <button className="add-btn" onClick={()=>addToCart(item, restaurant)}>ADD</button>
                                                    ) : (
                                                        <div className="quantity-box">
                                                            <button className="remove" onClick={() =>removeFromCart(item._id,restaurant._id)}>-</button>
                                                            <span className="quantity">
                                                                {cartItem.quantity}
                                                            </span>
                                                            <button className="add" onClick={() =>addToCart(item,restaurant)}>+</button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
                {activeTab === "photos" && (
                    <div className="photo-gallery">
                        <div className="photo-card">
                            <img
                                src={
                                    restaurant.logo
                                        ? `http://localhost:5000/uploads/restaurants/logos/${restaurant.logo}`
                                        : "https://placehold.co/350x250"
                                }
                                alt={restaurant.restaurantName}
                            />
                            <p>Restaurant Logo</p>
                        </div>
                        {menu.map((item) => (
                            <div className="photo-card" key={item._id}>
                                <img
                                    src={
                                        item.image
                                            ? `http://localhost:5000/uploads/menu/${item.image}`
                                            : "https://placehold.co/350x250"
                                    }
                                    alt={item.name}
                                />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "safety" && (
                    <div className="Hygenie">
                        <h2>Hygenie Check</h2>
                        <p>This section provides transparency into a restaurant's hygiene and food safety practices.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default RestaurantDetails;
















/*import { useParams } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import "../styles/RestaurantPage.css";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
function RestaurantDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("menu");
    const restaurant = restaurants.find((r) => r.id === Number(id));
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <>
            <Navbar />
            <div className="details-page">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left" }}><h1 className="res-name">{restaurant.name}</h1> <p className={`${restaurant.isOpen ? "opened" : "close"}`}>{restaurant.isOpen ? "Open" : "Closed"}</p></div>
                <p className="shortMenu">{restaurant.menu[0].name} , {restaurant.menu[1].name} , {restaurant.menu[2].name}</p>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", color: "black", margin: "5px 0px 0px 0px" }}><p>{restaurant.address}  &nbsp;|&nbsp;&nbsp;</p>
                    <p>{restaurant.deliveryTime} &nbsp;|&nbsp;&nbsp;</p>
                    <p>{restaurant.price}</p></div>
                <div className="side-det">
                    <p className={`${restaurant.veg ? "veg" : "nonveg"}`}>{restaurant.veg ? "Pure Veg" : ""}</p>
                    <p className="rating"><i class="fa-solid fa-star"></i> {restaurant.rating}</p>
                </div>
                <div className="det-btn" style={{ display: "flex", gap: "10px", margin: "10px 0px" }}><button>Directions</button>
                    <button>Call</button></div>
                <div className="tabs">
                    <div className="tab-btn">
                        <button className={`menu ${activeTab === "menu" ? "active" : ""}`} onClick={() => setActiveTab("menu")}>Menu</button>
                        <button className={`photos ${activeTab === "photos" ? "active" : ""}`} onClick={() => setActiveTab("photos")}>Photos</button>
                    </div>

                    {activeTab === "photos" && (
                        <div className="photos">
                            {restaurant.images?.map((img, i) => (
                                <img key={i} src={img} alt="food" />
                            ))}
                        </div>
                    )}
                    {activeTab === "menu" && (
                        <div className="menu-list">
                            {restaurant.menu.map((item) => {
                                const cartItem = cart.find(
                                    (i) =>
                                        i.id === item.id &&
                                        i.restaurantId === restaurant.id
                                );
                                return (
                                    <div key={item.id} className="menu-item">
                                        <div>
                                            <h4 className="item-name">{item.name}</h4>
                                            <p className="item-price">₹{item.price}</p>
                                            <p className="item-rating"><i className="fa-solid fa-star"></i> {item.rating}</p>
                                            <p className="item-description">{item.description}</p>
                                        </div>
                                        <div><img src={item.image} />{!cartItem ? (<button className="add-btn" onClick={() => addToCart(item, restaurant)}>ADD</button>) :
                                            (<div><button className="remove" onClick={() => removeFromCart(item.id, restaurant.id)}>-</button><span className="quantity">{cartItem.quantity}</span><button className="add" onClick={() => addToCart(item, restaurant)}>+</button></div>)}</div>
                                    </div>
                                );

                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RestaurantDetails;
*/