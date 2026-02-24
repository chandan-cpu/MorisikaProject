import { LayoutDashboard, LogOut, Menu, Package, ShoppingCart, Tags } from 'lucide-react';
import React, { use } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { useLocation, useNavigate } from 'react-router-dom';
 const menu=[
    {icon:LayoutDashboard,label:'Dashboard',path:'/admin'},
    {icon:Package,label:'Products',path:'/products'},
    {icon:Tags,label:'Categories',path:'/categories'},
    {icon:ShoppingCart,label:'Orders',path:'/orders'},
    {icon:LogOut,label:'Logout',path:'/logout'},
  ]

const SideMenu = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const navigate=useNavigate();
  const {pathname}=useLocation();

  return (
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 fixed h-full`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className={`font-bold text-blue-600 ${!sidebarOpen && 'hidden'}`}>GiftShop Admin</h1>
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menu.map((item, index) => (
            <button key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left hover:bg-gray-100 ${pathname === item.path ? 'bg-gray-200' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

  )
};

export default SideMenu;