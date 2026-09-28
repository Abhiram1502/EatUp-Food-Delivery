import { useEffect, useState } from "react";
import "../styles/MenuList.css"
import { toast } from "react-toastify";
const MenuList = () => {

  const [menuItems, setMenuItems] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  useEffect(() => {
    fetchMenu();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    isVeg: true
  });
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);

    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      isVeg: item.isVeg
    });

    setImage(null);
    setAddForm(true);
  };

  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const fetchMenu = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/menu/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Response:", data);
      console.log("Is Array:", Array.isArray(data));

      if (Array.isArray(data)) {
        setMenuItems(data);
      } else {
        setMenuItems([]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const categories = [
    "Biryani",
    "Rice & Meals",
    "South Indian",
    "North Indian",
    "Chinese",
    "Pizza",
    "Burger",
    "Rolls & Wraps",
    "Momos",
    "Noodles",
    "Pasta",
    "Fried Chicken",
    "Seafood",
    "BBQ & Grill",
    "Street Food",
    "Snacks",
    "Salads",
    "Healthy Food",
    "Desserts",
    "Ice Cream",
    "Bakery",
    "Tea & Coffee",
    "Juices & Shakes",
    "Beverages"
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("isVeg", formData.isVeg);

      if (image) {
        data.append("image", image);
      }

      const res = await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const result = await res.json();

      toast.info(result.message);

      if (res.ok) {

        setAddForm(false);

        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          isVeg: true
        });

        setImage(null);

        fetchMenu();
      }

    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("isVeg", formData.isVeg);

      if (image) {
        data.append("image", image);
      }

      const res = await fetch(
        `http://localhost:5000/api/menu/${editItem._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data
        }
      );

      const result = await res.json();

      toast.info(result.message);

      if (res.ok) {

        setEditItem(null);
        setAddForm(false);

        fetchMenu();
      }

    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this menu item?");

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      toast.info(data.message);

      if (res.ok) {
        fetchMenu();
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const toggleAvailability = async (id) => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/menu/${id}/availability`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchMenu();
        toast.info(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="menu-list">
      <div className="menu-header">
        <h2>Menu Items</h2>
        <button className="addbtn"
          onClick={() => {
            setEditItem(null);
            setFormData({
              name: "",
              description: "",
              category: "",
              price: "",
              isVeg: true
            });
            setImage(null);
            setAddForm(true);
          }}
        >+ Add Item</button>
        {
          AddForm && (
            <div className="add-form">
              <div className="add-menu-form">
                <h2 style={{ textAlign: "center", margin: "8px" }}>Add Menu Item</h2>
                <form onSubmit={editItem ? handleUpdate : handleSubmit}>
                  <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
                  <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <div className="food-type">
                    <label><input type="radio" checked={formData.isVeg === true} onChange={() =>
                      setFormData({
                        ...formData,
                        isVeg: true
                      })
                    } />Veg</label>
                    <label>
                      <input
                        type="radio"
                        checked={formData.isVeg === false}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            isVeg: false
                          })
                        }
                      />
                      Non Veg
                    </label>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="buttons">
                    <button style={{ backgroundColor: "orange" }} type="submit">
                      {editItem ? "Update Item" : "Add Item"}
                    </button>
                    <button style={{ backgroundColor: "red" }} type="button"
                      onClick={() => {
                        setAddForm(false);
                        setEditItem(null);
                        setFormData({
                          name: "",
                          description: "",
                          category: "",
                          price: "",
                          isVeg: true
                        });
                        setImage(null);
                      }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </div>
      <div className="menu-items">
        {
          menuItems.length === 0 ? (
            <p>No Menu Items Found</p>
          ) : (
            menuItems.map((item) => (
              <div className="menu-card" key={item._id}>
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/menu/${item.image}`
                      : "https://placehold.co/150x150"
                  }
                  alt={item.name}
                />
                <div className="menu-info">
                  <h3>{item.name}</h3>
                  <p className="des">{item.description}</p>
                  <p className="menucat"><strong>Category:</strong> {item.category}</p>
                  <p className="menuPrice">₹{item.price}</p>
                  <p className="foodtype">{item.isVeg ? "Veg" : "Non Veg"}</p>
                  <div className="availability-toggle">
                    <span className="tag">{item.isAvailable ? "Available" : "Unavailable"}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.isAvailable}
                        onChange={() => toggleAvailability(item._id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="menubtns"><button className="editbtn" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="deletebtn" onClick={() => handleDelete(item._id)}>Delete</button></div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default MenuList;