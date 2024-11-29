import React, { useState } from "react";

const CreateNewOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState({ name: "", contact: "", address: "" });
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [newProduct, setNewProduct] = useState(""); // State for new product name
  const [newQuantity, setNewQuantity] = useState(1); // State for new product quantity
  const [newPrice, setNewPrice] = useState(""); // State for new product price
  const [orders, setOrders] = useState([]); // Temporary array to hold orders

  const handleAddProduct = () => {
    if (product) {
      setOrderItems([
        ...orderItems,
        { productName: product, quantity, price: 100 }, // Replace with actual product price
      ]);
      setProduct("");
      setQuantity(1);
    }
  };

  const handleQuickAddProduct = () => {
    if (!newProduct || !newPrice || !newQuantity) {
      alert("Please fill in all fields.");
      return;
    }

    // Add the new product to the order items list
    setOrderItems([
      ...orderItems,
      { productName: newProduct, quantity: newQuantity, price: parseFloat(newPrice) },
    ]);

    // Clear the input fields
    setNewProduct("");
    setNewQuantity(1);
    setNewPrice("");
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSaveOrder = () => {
    if (!customer.name || !customer.contact || !customer.address) {
      alert("Please fill in all customer details.");
      return;
    }

    const newOrder = {
      customer,
      items: orderItems,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    setOrders([...orders, newOrder]);

    // Optionally, clear the form after saving the order
    setOrderItems([]);
    setCustomer({ name: "", contact: "", address: "" });
    setProduct("");
    setQuantity(1);

    alert("Order saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-bakery-primary mb-4">Create New Order</h1>

      {/* Customer Information */}
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Contact Information"
          value={customer.contact}
          onChange={(e) => setCustomer({ ...customer, contact: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          placeholder="Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Add Product Quick Action */}
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newQuantity}
          min="1"
          onChange={(e) => setNewQuantity(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          min="0"
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleQuickAddProduct}
          className="bg-bakery-primary text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Product</th>
              <th className="border-b p-2">Quantity</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{item.productName}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">PKR{item.price}</td>
                <td className="p-2">PKR{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <h3 className="text-lg font-bold">
            Total: PKR {calculateTotal()}
          </h3>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
        <button
          onClick={handleSaveOrder}
          className="bg-bakery-primary text-white px-4 py-2 rounded"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default CreateNewOrder;
