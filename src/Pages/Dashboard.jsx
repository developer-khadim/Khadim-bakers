import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { 
  ShoppingCartIcon, 
  PackageIcon, 
  BarChartIcon, 
  FileTextIcon 
} from "lucide-react";

const Dashboard = () => {
  const [salesData, setSalesData] = useState({
    dailySales: [
      { name: "Mon", sales: 4000 },
      { name: "Tue", sales: 3000 },
      { name: "Wed", sales: 5000 },
      { name: "Thu", sales: 4500 },
      { name: "Fri", sales: 6000 },
      { name: "Sat", sales: 7000 },
      { name: "Sun", sales: 5500 },
    ],
    productBreakdown: [
      { name: "Bread", value: 400 },
      { name: "Cakes", value: 300 },
      { name: "Pastries", value: 200 },
      { name: "Cookies", value: 150 },
    ],
  });

  const [inventory, setInventory] = useState([
    { item: "Flour", quantity: 50, unit: "kg", status: "Good" },
    { item: "Sugar", quantity: 30, unit: "kg", status: "Low" },
    { item: "Eggs", quantity: 100, unit: "pcs", status: "Good" },
    { item: "Butter", quantity: 20, unit: "kg", status: "Critical" },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { id: "001", Name: "Cake", customer: "Khadim Ali", total: 1520, status: "Completed" },
    { id: "002", Name: "Cookies", customer: "Abdul Ali", total: 2000, status: "Pending" },
    { id: "003", Name: "Cake", customer: "Hamad Ahmed", total: 750, status: "Processing" },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const QuickLink = [
    {
      Name: "Create New Order",
      path: "/CreateNewOrder",
      icon: <ShoppingCartIcon className="w-6 h-6 mb-2" />
    },
    {
      Name: "Add Product",
      path: "./AddProduct",
      icon: <PackageIcon className="w-6 h-6 mb-2" />
    },
    {
      Name: "Update Inventory",
      path: "./UpdateInventory",
      icon: <BarChartIcon className="w-6 h-6 mb-2" />
    },
    {
      Name: "Generate Report",
      path: "./GenerateReport",
      icon: <FileTextIcon className="w-6 h-6 mb-2" />
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Khadim Bakers Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Sales Overview */}
          <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2 lg:col-span-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Daily Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Breakdown */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Product Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData.productBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesData.productBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Inventory Status */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Inventory Status</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[300px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-right">Quantity</th>
                    <th className="p-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.item}</td>
                      <td className="p-2 text-right">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-2 text-right">
                        <span
                          className={`
                            px-2 py-1 rounded text-xs
                            ${
                              item.status === "Good"
                                ? "bg-green-200 text-green-800"
                                : item.status === "Low"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                            }
                          `}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Order ID</th>
                    {/* <th className="p-2 text-left">Product Name</th> */}
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-right">Total</th>
                    <th className="p-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{order.id}</td>
                      {/* <td className="p-2">{order.Name}</td> */}
                      <td className="p-2">{order.customer}</td>
                      <td className="p-2 text-right">PKR {order.total}</td>
                      <td className="p-2 text-right">
                        <span
                          className={`
                            px-2 py-1 rounded text-xs
                            ${
                              order.status === "Completed"
                                ? "bg-green-200 text-green-800"
                                : order.status === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-blue-200 text-blue-800"
                            }
                          `}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {QuickLink.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`
                    flex flex-col items-center justify-center 
                    text-white p-4 rounded-lg shadow-md 
                    transition transform hover:scale-105 
                    hover:shadow-lg text-center text-sm
                  `}
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                >
                  {action.icon}
                  {action.Name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;