import React from 'react';
import SideMenu from './layouts/SideMenu';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const { sidebarOpen } = useSidebar();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideMenu />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-0 w-full`}>
        <Outlet />
      </main>
    </div>
  );
};

const AdminProductsLayout = () => (
  <SidebarProvider>
    <AdminLayout />
  </SidebarProvider>
);

export default AdminProductsLayout;