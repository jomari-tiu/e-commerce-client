import { useMemo } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { IconMenuDropdown } from "./Dropdown";
import { Text } from "./Text";
import { useLocation } from "react-router";

export default function Header() {
  const { pathname } = useLocation();

  const breadcrumbItems = useMemo(() => {
    const removedAdmin = pathname.replace("/admin/", "");
    return removedAdmin.split("/").map((path) => {
      const title = (path.charAt(0).toUpperCase() + path.slice(1)).replace(
        /-/g,
        " "
      );
      const href = `/admin/${path}`;
      return {
        title,
        href,
      };
    });
  }, [pathname]);

  return (
    <header className="w-full bg-white flex items-center justify-between p-4">
      <Breadcrumbs items={breadcrumbItems} maxItems={4} />
      <div className="flex gap-2 items-center">
        <div className="flex flex-col ">
          <Text>Jomari Tiu</Text>
          <Text size="sm" color="muted">
            Administrator
          </Text>
        </div>
        <IconMenuDropdown
          items={[
            {
              label: "Logout",
              onClick: () => {
                console.log("Logout");
              },
            },
          ]}
        />
      </div>
    </header>
  );
}
