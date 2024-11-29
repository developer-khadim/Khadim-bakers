import React, { useState } from 'react';

const BillingPage = () => {
  // Cart items with name, quantity, and price
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', quantity: 2, price: 50 },
    { id: 2, name: 'Item 2', quantity: 1, price: 120 },
    { id: 3, name: 'Item 3', quantity: 3, price: 30 },
  ]);

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  // Calculate total, tax, and final total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Handle form input change for customer details
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle printing the bill
  const handleGenerateAndPrintBill = () => {
    const { subtotal, tax, total } = calculateTotal();

    // Create a bill content to be printed
    const billContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center;">Khadim Backers Invoice</h1>
        <h3>Customer Details:</h3>
        <p>Name: ${customerDetails.name}</p>
        <p>Address: ${customerDetails.address}</p>
        <p>Phone: ${customerDetails.phone}</p>

        <h3>Cart Items:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f1f1f1;">
              <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems
              .map(
                (item) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${item.price}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${item.quantity * item.price}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>

        <h3>Summary:</h3>
        <div>
          <p>Subtotal: $${subtotal}</p>
          <p>Tax (10%): $${tax}</p>
          <p><strong>Total: $${total}</strong></p>
        </div>
      </div>
    `;

    // Open a new window and inject the bill content for printing
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Billing Page</h2>

      {/* Customer Details Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={customerDetails.name}
            onChange={handleCustomerInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Customer Address"
            className="w-full p-2 border border-gray-300 rounded"
            value={customerDetails.address}
            onChange={handleCustomerInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Customer Phone"
            className="w-full p-2 border border-gray-300 rounded"
            value={customerDetails.phone}
            onChange={handleCustomerInputChange}
          />
        </div>
      </div>

      {/* Cart Items Table */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Item</th>
              <th className="py-2 px-4 border border-gray-300">Quantity</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
              <th className="py-2 px-4 border border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">{item.quantity}</td>
                <td className="py-2 px-4 border border-gray-300">${item.price}</td>
                <td className="py-2 px-4 border border-gray-300">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${calculateTotal().subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${calculateTotal().tax}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${calculateTotal().total}</span>
          </div>
        </div>
      </div>

      {/* Generate Bill Button */}
      <button
        onClick={handleGenerateAndPrintBill}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Generate & Print Bill
      </button>
    </div>
  );
};

export default BillingPage;
