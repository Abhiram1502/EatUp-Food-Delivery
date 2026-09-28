import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
function Profile() {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("user"));
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning ☀️";
        if (hour < 18) return "Good Afternoon 🌤️";
        return "Good Evening 🌙";
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        profileImage: "",
        addresses: []
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const [active, setActive] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const handleEditSave = async () => {

        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/auth/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if (!res.ok) {
                toast(data.message);
                return;
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsEditing(false);
            toast.success("Profile Updated Successfully");
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };
    console.log(localStorage.getItem("user"))
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetch("http://localhost:5000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                    return;
                }

                return res.json();
            })
            .then((data) => {
                if (data) {
                    setUser(data.user);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const addresses = user?.addresses || [];

    const [newAddress, setNewAddress] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false
    });
    const [showForm, setShowForm] = useState(false);
    const handleAddAddress = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                "http://localhost:5000/api/auth/add-address",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        address: {
                            label: newAddress.label,
                            street: newAddress.street,
                            city: newAddress.city,
                            state: newAddress.state,
                            pincode: newAddress.pincode,
                            isDefault: newAddress.isDefault
                        }
                    })
                }
            );
            const data = await res.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            setShowForm(false);
            toast.success("Added Address Successfully");
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };
    const deleteAddress = async (addressId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                "http://localhost:5000/api/auth/delete-address",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        addressId
                    })
                }
            );
            const data = await res.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Deleted Address Successfully");
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                "http://localhost:5000/api/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        toast("Logged Out");
    };
    const [orders, setOrders] = useState([]);
    const handleAddressChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };
    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-banner">
                    <img src={assets.user_icon} alt="user" />
                    <div className="greet">
                        <h1>{getGreeting()} </h1>
                        <h2 className="username">{username?.name.toUpperCase()}</h2>
                        <h2>Craving Something Delicious Today?</h2>
                    </div>
                    <button className="explore" onClick={() => navigate("/")}>Explore</button>
                    <div className="profile-right">
                        <p><span>{orders.length}</span> Orders | <span>{username?.addresses?.length ?? 0}</span> Saved Addresses | <span>0</span> WishList Items</p>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="left-section">
                        <div className={`prof-nav ${active === "profile" ? "profile-active" : ""}`} onClick={() => setActive("profile")} >Profile</div>
                        <div className={`prof-nav ${active === "address" ? "profile-active" : ""}`} onClick={() => setActive("address")}>Address</div>
                        <div className={`prof-nav ${active === "orders" ? "profile-active" : ""}`} onClick={() => setActive("orders")}>Orders</div>
                        <div className={`prof-nav ${active === "wishlist" ? "profile-active" : ""}`} onClick={() => setActive("wishlist")}>WishList</div>
                        <div className={`prof-nav ${active === "settings" ? "profile-active" : ""}`} onClick={() => setActive("settings")}>Settings</div>
                    </div>
                    <div className="right-section">
                        {active === "profile" && (
                            <div className="profile-section">
                                <button onClick={handleEditSave}>{isEditing ? (<><i className="fa-regular fa-floppy-disk"></i> Save</>) : (<><i className="fa-regular fa-pen-to-square"></i> Edit Profile</>)}</button>
                                <h2>Personal Information</h2>
                                <hr />
                                <label>Name</label><br />
                                <input name="name" value={user.name || ""} disabled={!isEditing} onChange={handleChange} type="text" /><br />
                                <label>Email</label><br />
                                <input name="email" value={user.email || ""} disabled={!isEditing} onChange={handleChange} type="email" /><br />
                                <label>Phone Number</label><br />
                                <input name="phone" value={user.phone || ""} disabled={!isEditing} onChange={handleChange} type="number" /><br />
                            </div>
                        )}
                        {active === "address" && (
                            <div className="address-section">
                                <h2>Your Addresses</h2>
                                <hr />
                                <div className="user-addresses">
                                    {addresses.map((addr) => (
                                        <div key={addr._id} className="address-card">
                                            <h4>{addr.label}</h4>
                                            <p>{addr.street}</p>
                                            <p>{addr.city}, {addr.state}</p>
                                            <p>{addr.pincode}</p>
                                            {addr.isDefault && (
                                                <span className="default-badge">
                                                    Default
                                                </span>
                                            )}
                                            <button onClick={() => deleteAddress(addr._id)}>Delete</button>
                                        </div>
                                    ))}
                                    <div className="addAddress" onClick={() => setShowForm(true)}>
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Add New Address</p>
                                    </div>
                                    {showForm && (
                                        <div className="address-form">
                                            <input name="label" placeholder="Home / Work" onChange={handleAddressChange} />
                                            <input name="street" placeholder="Street" onChange={handleAddressChange} />
                                            <input name="city" placeholder="City" onChange={handleAddressChange} />
                                            <input name="state" placeholder="State" onChange={handleAddressChange} />
                                            <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} />
                                            <div className="default-address">
                                                <input
                                                    type="checkbox"
                                                    id="isDefault"
                                                    checked={newAddress.isDefault}
                                                    onChange={(e) =>
                                                        setNewAddress({
                                                            ...newAddress,
                                                            isDefault: e.target.checked
                                                        })
                                                    }
                                                />
                                                <label htmlFor="isDefault" style={{ fontSize: "13px" }}>
                                                    Set as Default Address
                                                </label>
                                            </div>
                                            <button onClick={handleAddAddress}>Save Address</button>
                                            <button onClick={() => setShowForm(false)}>Cancel</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {active === "orders" && (
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
                                        <div className="profile-order-card" key={order._id}>

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
                                                    Payment: <strong>{order.paymentMethod}</strong>
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
                                                    Total Amount:
                                                    <strong>₹{order.totalAmount}</strong>
                                                </div>

                                            </div>

                                            <div className={`profile-order-status ${order.status.toLowerCase().replace(" ", "-")}`}>
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
                                                    onClick={() => navigate(`/orders/${order._id}`)}
                                                >
                                                    View Details
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {active === "wishlist" && (
                            <div className="wishlist-section">
                                <h2>Wish List</h2>
                                <hr />
                            </div>
                        )}
                        {active === "settings" && (
                            <div className="settings-section">
                                <h2>Settings</h2>
                                <hr />
                                <button onClick={handleLogout} className="logout">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Profile;