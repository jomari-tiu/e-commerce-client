import { Breadcrumbs, BreadcrumbItemType } from "./Breadcrumbs";
import { Slash } from "lucide-react";
import { Card } from "@/components/ui/@raw-shadcn/card";

export const BreadcrumbsExample: React.FC = () => {
  const basicItems: BreadcrumbItemType[] = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Electronics", href: "/products/electronics" },
    { title: "Laptops" },
  ];

  const clickableItems: BreadcrumbItemType[] = [
    { title: "Dashboard", onClick: () => alert("Dashboard clicked") },
    { title: "Settings", onClick: () => alert("Settings clicked") },
    { title: "Profile", onClick: () => alert("Profile clicked") },
    { title: "Account Details" },
  ];

  const longBreadcrumb: BreadcrumbItemType[] = [
    { title: "Home", href: "/" },
    { title: "Category", href: "/category" },
    { title: "Subcategory", href: "/category/subcategory" },
    { title: "Products", href: "/category/subcategory/products" },
    {
      title: "Electronics",
      href: "/category/subcategory/products/electronics",
    },
    {
      title: "Computers",
      href: "/category/subcategory/products/electronics/computers",
    },
    {
      title: "Laptops",
      href: "/category/subcategory/products/electronics/computers/laptops",
    },
    { title: "Gaming Laptops" },
  ];

  const iconBreadcrumb: BreadcrumbItemType[] = [
    { title: "Home", href: "/" },
    { title: "Admin", href: "/admin" },
    { title: "User Management" },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Breadcrumbs Component</h1>
        <p className="text-muted-foreground mb-6">
          A flexible breadcrumb navigation component with support for links,
          click handlers, and collapsible long paths.
        </p>
      </div>

      {/* Basic Breadcrumbs */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Breadcrumbs</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Simple breadcrumb with links and a current page
        </p>
        <Breadcrumbs items={basicItems} />
      </Card>

      {/* With Click Handlers */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">With Click Handlers</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Breadcrumbs with onClick handlers instead of href
        </p>
        <Breadcrumbs items={clickableItems} />
      </Card>

      {/* Collapsed Breadcrumbs */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Collapsed Breadcrumbs</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Long breadcrumb path with maxItems set to 4 (shows first + last 3 with
          ellipsis)
        </p>
        <Breadcrumbs items={longBreadcrumb} maxItems={4} />
      </Card>

      {/* Full Long Breadcrumbs */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Full Long Breadcrumbs</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Same long path without collapsing (no maxItems)
        </p>
        <Breadcrumbs items={longBreadcrumb} />
      </Card>

      {/* Custom Separator */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Custom Separator</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Breadcrumbs with a custom slash separator
        </p>
        <Breadcrumbs
          items={basicItems}
          separator={<Slash className="h-4 w-4" />}
        />
      </Card>

      {/* With Custom Class */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">With Custom Styling</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Breadcrumbs with custom className for additional styling
        </p>
        <Breadcrumbs items={iconBreadcrumb} className="text-lg" />
      </Card>

      {/* Usage Examples */}
      <Card className="p-6 bg-muted/50">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Basic Usage:</h3>
            <pre className="bg-background p-4 rounded-lg overflow-x-auto">
              <code>{`const items = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Current Page' }
];

<Breadcrumbs items={items} />`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">With Click Handlers:</h3>
            <pre className="bg-background p-4 rounded-lg overflow-x-auto">
              <code>{`const items = [
  { title: 'Home', onClick: () => navigate('/') },
  { title: 'Settings', onClick: () => navigate('/settings') },
  { title: 'Profile' }
];

<Breadcrumbs items={items} />`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Collapsed (Long Paths):</h3>
            <pre className="bg-background p-4 rounded-lg overflow-x-auto">
              <code>{`<Breadcrumbs 
  items={longPathItems} 
  maxItems={4} 
/>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Custom Separator:</h3>
            <pre className="bg-background p-4 rounded-lg overflow-x-auto">
              <code>{`import { Slash } from 'lucide-react';

<Breadcrumbs 
  items={items} 
  separator={<Slash className="h-4 w-4" />}
/>`}</code>
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
};
