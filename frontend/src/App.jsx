import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantPage from "./pages/RestaurantPage";
import { ToastContainer } from 'react-toastify'
import Cart from "./components/Cart";
import Profile from "./pages/Profile"
import CheckoutPage from "./pages/CheckoutPage";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import ProfileInfo from "./components/ProfileHome";
import Address from "./components/ProfileAddress";
import ProfileOrders from "./components/ProfileOrders";
import WishList from "./components/ProfileWishList";
import Settings from "./components/Settings";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/profile" element={<Profile />} />
          {/*<Route index element={<ProfileInfo />} />
          <Route path="address" element={<Address />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="settings" element={<Settings />} />
        </Route>*/}
        <Route path="/check-out" element={<CheckoutPage />}></Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;