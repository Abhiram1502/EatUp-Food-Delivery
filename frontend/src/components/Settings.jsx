import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Settings() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast("Logged Out");
        navigate("/");
    };

    return (
        <div className="settings-section">
            <h2>Settings</h2>
            <hr />
            <div className="setting-item">
                <div>
                    <h3>Account</h3>
                    <p>Manage your profile information.</p>
                </div>
                <button onClick={() => navigate("/profile")}>Profile</button>
            </div>
            <div className="setting-item">
                <div>
                    <h3>Saved Addresses</h3>
                    <p>Manage your delivery addresses.</p>
                </div>
                <button onClick={() => navigate("/profile/address")}>Manage</button>
            </div>
            <div className="setting-item">
                <div>
                    <h3>Logout</h3>
                    <p>Sign out from your account.</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Settings;