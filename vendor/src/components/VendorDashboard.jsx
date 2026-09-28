import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import Home from "./Home";
import MenuList from "./MenuList";
import "../styles/Vendor.css";
import { toast } from "react-toastify";

function VendorDashboard() {
    const navigate = useNavigate();
    const vendor = JSON.parse(localStorage.getItem("user"));

    const [active, setActive] = useState("home");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        toast.info("Logged Out Successfully!");
    };

    return (
        <div className="vendor-container">
            <div className="vendor-logo">
                <h2>EatUp</h2>
                <p className="sub-head">Restaurant Partner</p>

                <div className="userName">
                    <i className="fa-solid fa-circle-user"></i>
                    <p>{vendor?.name}</p>
                </div>
            </div>

            <div className="vendor-content">
                <div className="vendor-sidebar">
                    <div
                        className={active === "home" ? "active" : ""}
                        onClick={() => setActive("home")}
                    >
                        <i className="fa-solid fa-home"></i> Home
                    </div>

                    <div
                        className={active === "orders" ? "active" : ""}
                        onClick={() => setActive("orders")}
                    >
                        <i className="fa-solid fa-bag-shopping"></i> Orders
                    </div>

                    <div
                        className={active === "menu" ? "active" : ""}
                        onClick={() => setActive("menu")}
                    >
                        <i className="fa-solid fa-bell-concierge"></i> Menu List
                    </div>

                    <div onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </div>
                </div>

                <div className="vendor-details">
                    {active === "home" && (<Home/>)}
                    {active === "orders" && <Orders />}
                    {active === "menu" && <MenuList />}
                </div>
            </div>
        </div>
    );
}

export default VendorDashboard;