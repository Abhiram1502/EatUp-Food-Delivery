import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = state?.order;
    const steps = [
        "Pending",
        "Accepted",
        "Preparing",
        "Ready",
        "Picked Up",
        "Delivered"
    ];
    const currentStep = steps.indexOf(order.status || "Pending");
    if (!order) {
        return (
            <>
                <Navbar />
                <div className="order-success-page">
                    <div className="success-card">
                        <h2>Order not found.</h2>
                        <button onClick={() => navigate("/")}>
                            Go Home
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    const estimatedTime = `${order.restaurant?.averagePreparationTime || 30} - ${(order.restaurant?.averagePreparationTime || 30) + 10} mins`;
    const address = order.deliveryAddress;
    return (
        <>
            <Navbar />
            <div className="order-success-page">
                <div className="success-card">
                    <div className="success-icon">
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h1>Order Confirmed!</h1>
                    <p className="success-msg">
                        Your order has been placed successfully.
                        The restaurant has been notified and will begin preparing your food shortly.
                    </p>
                </div>
                <div className="success-content">
                    <div className="order-details-card">
                        <h2>Order Details</h2>
                        <div className="detail-row">
                            <span>Order ID</span>
                            <span>#{order._id.slice(-8).toUpperCase()}</span>
                        </div>
                        <div className="detail-row">
                            <span>Restaurant</span>
                            <span>{order.restaurantName}</span>
                        </div>
                        <div className="detail-row">
                            <span>Estimated Delivery</span>
                            <span>{estimatedTime}</span>
                        </div>
                        <div className="detail-row">
                            <span>Payment</span>
                            <span>{order.paymentMethod}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        {order.items.map((item) => (
                            <div
                                className="summary-row"
                                key={item._id}
                            >
                                <span>{item.name}</span>
                                <span>× {item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="delivery-card">
                        <h2>Delivery Address</h2>
                        <p><strong>{address?.label}</strong></p>
                        <p>{address?.street}</p>
                        <p>{address?.city}, {address?.state}</p>
                        <p>{address?.pincode}</p>
                    </div>
                </div>

                <div className="timeline-card">
                    <h2>Order Status</h2>

                    <div className="status-progress">

                        <div
                            className="progress-line-active"
                            style={{
                                width: `${(currentStep / (steps.length - 1)) * 100}%`
                            }}
                        ></div>

                        <div className="progress-line"></div>

                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className={`status-step ${index <= currentStep ? "active" : ""}`}
                            >
                                <div className="circle">
                                    {index <= currentStep && (
                                        <i className="fa-solid fa-check"></i>
                                    )}
                                </div>

                                <p>{step}</p>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="success-buttons">
                    <button
                        className="track-btn"
                        onClick={() => navigate("/orders")}
                    >
                        Track Order
                    </button>
                    <button
                        className="continue-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderSuccess;