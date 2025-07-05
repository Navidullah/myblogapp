// app/dashboard/layout.jsx

import Sidebar from "../components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen py-[138px]">
      <ToastContainer position="top-right" autoClose={4000} />
      <Sidebar />
      <main className="flex-1 p-6 bg-background">{children}</main>
    </div>
  );
}
