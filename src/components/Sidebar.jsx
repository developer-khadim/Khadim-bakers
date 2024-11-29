import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ClipboardList, FileText, Menu, X } from 'lucide-react';
import logo from '../assets/khadim-backer.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Get current location for active link

  // Handle responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Collapse sidebar on smaller screens
      } else {
        setIsOpen(true); // Expand sidebar on larger screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Orders', icon: ClipboardList, path: '/orders' },
    { name: 'Billing', icon: FileText, path: '/billing' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` h-full bg-white shadow-lg transition-all duration-300 ease-in-out 
      ${isOpen ? 'w-64' : 'w-20'} z-50`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-10 w-auto"
          />
        )}
        
        {/* Hamburger Button for Mobile */}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors duration-200 
              ${location.pathname === item.path 
                ? 'bg-bakery-secondary text-white' 
                : 'hover:bg-gray-100 text-gray-700'}  hover:bg-bakery-secondary hover:text-white `}
          >
            <item.icon className="mr-3" size={20} />
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;