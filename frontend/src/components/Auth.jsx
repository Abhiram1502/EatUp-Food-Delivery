import { useState } from "react";
import "../styles/Auth.css";
import { toast } from "react-toastify";
function Auth({ isLogIn, setIsLogIn, setIsLoggedIn, role }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    console.log(form);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSignup = async () => {

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: role
            }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message);
            setIsLogIn(true); // Go to login page
            toast("Login to Enjoy Tasty Food");
        } else {
            toast.error(data.message);
        }
    };
    const handleLogin = async () => {

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                role: role
            }),
        });

        const data = await res.json();

        if (res.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setIsLoggedIn(true);
            setIsLogIn(null);
            toast(`Welcome Back ${data.user.name}`);
            toast.success("Login Successful!");
        } else {
            toast.error(data.message);
        }
    };
    return (
        isLogIn ? (
            <div className="login-page">
                <div className="login-section">
                    <p className="exit" onClick={() => setIsLogIn(null)}>x</p>
                    <h1>Login</h1>
                    <input name="email" type="email" placeholder="Enter Email" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Enter password" onChange={handleChange} />
                    <button onClick={handleLogin}>Login</button>
                    <hr />
                    <div className="other-btn">
                        <button><i class="fa-brands fa-google"></i> Continue With Google</button>
                        <button><i class="fa-solid fa-phone"></i> Continue With Phone</button>
                    </div>
                    <p className="link">Don't have a account&nbsp; <span onClick={() => setIsLogIn(false)}>create one</span></p>
                </div>
            </div>
        ) :
            (
                <div className="signup-page">
                    <div className="signup-section">
                        <p className="exit" onClick={() => setIsLogIn(null)}>x</p>
                        <h1>Sign Up</h1>
                        <input name="name" type="text" placeholder="Enter Name" onChange={handleChange} />
                        <input name="email" type="email" placeholder="Enter Email" onChange={handleChange} />
                        <input name="password" type="password" placeholder="Enter Password" onChange={handleChange} />
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
                        <button onClick={handleSignup}>Sign Up</button>
                        <hr />
                        <div className="other-btn">
                            <button><i class="fa-brands fa-google"></i> Continue With Google</button>
                            <button><i class="fa-solid fa-phone"></i> Continue With Phone</button>
                        </div>
                        <p className="link">Already have an account Log In &nbsp;<span onClick={() => setIsLogIn(true)}>here</span></p>
                    </div>
                </div>

            )
    );
}
export default Auth;