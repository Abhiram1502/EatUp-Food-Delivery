import { useState } from "react";
import { toast } from "react-toastify";

function ProfileAddress({ user, setUser }) {
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

    const handleAddressChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

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
                        address: newAddress
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            setShowForm(false);

            setNewAddress({
                label: "",
                street: "",
                city: "",
                state: "",
                pincode: "",
                isDefault: false
            });

            toast.success("Added Address Successfully");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
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

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Deleted Address Successfully");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
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

                        <button onClick={() => deleteAddress(addr._id)}>
                            Delete
                        </button>
                    </div>
                ))}

                <div
                    className="addAddress"
                    onClick={() => setShowForm(true)}
                >
                    <i className="fa-solid fa-plus"></i>
                    <p>Add New Address</p>
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

                            <label
                                htmlFor="isDefault"
                                style={{ fontSize: "13px" }}
                            >
                                Set as Default Address
                            </label>
                        </div>

                        <button onClick={handleAddAddress}>
                            Save Address
                        </button>

                        <button onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileAddress;