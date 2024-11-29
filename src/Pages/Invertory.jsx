import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Invertory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Product 1', quantity: 10, price: 25 },
    { id: 2, name: 'Product 2', quantity: 5, price: 50 },
    { id: 3, name: 'Product 3', quantity: 20, price: 30 },
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
  });

  // Function to handle adding new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      alert('Please fill all fields');
      return;
    }

    const newItem = {
      id: inventory.length + 1,
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
    };

    setInventory([...inventory, newItem]);
    setNewProduct({ name: '', quantity: '', price: '' });
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Function to handle updating a product
  const handleUpdateProduct = (id) => {
    const updatedInventory = inventory.map((item) =>
      item.id === id
        ? {
            ...item,
            name: prompt('Enter new product name:', item.name) || item.name,
            quantity: parseInt(prompt('Enter new quantity:', item.quantity)) || item.quantity,
            price: parseFloat(prompt('Enter new price:', item.price)) || item.price,
          }
        : item
    );
    setInventory(updatedInventory);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Inventory Page</h2>

      {/* Form to Add Product */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Add New Product</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full p-2 border border-gray-300 rounded"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Inventory List</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Product Name</th>
              <th className="py-2 px-4 border border-gray-300">Quantity</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">{item.quantity}</td>
                <td className="py-2 px-4 border border-gray-300">${item.price}</td>
                <td className="py-2 px-4 border border-gray-300 flex space-x-2">
                  <button
                    onClick={() => handleUpdateProduct(item.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invertory;
