import { NavLink } from "react-router-dom";
import { Home, Clock, Settings } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/history", icon: Clock, label: "History" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="w-64 glass-panel rounded-2xl flex flex-col py-6 px-4 shrink-0">
      <div className="flex items-center gap-3 px-2 mb-10 text-xl font-semibold">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center">
          <span className="text-white text-sm">👁️</span>
        </div>
        Eye Boy
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-white/20 text-white shadow-sm border border-white/10"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )
            }
          >
            <link.icon size={20} />
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
