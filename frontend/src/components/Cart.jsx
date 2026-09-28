import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css"
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate=useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryfee = 50;
  const total = subtotal > 0 ? subtotal + deliveryfee : subtotal;
  return (
    <>
      <Navbar />
      <div className="cart-section">
        <h1>Your Cart</h1>
        {cart.length == 0 ? (
          <div className="empty">
            <img src={assets.empty_cart}></img>
            <p>Looks like you haven’t added anything yet</p>
            <p>Start exploring and add your favorite dishes</p>
            <button className="explore" onClick={() => navigate("/")}>
              Explore Restaurants
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-item head"><p>Item</p><p>Restaurant Name</p><p>Price</p><p>Quantity</p><p>Total</p></div>
              {cart.map((item) => {
                return <div className="cart-item" key={`${item.id}-${item.restaurantId}`}>
                  <p>{item.name}</p>
                  <p>{item.restaurantName}</p>
                  <p>{item.price}</p>
                  <p><button onClick={() => removeFromCart(item.id, item.restaurantId)}>-</button><span>{item.quantity}</span><button onClick={() => addToCart(item, { id: item.restaurantId, name: item.restaurantName })}>+</button></p><p>{item.price * item.quantity}</p>
                </div>
              })}
              <button className="clearCart" onClick={clearCart}>Clear Cart</button>
            </div>
            <div className="checkout">
              <div className="promo">
                <h3>Promo Code</h3>
                <div>
                  <input type="text" placeholder="Enter Your Code..." />
                  <button>Submit</button>
                </div>
              </div>
              <div className="totals">
                <h3>Cart Totals</h3>
                <div className="row">
                  <p>Subtotals</p>
                  <p>{subtotal}</p>
                </div>
                <div className="row">
                  <p>Delivery Fee</p>
                  <p>{deliveryfee}</p>
                </div>
                <div className="row total">
                  <p>Total</p>
                  <p>{total}</p>
                </div>
                <button onClick={()=>navigate("/check-out")}>Proceed To CheckOut</button>
              </div>
            </div>
          </>

        )}
      </div>
      <Footer />
    </>
  )
};
export default Cart; 