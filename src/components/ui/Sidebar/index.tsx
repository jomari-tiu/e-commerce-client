import { NavLink } from "react-router";
import { Text } from "../Text";
import { cn } from "@/lib/utils";
import { adminRoutesConfig } from "@/routes/adminRoutes";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gray-100 p-4">
      <header className="mb-4">
        <Text>E-Commerce Dashboard</Text>
      </header>
      <nav className="flex flex-col gap-2">
        {adminRoutesConfig.map((item) => (
          <NavLink to={item?.path || ""} key={item.label}>
            {({ isActive }) => (
              <div
                key={item.path}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md transition-all duration-200 ease-in-out",
                  isActive && "bg-primary/10",
                  !isActive && " hover:bg-primary/10"
                )}
              >
                <item.Icon />
                <Text className={cn(isActive && "text-primary")}>
                  {item.label}
                </Text>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
