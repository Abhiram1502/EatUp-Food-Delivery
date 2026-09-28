import { useNavigate } from "react-router-dom";

function ProfileOrders({ orders, formatDate }) {
    const navigate = useNavigate();

    return (
        <div className="profile-orders-section">
            <div className="profile-order-header">
                <h2>Your Orders</h2>

                <button
                    className="profile-view-all-btn"
                    onClick={() => navigate("/orders")}
                >
                    View All Orders
                </button>
            </div>

            <hr />

            {orders.length === 0 ? (
                <p>No orders yet 🍽️</p>
            ) : (
                orders.slice(0, 5).map((order) => (
                    <div
                        className="profile-order-card"
                        key={order._id}
                    >
                        <div className="profile-restaurant-icon">
                            <i className="fa-solid fa-store"></i>
                        </div>

                        <div className="profile-order-details">

                            <div className="profile-restaurant-info">
                                <h3>{order.restaurantName}</h3>

                                <p>
                                    ORDER #{order._id.slice(-8).toUpperCase()}
                                </p>

                                <span>
                                    {formatDate(order.createdAt)}
                                </span>
                            </div>

                            <div className="profile-order-payment">
                                Payment:{" "}
                                <strong>
                                    {order.paymentMethod}
                                </strong>
                            </div>

                            <hr className="profile-order-divider" />

                            <div className="profile-order-items">
                                {order.items.slice(0, 3).map((item, index) => (
                                    <p key={item.itemId || index}>
                                        {item.name} × {item.quantity}
                                    </p>
                                ))}

                                {order.items.length > 3 && (
                                    <p className="profile-more-items">
                                        +{order.items.length - 3} more items
                                    </p>
                                )}
                            </div>

                            <div className="profile-order-total">
                                Total Amount:{" "}
                                <strong>
                                    ₹{order.totalAmount}
                                </strong>
                            </div>
                        </div>

                        <div
                            className={`profile-order-status ${order.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {order.status === "Delivered" && (
                                <i className="fa-solid fa-circle-check"></i>
                            )}

                            {order.status}
                        </div>

                        <div className="profile-order-actions">

                            {order.status === "Delivered" && (
                                <button
                                    className="profile-reorder-btn"
                                    onClick={() => navigate("/")}
                                >
                                    Reorder
                                </button>
                            )}

                            <button
                                className="profile-view-details-btn"
                                onClick={() =>
                                    navigate(`/orders/${order._id}`)
                                }
                            >
                                View Details
                            </button>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProfileOrders;