import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSettingsGear } from "react-icons/vsc";
import {
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiPieChart,
  FiHash,
  FiBarChart2,
  FiBriefcase,
  FiMail,
  FiSettings,
  FiShare2,
  FiTwitter as FiTwitterIcon,
  FiInstagram as FiInstagramIcon,
  FiYoutube as FiYoutubeIcon,
  FiHeadphones,
} from "react-icons/fi";
import CreatorLogo from "../assets/WhatsApp Image 2025-12-04 at 16.13.28_3db5bc93.jpg";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar fixed left-0 top-0 hidden h-screen w-[260px] overflow-y-auto border-r border-slate-200 bg-white scrollbar-hide lg:flex lg:flex-col px-5 py-6">
      <div className="mb-8 flex items-center justify-center">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center hover:opacity-80 transition"
        >
          <img
            src={CreatorLogo}
            alt="Creator Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu</p>
        <div className="flex flex-col gap-1">
          {/* Home */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/" || currentPath === "/dashboard"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <FiHome size={16} /> <span>Home</span>
          </button>

          {/* Engagement */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/engagement"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/engagement")}
          >
            <FiTrendingUp size={16} /> Engagement
          </button>

          {/* Followers Growth */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/followers-growth"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/followers-growth")}
          >
            <FiUsers size={16} /> Followers Growth
          </button>

          {/* Audience Demographics */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/audience-demographics"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/audience-demographics")}
          >
            <FiPieChart size={16} /> Audience Demographics
          </button>

          {/* Hashtag Analytics */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/hashtag-analytics"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/hashtag-analytics")}
          >
            <FiHash size={16} /> Hashtag Analytics
          </button>

          {/* Earnings Dashboard */}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/earnings"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/earnings")}
          >
            <FiBarChart2 size={16} /> Earnings Dashboard
          </button>

          {/* Sponsorship */}
          <button
            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/sponsorship"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/sponsorship")}
          >
            <span className="flex items-center gap-3"><FiBriefcase size={16} /> Sponsorship</span>
            <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-semibold text-white">5</span>
          </button>

          {/* Mails */}
          <button
            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/mails"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/mails")}
          >
            <span className="flex items-center gap-3"><FiMail size={16} /> Mails</span>
            <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-semibold text-white">55+</span>
          </button>

          {/* Collaboration */}
          <button
            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              currentPath === "/collaboration"
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => navigate("/collaboration")}
          >
            <span className="flex items-center gap-3"><FiShare2 size={16} /> Collaboration</span>
            <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-semibold text-white">8+</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Accounts</p>
        <div className="flex flex-col gap-1 text-slate-600">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors"><FiTwitterIcon size={16} /> Twitter</button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors"><FiInstagramIcon size={16} /> Instagram</button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors"><FiYoutubeIcon size={16} /> Youtube</button>
        </div>
      </div>

      <button className="mb-8 w-full rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] transition-shadow">
        + Add More
      </button>

      <div className="mt-auto flex flex-col gap-1 border-t border-slate-100 pt-6">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <FiHeadphones size={16} /> Support
        </button>
        <button
          onClick={() => navigate("/settings")}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            currentPath === "/settings"
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <FiSettings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
