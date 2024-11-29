import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ClipboardList, 
  FileText, 
  Menu, 
  X 
} from 'lucide-react';
import logo from '../assets/khadim-backer.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar visibility

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <Home className="w-5 h-5" />, 
      path: '/' 
    },
    { 
      name: 'Inventory', 
      icon: <Package className="w-5 h-5" />, 
      path: '/inventory' 
    },
    { 
      name: 'Orders', 
      icon: <ClipboardList className="w-5 h-5" />, 
      path: '/orders' 
    },
    { 
      name: 'Billing', 
      icon: <FileText className="w-5 h-5" />, 
      path: '/billing' 
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-${isOpen ? '64' : '20'} h-full bg-bakery-background shadow-md transition-all duration-300`}>
      
      {/* Sidebar Header */}
      <div className="p-5 border-b bg-bakery-background text-black flex justify-between items-center">
        <img src={logo} alt="Logo" className={`w-[130px] transition-all ${isOpen ? 'block' : 'hidden'}`} />
        
        {/* Hamburger Button for Mobile */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden text-black"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="flex items-center p-3 hover:bg-bakery-secondary hover:text-white rounded-lg transition-colors mb-2"
          >
            {item.icon}
            <span className={`ml-3 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
