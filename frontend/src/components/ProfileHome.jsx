import { useState } from "react";
import { toast } from "react-toastify";

function ProfileHome({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

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
                toast.error(data.message);
                return;
            }

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsEditing(false);

            toast.success("Profile Updated Successfully");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="profile-section">
            <div className="profile-section-header">
                <h2>Personal Information</h2>

                <button onClick={handleEditSave}>
                    {isEditing ? (
                        <>
                            <i className="fa-regular fa-floppy-disk"></i> Save
                        </>
                    ) : (
                        <>
                            <i className="fa-regular fa-pen-to-square"></i> Edit Profile
                        </>
                    )}
                </button>
            </div>

            <hr />

            <div className="profile-form">
                <div className="profile-field">
                    <label>Name</label>
                    <input
                        name="name"
                        value={user?.name || ""}
                        disabled={!isEditing}
                        onChange={handleChange}
                        type="text"
                    />
                </div>

                <div className="profile-field">
                    <label>Email</label>
                    <input
                        name="email"
                        value={user?.email || ""}
                        disabled={!isEditing}
                        onChange={handleChange}
                        type="email"
                    />
                </div>

                <div className="profile-field">
                    <label>Phone Number</label>
                    <input
                        name="phone"
                        value={user?.phone || ""}
                        disabled={!isEditing}
                        onChange={handleChange}
                        type="tel"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfileHome;