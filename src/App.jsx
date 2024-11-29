import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './Pages/Dashboard'
import CreateNewOrder from './components/CreateNewOrder'
import AddProduct from './components/AddProduct'
import UpdateInventory from './components/UpdateInventory'
import GenerateReport from './components/GenerateReport'
import Inventory from './Pages/Invertory'
import Orders from './Pages/Orders'
import Billing from './Pages/Billing'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/CreateNewOrder" Component={ CreateNewOrder}/>
            <Route path="/AddProduct" Component={AddProduct} />
            <Route  path='/UpdateInventory' Component={UpdateInventory}  />
            <Route path='/GenerateReport' Component={GenerateReport}/>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App