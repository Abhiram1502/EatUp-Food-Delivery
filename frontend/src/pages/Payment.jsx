import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import "../styles/Payment.css";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, clearCart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const {
        address,
        subtotal,
        deliveryFee,
        total,
        instructions,
        restaurant
    } = location.state;
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const placeOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    customerName: user.name,
                    restaurantId: cart[0].restaurantId,
                    restaurantName: cart[0].restaurantName,
                    items: cart,
                    deliveryAddress: address,
                    paymentMethod,
                    subtotal,
                    deliveryFee,
                    totalAmount: total,
                    specialInstructions: instructions
                })
            });
            const data = await res.json();
            if (res.ok) {
                clearCart();
                navigate("/order-success", {
                    state: {
                        order: data.order
                    }
                });
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="payment-page">
                <div className="payment-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h1>Payment</h1>
                </div>
                <div className="payment-details">
                    <div className="payment-card">
                        <h3 className="pay-head">Select Your Preferred Payment Method</h3>
                        <label>
                            <input
                                type="radio"
                                checked={paymentMethod === "Cash on Delivery"}
                                onChange={() =>
                                    setPaymentMethod("Cash on Delivery")
                                }
                            />&nbsp;&nbsp;Cash on Delivery</label>
                        <label>
                            <input
                                type="radio"
                                disabled
                            />
                            &nbsp;&nbsp;UPI (Coming Soon)
                        </label>
                        <label>
                            <input
                                type="radio"
                                disabled
                            />
                            &nbsp;&nbsp;Credit / Debit Card (Coming Soon)
                        </label>
                        <div className="bill">
                            <h3 className="pay-head">Bill Details</h3>
                            <p>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </p>
                            <p>
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee}</span>
                            </p>
                            <h3>
                                <span>Total</span>
                                <span>₹{total}</span>
                            </h3>
                        </div>
                        <button className="payment-btn" onClick={placeOrder}>Place Order</button>
                    </div>
                    <div className="order-review-card">
                        <h2>Order Review</h2>
                        <h3 className="review-head"><i className="fa-solid fa-store"></i> {cart[0]?.restaurantName}<p className={`status ${restaurant?.isOpen ? "isopen" : "isclosed"}`}>{restaurant?.isOpen ? "Open Now" : "Closed"}</p></h3>
                        <div className="review-section">
                            <h3><i className="fa-solid fa-utensils"></i> Items</h3>
                            {cart.map(item => (
                                <div className="review-item" key={item._id}>
                                    <span>{item.name}</span>
                                    <span>× {item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="review-section">
                            <h3><i className="fa-solid fa-note-sticky"></i> Instructions</h3>
                            <p>
                                {instructions
                                    ? instructions
                                    : "No special instructions"}
                            </p>
                        </div>
                        <div className="review-section">
                            <h3><i className="fa-solid fa-truck-fast"></i> Estimated Delivery</h3>
                            <p>
                                {restaurant?.averagePreparationTime
                                    ? `${restaurant.averagePreparationTime} - ${Number(restaurant.averagePreparationTime) + 10} mins`
                                    : "30 - 40 mins"}
                            </p>
                        </div>
                        <div className="review-section">
                            <h3><i className="fa-solid fa-location-dot"></i> Deliver To</h3>
                            <p>{address?.label}</p>
                            <p>{address?.street}</p>
                            <p>{address?.city}, {address?.state}</p>
                            <p>{address?.pincode}</p>
                        </div>
                        <div className="review-section">
                            <h3><i className="fa-solid fa-money-bill-wave"></i> Payment</h3>
                            <p>{paymentMethod}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Payment;