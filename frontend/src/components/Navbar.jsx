import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import Auth  from "./Auth";
import { toast } from "react-toastify";
function Navbar() {
    const location = useLocation();
    const [isLogIn,setIsLogIn]=useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(()=>{
        return localStorage.getItem("user")?true:false
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const [showPopUp, setPopUp] = useState(false);
    const [alert, setAlert] = useState(null);
    return (
        <nav>
            {alert&&(<Alert message="Login Successful" type="success" />)}
            <h4 className="logo">EatUp</h4>

            <div className="location-details">
                <div>
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="main">Location</span>
                    <i style={{cursor:"pointer"}} className="fa-solid fa-angle-down" onClick={() => setPopUp((prev)=>!prev)}></i>
                </div>
                <span className="sub">Location, City</span>
            </div>
            {showPopUp && (
                <div className="location-popup">
                    <button className="detect" onClick={() => setPopUp(false)}><i class="fa-solid fa-location-crosshairs"></i> Detect Location</button>
                    <hr />
                    <div className="setManually">
                        <input type="text" placeholder="Enter Location Manually..." />
                        <button className="set" onClick={() => setPopUp(false)}>Set Location</button>
                    </div>
                </div>
            )}
            <div className="search">
                <i className="fa fa-search"></i>
                <input type="text" placeholder="Search..." />
            </div>

            <div className="nav-links">
                {/* HOME */}
                <NavLink to="/" className="nav-item">
                    <i className="fa-solid fa-house"></i>
                    {location.pathname === "/" && <span>Home</span>}
                </NavLink>
                {/*Orders*/}
                <NavLink to="/orders" className="nav-item">
                    <i className="fa-solid fa-receipt"></i>
                    {location.pathname === "/orders" && <span>Orders</span>}
                </NavLink>
                {/* CART */}
                <NavLink to="/cart" className="nav-item">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {location.pathname === "/cart" && <span>Cart</span>}
                </NavLink>

                {/* PROFILE */}
                {isLoggedIn ? (
                    <NavLink to="/profile" className="nav-item">
                        <i className="fa-solid fa-circle-user"></i>
                        {location.pathname === "/profile" && <span>{user?.name.toUpperCase()}</span>}
                    </NavLink>
                ) : (<div>
                    <button id="loginButton" onClick={() =>setIsLogIn(true)}>Login</button><button id="signUpButton" onClick={() =>setIsLogIn(false)}>SignUp</button></div>)}
                    {isLogIn!==null&&<Auth isLogIn={isLogIn} setIsLogIn={setIsLogIn} role="customer" setIsLoggedIn={setIsLoggedIn}/>}
            </div>

        </nav>
    );
}

export default Navbar;