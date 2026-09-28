import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Orders.css";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/orders/my-orders", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                setOrders(data);
            } else {
                setError(data.message || "Failed to fetch orders.");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="orders-page">
                    <h1>My Orders</h1>
                    <p className="orders-loading">Loading your orders...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="orders-page">
                <div className="orders-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h1>My Orders</h1>
                </div>

                {error && (
                    <div className="orders-error">
                        {error}
                    </div>
                )}

                {!error && orders.length === 0 && (
                    <div className="no-orders">
                        <i className="fa-solid fa-receipt"></i>
                        <h2>No Orders Yet</h2>
                        <p>You haven't placed any orders yet.</p>
                        <button onClick={() => navigate("/")}>
                            Explore Restaurants
                        </button>
                    </div>
                )}

                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="restaurant-icon">
                                <i className="fa-solid fa-store"></i>
                            </div>
                            <div className="order-card-details">
                                <div className="restaurant-info">
                                    <div>
                                        <h2>{order.restaurantName}</h2>
                                        <p>ORDER #{order._id.slice(-8).toUpperCase()}</p>
                                        <span>{formatDate(order.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="order-payment">
                                    <span>Payment: </span>
                                    <strong>{order.paymentMethod}</strong>
                                </div>
                                <hr />
                                <div className="order-items">
                                    <p style={{ display: "flex" }}>
                                        {order.items.slice(0, 3).map((item, index) => (
                                            <p key={item.itemId || index}>
                                                {item.name} × {item.quantity},
                                            </p>
                                        ))}
                                        {order.items.length > 3 && (
                                            <p className="more-items">
                                                +{order.items.length - 3} more items
                                            </p>
                                        )}
                                    </p>
                                </div>
                                <div className="order-total">
                                    <span>Total Amount: </span>
                                    <strong>₹{order.totalAmount}</strong>
                                </div>
                            </div>
                            <div className="order-status">
                                <span>{order.status === "Delivered" && (
                                    <i className="fa-solid fa-circle-check"></i>
                                )}</span>
                                <p>{order.status}</p>
                            </div>
                            <div className="order-card-bottom">
                                <button onClick={() => navigate("/")}>Reorder</button>
                                <button
                                    className="view-details-btn"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {selectedOrder && (
                <div className="order-modal-overlay">
                    <div className="order-modal">

                        <button
                            className="close-modal"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <h2>{selectedOrder.restaurantName}</h2>

                        <p className="modal-order-id">
                            Order #{selectedOrder._id.slice(-8).toUpperCase()}
                        </p>

                        <div className="modal-status">
                            <strong>Status:</strong>
                            <span>{selectedOrder.status}</span>
                        </div>

                        <hr />

                        <h3>Items</h3>

                        {selectedOrder.items.map((item, index) => (
                            <div className="modal-item" key={item.itemId || index}>
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}

                        <h3>Delivery Address</h3>

                        <div className="modal-address">
                            <strong>
                                {selectedOrder.deliveryAddress?.label}
                            </strong>

                            <p>{selectedOrder.deliveryAddress?.street}</p>

                            <p>
                                {selectedOrder.deliveryAddress?.city},{" "}
                                {selectedOrder.deliveryAddress?.state}
                            </p>

                            <p>
                                {selectedOrder.deliveryAddress?.pincode}
                            </p>
                        </div>

                        <h3>Special Instructions</h3>

                        <p>
                            {selectedOrder.specialInstructions ||
                                "No special instructions"}
                        </p>

                        <h3>Payment</h3>

                        <p>{selectedOrder.paymentMethod}</p>

                        <div className="modal-total">
                            <span>Total</span>
                            <strong>₹{selectedOrder.totalAmount}</strong>
                        </div>

                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Orders;