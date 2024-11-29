import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', orderDate: '2024-11-20', totalAmount: 150, status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', orderDate: '2024-11-21', totalAmount: 220, status: 'Shipped' },
    { id: 3, customerName: 'Mark Wilson', orderDate: '2024-11-22', totalAmount: 99, status: 'Delivered' },
  ]);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    orderDate: '',
    totalAmount: '',
    status: 'Pending',
  });

  const [editingOrder, setEditingOrder] = useState(null); // Store order being edited

  // Handle adding a new order
  const handleAddOrder = () => {
    if (!newOrder.customerName || !newOrder.orderDate || !newOrder.totalAmount) {
      alert('Please fill all fields');
      return;
    }

    const newItem = {
      id: orders.length + 1,
      customerName: newOrder.customerName,
      orderDate: newOrder.orderDate,
      totalAmount: parseFloat(newOrder.totalAmount),
      status: newOrder.status,
    };

    setOrders([...orders, newItem]);
    setNewOrder({ customerName: '', orderDate: '', totalAmount: '', status: 'Pending' });
  };

  // Handle deleting an order
  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Handle editing an order
  const handleEditOrder = (order) => {
    setEditingOrder(order); // Set the order being edited
  };

  // Handle saving the edited order
  const handleSaveEdit = () => {
    setOrders(
      orders.map((order) =>
        order.id === editingOrder.id ? editingOrder : order
      )
    );
    setEditingOrder(null); // Close the modal
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Orders Page</h2>

      {/* Form to Add New Order */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Add New Order</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={newOrder.customerName}
            onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
          />
          <input
            type="date"
            placeholder="Order Date"
            className="w-full p-2 border border-gray-300 rounded"
            value={newOrder.orderDate}
            onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Amount"
            className="w-full p-2 border border-gray-300 rounded"
            value={newOrder.totalAmount}
            onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
          />
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            type="button"
            onClick={handleAddOrder}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Add Order
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Orders List</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Order ID</th>
              <th className="py-2 px-4 border border-gray-300">Customer Name</th>
              <th className="py-2 px-4 border border-gray-300">Order Date</th>
              <th className="py-2 px-4 border border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border border-gray-300">{order.id}</td>
                <td className="py-2 px-4 border border-gray-300">{order.customerName}</td>
                <td className="py-2 px-4 border border-gray-300">{order.orderDate}</td>
                <td className="py-2 px-4 border border-gray-300">${order.totalAmount}</td>
                <td className="py-2 px-4 border border-gray-300">{order.status}</td>
                <td className="py-2 px-4 border border-gray-300 flex space-x-2">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
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

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md space-y-4">
            <h3 className="text-xl font-semibold">Edit Order</h3>
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={editingOrder.customerName}
              onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
            />
            <input
              type="date"
              placeholder="Order Date"
              className="w-full p-2 border border-gray-300 rounded"
              value={editingOrder.orderDate}
              onChange={(e) => setEditingOrder({ ...editingOrder, orderDate: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total Amount"
              className="w-full p-2 border border-gray-300 rounded"
              value={editingOrder.totalAmount}
              onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={editingOrder.status}
              onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="bg-red-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
