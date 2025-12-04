import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-[260px] h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
