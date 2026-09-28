import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast}from 'react-toastify'
function VendorLogin() {
  const navigate = useNavigate();
  const [disabled,setDisabled]=useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleLogin = async () => {
    try {
      setDisabled(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          role: "restaurantOwner"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.info(data.message);
        setDisabled(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login Successful!")
      navigate("/dashboard");

    } catch (err) {
      toast.error(err);
      toast.warning("Unable to login.");
      setDisabled(false);
    }
  };

  return (
    <div className="vendor-login">
      <div className="vendor-logo">
        <h2>EatUp</h2>
        <p>Restaurant Partner</p>
      </div>

      <div className="vendor-form">
        <h2>Vendor Login</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button id="login-btn" disabled={disabled} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default VendorLogin;