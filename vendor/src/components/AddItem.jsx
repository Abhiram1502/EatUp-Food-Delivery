import { useState } from "react";
//import "../styles/AddItem.css";

function AddItem() {
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Name and Price are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/menu/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          restaurantId: vendor.restaurantId,
          restaurantName: vendor.name
        })
      });

      const data = await res.json();

      alert("Item added successfully ✅");

      // reset form
      setForm({
        name: "",
        price: "",
        image: "",
        description: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error adding item ❌");
    }

    setLoading(false);
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>

      <input
        name="name"
        placeholder="Item Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      {/* Preview */}
      {form.image && (
        <img src={form.image} alt="preview" className="preview" />
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add Item"}
      </button>
    </div>
  );
}

export default AddItem;