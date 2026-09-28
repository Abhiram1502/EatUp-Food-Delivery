import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Orders.css";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/orders/vendor-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            const sortedOrders = data.sort((a, b) => {
                if (a.status === "Delivered" && b.status !== "Delivered") return 1;
                if (a.status !== "Delivered" && b.status === "Delivered") return -1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });


            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setOrders(sortedOrders);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch orders.");
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
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const updateStatus = async (orderId, status) => {
        try {
            setUpdatingId(orderId);
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? { ...order, status: data.order.status }
                        : order
                )
            );

            toast.success(`Order marked as ${status}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update order status.");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="vendor-orders-page">
                <h1>Orders</h1>
                <p className="loading-text">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="vendor-orders-page">
            <div className="vendor-orders-header">
                <div>
                    <h1>Orders</h1>
                    <p>Manage your restaurant orders</p>
                </div>
                <div className="orders-count">
                    <i className="fa-solid fa-receipt"></i>
                    <span>Total Orders: {orders.length}</span>
                    <span>Pending: {orders.filter(order => order.status !== "Delivered" && order.status !== "Cancelled").length}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <i className="fa-solid fa-bowl-food"></i>
                    <h2>No Orders Yet</h2>
                    <p>New customer orders will appear here.</p>
                </div>
            ) : (
                <div className="vendor-orders-list">
                    {orders.map((order) => (
                        <div className="vendor-order-card" key={order._id}>
                            <div className="vendor-order-top">
                                <div className="vendor-order-info">
                                    <div className="vendor-order-icon">
                                        <i className="fa-solid fa-receipt"></i>
                                    </div>
                                    <div>
                                        <h2>Order #{order._id.slice(-8).toUpperCase()}</h2>
                                        <p>{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                <div className={`vendor-status ${order.status.toLowerCase().replace(/\s/g, "-")}`}>
                                    {order.status === "Delivered" && (
                                        <i className="fa-solid fa-circle-check"></i>
                                    )}
                                    {order.status === "Cancelled" && (
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    )}
                                    {order.status}
                                </div>
                            </div>

                            <hr />

                            <div className="vendor-order-content">
                                <div className="customer-section">
                                    <h3>
                                        <i className="fa-solid fa-user"></i>
                                        Customer
                                    </h3>
                                    <p>{order.customerName}</p>
                                </div>

                                <div className="items-section">
                                    <h3>
                                        <i className="fa-solid fa-utensils"></i>
                                        Items
                                    </h3>
                                    <div className="items-list">
                                        {order.items.map((item, index) => (
                                            <div className="vendor-item" key={item.itemId || index}>
                                                <span>{item.name}</span>
                                                <span>× {item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="delivery-section">
                                    <h3>
                                        <i className="fa-solid fa-location-dot"></i>
                                        Deliver To
                                    </h3>
                                    <p>{order.deliveryAddress?.label}</p>
                                    <p>{order.deliveryAddress?.street}</p>
                                    <p>
                                        {order.deliveryAddress?.city},{" "}
                                        {order.deliveryAddress?.state}
                                    </p>
                                    <p>{order.deliveryAddress?.pincode}</p>
                                </div>
                            </div>

                            <div className="vendor-order-bottom">
                                <div className="payment-info">
                                    <span>Payment</span>
                                    <strong>{order.paymentMethod}</strong>
                                </div>
                                <div className="total-info">
                                    <span>Total</span>
                                    <strong>₹{order.totalAmount}</strong>
                                </div>
                            </div>

                            {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                <div className="vendor-order-actions">
                                    {order.status === "Pending" && (
                                        <button onClick={() => updateStatus(order._id, "Accepted")} disabled={updatingId === order._id}>
                                            <i className="fa-solid fa-check"></i>
                                            Accept Order
                                        </button>
                                    )}

                                    {order.status === "Accepted" && (
                                        <button onClick={() => updateStatus(order._id, "Preparing")} disabled={updatingId === order._id}>
                                            <i className="fa-solid fa-kitchen-set"></i>
                                            Start Preparing
                                        </button>
                                    )}

                                    {order.status === "Preparing" && (
                                        <button onClick={() => updateStatus(order._id, "Ready")} disabled={updatingId === order._id}>
                                            <i className="fa-solid fa-box"></i>
                                            Mark Ready
                                        </button>
                                    )}

                                    {order.status === "Ready" && (
                                        <button onClick={() => updateStatus(order._id, "Picked Up")} disabled={updatingId === order._id}>
                                            <i className="fa-solid fa-motorcycle"></i>
                                            Pick Up Order
                                        </button>
                                    )}

                                    {order.status === "Picked Up" && (
                                        <button onClick={() => updateStatus(order._id, "Delivered")} disabled={updatingId === order._id}>
                                            <i className="fa-solid fa-house-circle-check"></i>
                                            Mark Delivered
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;