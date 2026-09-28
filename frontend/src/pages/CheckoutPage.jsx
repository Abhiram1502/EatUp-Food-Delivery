import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";
import { toast } from "react-toastify";
function CheckoutPage() {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [restaurant, setRestaurant] = useState(null);
    const [addresses, setAddresses] = useState(user?.addresses || []);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [instructions, setInstructions] = useState("");

    const [newAddress, setNewAddress] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    });

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const [deliveryFee, setDeliveryFee] = useState(0);
    const total = subtotal + deliveryFee;

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/");
            return;
        }

        const fetchRestaurant = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/restaurants/${cart[0].restaurantId}`);
                const data = await res.json();

                if (res.ok) {
                    setRestaurant(data);
                    setDeliveryFee(Number(data.deliveryFee));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRestaurant();
    }, [cart, navigate]);

    const handleAddressChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleAddAddress = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/add-address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user._id,
                    address: newAddress
                })
            });

            const data = await res.json();

            if (res.ok) {
                setAddresses(data.addresses);
                localStorage.setItem("user", JSON.stringify(data));

                const last = data.addresses[data.addresses.length - 1];
                setSelectedAddress(last._id);
                setShowForm(false);

                setNewAddress({
                    label: "",
                    street: "",
                    city: "",
                    state: "",
                    pincode: ""
                });
            } else {
                toast.info(data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleContinue = () => {
        if (!selectedAddress) {
            toast.info("Please select a delivery address.");
            return;
        }

        if (!restaurant) {
            toast.info("Restaurant details are loading...");
            return;
        }

        navigate("/payment", {
            state: {
                address: addresses.find(a => a._id === selectedAddress),
                subtotal,
                deliveryFee,
                total,
                instructions,
                restaurant
            }
        });
    };
    return (
        <>
            <Navbar />
            <div className="checkout-page">
                <div className="payment-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h1>Checkout</h1>
                </div>

                <div className="checkout-content">
                    <div className="address-block">
                        <h2>Select Address</h2>

                        <div className="addresses-grid">
                            {addresses.length === 0 ? (
                                <p>No addresses found. Add one below.</p>
                            ) : (
                                addresses.map((addr) => (
                                    <div
                                        key={addr._id}
                                        className={`address-card ${selectedAddress === addr._id ? "selected" : ""}`}
                                        onClick={() => setSelectedAddress(addr._id)}
                                    >
                                        <h4>{addr.label}</h4>
                                        <p>{addr.street}</p>
                                        <p>{addr.city}, {addr.state}</p>
                                        <p>{addr.pincode}</p>
                                    </div>
                                ))
                            )}

                            <div className="addAddress" onClick={() => setShowForm(true)}>
                                <i className="fa-solid fa-plus"></i>
                                <p>Add New Address</p>
                            </div>
                        </div>

                        <div className="instruction-box">
                            <h3>Special Instructions</h3>
                            <textarea
                                placeholder="Add cooking or delivery instructions (e.g. Less spicy, No onions, Ring the bell once...)"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                maxLength={250}
                            />
                            <small>{instructions.length}/250</small>
                        </div>

                        {showForm && (
                            <div className="address-form">
                                <input
                                    name="label"
                                    placeholder="Home / Work"
                                    value={newAddress.label}
                                    onChange={handleAddressChange}
                                />

                                <input
                                    name="street"
                                    placeholder="Street"
                                    value={newAddress.street}
                                    onChange={handleAddressChange}
                                />

                                <input
                                    name="city"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={handleAddressChange}
                                />

                                <input
                                    name="state"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={handleAddressChange}
                                />

                                <input
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={newAddress.pincode}
                                    onChange={handleAddressChange}
                                />

                                <div>
                                    <button onClick={handleAddAddress}>
                                        Save Address
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        {cart.map((item) => (
                            <div
                                key={`${item._id}-${item.restaurantId}`}
                                className="summary-item"
                            >
                                <p>{item.name} × {item.quantity}</p>
                                <p>{item.restaurantName}</p>
                                <p>₹{item.price * item.quantity}</p>
                            </div>
                        ))}

                        <div className="checkout-total">
                            <p>
                                <b>Subtotal:</b> ₹{subtotal}
                            </p>

                            <p>
                                <b>Delivery Fee:</b>{" "}
                                {restaurant ? `₹${deliveryFee}` : "Loading..."}
                            </p>

                            <h3>
                                Total: ₹{total}
                            </h3>
                        </div>

                        <button
                            className="place-order-btn"
                            onClick={handleContinue}
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CheckoutPage;