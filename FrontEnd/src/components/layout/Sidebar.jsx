import {
  LayoutDashboard,
  PlugZap,
  BarChart3,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/user-dashboard",
    },
    {
      title: "My APIs",
      icon: PlugZap,
      path: "/my-apis",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-[#111113]">

      {/* Logo */}

      <div className="border-b border-white/10 p-6">

        <h1 className="text-xl font-bold text-white">
          API Gateway
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Analytics Platform
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.title}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{menu.title}</span>

            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;
