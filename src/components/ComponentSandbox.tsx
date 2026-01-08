import { useState } from "react";
import { Card } from "./ui/@raw-shadcn/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator, Toaster, useToast } from "./ui";
import { ComprehensiveFormExample, FormDatePickerExample } from "./form";
import CheckboxExample from "./ui/Checkbox/CheckboxExample";
import { DatePickerExample } from "./ui/DatePicker/DatePickerExample";
import { DatePickerClearTest } from "./ui/DatePicker/DatePickerClearTest";
import { TableExample } from "./ui/Table/TableExample";
import { SheetExample } from "./ui/Sheet/SheetExample";
import { SelectExample } from "./ui/Select/SelectExample";
import { DropdownExample } from "./ui/Dropdown/DropdownExample";
import RadioButtonExample from "./ui/RadioButton/RadioButtonExample";
import { ToastExample } from "./ui/Toast/ToastExample";
import { InputExample } from "./ui/InputExample";
import { TextExample } from "./ui/TextExample";
import { PaginationExample } from "./ui/Pagination/PaginationExample";
import SwitchExample from "./ui/Switch/SwitchExample";
import TabsExample from "./ui/Tabs/TabsExample";
import { BreadcrumbsExample } from "./ui/Breadcrumbs/BreadcrumbsExample";
import { ModalExample } from "./ui/Modal/ModalExample";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/@raw-shadcn/avatar";
import { Label } from "./ui/@raw-shadcn/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/@raw-shadcn/textarea";
import { Switch } from "./ui/@raw-shadcn/switch";
import EmptyPage from "./ui/EmptyPage";
import { PageHeader } from "./ui/PageHeader";
import { MenuDropdown, IconMenuDropdown } from "./ui/Dropdown";
import { Edit, Trash2, Copy, Download, Settings } from "lucide-react";

type ComponentSection =
  | "overview"
  | "buttons"
  | "badges"
  | "breadcrumbs"
  | "cards"
  | "forms"
  | "inputs"
  | "checkboxes"
  | "radios"
  | "selects"
  | "switches"
  | "dropdowns"
  | "datepickers"
  | "tables"
  | "pagination"
  | "modals"
  | "sheets"
  | "tabs"
  | "toasts"
  | "other";

const ComponentSandbox = () => {
  const [activeSection, setActiveSection] =
    useState<ComponentSection>("overview");

  const sections: { id: ComponentSection; label: string; icon?: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "breadcrumbs", label: "Breadcrumbs" },
    { id: "cards", label: "Cards" },
    { id: "forms", label: "Forms" },
    { id: "inputs", label: "Inputs" },
    { id: "checkboxes", label: "Checkboxes" },
    { id: "radios", label: "Radio Buttons" },
    { id: "selects", label: "Selects" },
    { id: "switches", label: "Switches" },
    { id: "dropdowns", label: "Dropdowns" },
    { id: "datepickers", label: "Date Pickers" },
    { id: "tables", label: "Tables" },
    { id: "pagination", label: "Pagination" },
    { id: "modals", label: "Modals" },
    { id: "sheets", label: "Sheets" },
    { id: "tabs", label: "Tabs" },
    { id: "toasts", label: "Toasts" },
    { id: "other", label: "Other Components" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "buttons":
        return <ButtonsSection />;
      case "badges":
        return <BadgesSection />;
      case "breadcrumbs":
        return <BreadcrumbsSection />;
      case "cards":
        return <CardsSection />;
      case "forms":
        return <FormsSection />;
      case "inputs":
        return <InputsSection />;
      case "checkboxes":
        return <CheckboxesSection />;
      case "radios":
        return <RadiosSection />;
      case "selects":
        return <SelectsSection />;
      case "switches":
        return <SwitchesSection />;
      case "dropdowns":
        return <DropdownsSection />;
      case "datepickers":
        return <DatePickersSection />;
      case "tables":
        return <TablesSection />;
      case "pagination":
        return <PaginationSection />;
      case "modals":
        return <ModalsSection />;
      case "sheets":
        return <SheetsSection />;
      case "tabs":
        return <TabsSection />;
      case "toasts":
        return <ToastsSection />;
      case "other":
        return <OtherSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-card border-r border-border p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Component Sandbox
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Design System Showcase
            </p>
          </div>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

// Overview Section
const OverviewSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Design System Component Sandbox
        </h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive showcase of all available components in the design
          system. Navigate through the sidebar to explore different component
          categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="UI Components"
          description="Basic UI elements"
          content={
            <ul className="space-y-2 text-sm">
              <li>✓ Buttons</li>
              <li>✓ Badges</li>
              <li>✓ Breadcrumbs</li>
              <li>✓ Cards</li>
              <li>✓ Avatars</li>
              <li>✓ Separators</li>
            </ul>
          }
        />

        <Card
          title="Form Components"
          description="Input and form elements"
          content={
            <ul className="space-y-2 text-sm">
              <li>✓ Input Fields</li>
              <li>✓ Textareas</li>
              <li>✓ Checkboxes</li>
              <li>✓ Radio Buttons</li>
              <li>✓ Selects</li>
              <li>✓ Switches</li>
              <li>✓ Date Pickers</li>
            </ul>
          }
        />

        <Card
          title="Advanced Components"
          description="Complex UI patterns"
          content={
            <ul className="space-y-2 text-sm">
              <li>✓ Tables</li>
              <li>✓ Pagination</li>
              <li>✓ Modals</li>
              <li>✓ Sheets</li>
              <li>✓ Tabs</li>
              <li>✓ Dropdowns</li>
              <li>✓ Toast Notifications</li>
              <li>✓ Form Wrapper</li>
            </ul>
          }
        />
      </div>

      <Card
        title="Getting Started"
        description="How to use this sandbox"
        content={
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use the sidebar navigation to browse through different component
              categories. Each section contains live examples and usage
              demonstrations.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <code className="text-sm">
                {`import { Button } from '@/components/ui';
import { FormInput } from '@/components/form';`}
              </code>
            </div>
          </div>
        }
      />
    </div>
  );
};

// Buttons Section
const ButtonsSection = () => {
  const { success, error, info } = useToast();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Buttons</h2>
        <p className="text-muted-foreground">
          Various button styles and variants for different use cases.
        </p>
      </div>

      <Card
        title="Button Variants"
        description="Different button styles"
        content={
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => success("Success!", "Primary button clicked")}
            >
              Primary
            </Button>
            <Button
              variant="danger"
              onClick={() => error("Error!", "Danger button clicked")}
            >
              Danger
            </Button>
            <Button
              variant="success"
              onClick={() => success("Success!", "Success button clicked")}
            >
              Success
            </Button>
            <Button
              variant="info"
              onClick={() => info("Info", "Info button clicked")}
            >
              Info
            </Button>
            <Button variant="warning">Warning</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        }
      />

      <Card
        title="Button Sizes"
        description="Different button sizes"
        content={
          <div className="flex items-center gap-3 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        }
      />

      <Card
        title="Button States"
        description="Disabled and loading states"
        content={
          <div className="flex items-center gap-3 flex-wrap">
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        }
      />

      <Card
        title="Icon Buttons"
        description="Buttons with icons"
        content={
          <div className="flex items-center gap-3 flex-wrap">
            <Button size="icon" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="primary">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="danger">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        }
      />
    </div>
  );
};

// Badges Section
const BadgesSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Badges</h2>
        <p className="text-muted-foreground">
          Badge components for labels, status indicators, and tags.
        </p>
      </div>

      <Card
        title="Badge Variants"
        description="Different badge styles"
        content={
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        }
      />
    </div>
  );
};

// Breadcrumbs Section
const BreadcrumbsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Breadcrumbs</h2>
        <p className="text-muted-foreground">
          Breadcrumb navigation components for showing the current page
          location.
        </p>
      </div>

      <BreadcrumbsExample />
    </div>
  );
};

// Cards Section
const CardsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Cards</h2>
        <p className="text-muted-foreground">
          Card components for grouping content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Card Title"
          description="Card description goes here"
          content={
            <p className="text-sm text-muted-foreground">
              This is the card content area. You can put any content here.
            </p>
          }
        />

        <Card
          title="Another Card"
          description="With different content"
          content={
            <div className="space-y-2">
              <Badge variant="success">Active</Badge>
              <p className="text-sm text-muted-foreground">
                Cards can contain various types of content including badges,
                buttons, and more.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

// Forms Section
const FormsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Forms</h2>
        <p className="text-muted-foreground">
          Comprehensive form examples with validation using React Hook Form and
          Zod.
        </p>
      </div>

      <Card
        title="Comprehensive Form Example"
        description="A complete form with all form components and validation"
        content={<ComprehensiveFormExample />}
      />

      <Card
        title="FormDatePicker Examples"
        description="DatePicker integrated with React Hook Form - supports single, range, and multiple date selections"
        content={<FormDatePickerExample />}
      />
    </div>
  );
};

// Inputs Section
const InputsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Inputs</h2>
        <p className="text-muted-foreground">
          Input fields, textareas, and labels.
        </p>
      </div>

      <Card
        title="Input Examples"
        description="Various input field examples"
        content={<InputExample />}
      />

      <Card
        title="Basic Input Fields"
        description="Standard input components"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea">Message</Label>
              <Textarea
                id="textarea"
                placeholder="Enter your message"
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </div>
        }
      />
    </div>
  );
};

// Checkboxes Section
const CheckboxesSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Checkboxes</h2>
        <p className="text-muted-foreground">
          Checkbox components with various layouts and styles.
        </p>
      </div>

      <Card content={<CheckboxExample />} />
    </div>
  );
};

// Radios Section
const RadiosSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Radio Buttons
        </h2>
        <p className="text-muted-foreground">
          Radio button components with various layouts and styles.
        </p>
      </div>

      <Card content={<RadioButtonExample />} />
    </div>
  );
};

// Selects Section
const SelectsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Selects</h2>
        <p className="text-muted-foreground">
          Select dropdown components with search and multi-select capabilities.
        </p>
      </div>

      <Card content={<SelectExample />} />
    </div>
  );
};

// Switches Section
const SwitchesSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Switches</h2>
        <p className="text-muted-foreground">
          Toggle switch components for on/off states and settings.
        </p>
      </div>

      <Card content={<SwitchExample />} />
    </div>
  );
};

// Dropdowns Section
const DropdownsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dropdowns</h2>
        <p className="text-muted-foreground">
          Dropdown menu components for actions and navigation.
        </p>
      </div>

      <Card content={<DropdownExample />} />

      <Card
        title="Menu Dropdown Examples"
        description="Different dropdown menu styles"
        content={
          <div className="flex gap-3 flex-wrap">
            <MenuDropdown
              items={[
                {
                  label: "Edit",
                  onClick: () => {},
                  icon: <Edit className="h-4 w-4" />,
                },
                {
                  label: "Copy",
                  onClick: () => {},
                  icon: <Copy className="h-4 w-4" />,
                },
                { type: "separator" },
                {
                  label: "Delete",
                  onClick: () => {},
                  icon: <Trash2 className="h-4 w-4" />,
                  destructive: true,
                },
              ]}
              triggerText="Actions"
              variant="primary"
            />
            <IconMenuDropdown
              items={[
                {
                  label: "Edit",
                  onClick: () => {},
                  icon: <Edit className="h-4 w-4" />,
                },
                {
                  label: "Download",
                  onClick: () => {},
                  icon: <Download className="h-4 w-4" />,
                },
                { type: "separator" },
                {
                  label: "Delete",
                  onClick: () => {},
                  icon: <Trash2 className="h-4 w-4" />,
                  destructive: true,
                },
              ]}
            />
          </div>
        }
      />
    </div>
  );
};

// DatePickers Section
const DatePickersSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Date Pickers
        </h2>
        <p className="text-muted-foreground">
          Date picker components for single dates, date ranges, and multiple
          dates.
        </p>
      </div>

      <Card
        title="Clear Button Test"
        description="Test the clear button functionality - click X to clear"
        content={<DatePickerClearTest />}
      />

      <Card content={<DatePickerExample />} />
    </div>
  );
};

// Tables Section
const TablesSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Tables</h2>
        <p className="text-muted-foreground">
          Advanced table components with sorting, selection, and custom
          rendering.
        </p>
      </div>

      <Card content={<TableExample />} />
    </div>
  );
};

// Sheets Section
const SheetsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Sheets</h2>
        <p className="text-muted-foreground">
          Sheet components (side panels) that slide in from different
          directions.
        </p>
      </div>

      <Card content={<SheetExample />} />
    </div>
  );
};

// Tabs Section
const TabsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Tabs</h2>
        <p className="text-muted-foreground">
          Tab components for organizing content into separate views.
        </p>
      </div>

      <Card content={<TabsExample />} />
    </div>
  );
};

// Toasts Section
const ToastsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Toast Notifications
        </h2>
        <p className="text-muted-foreground">
          Toast notification components for user feedback.
        </p>
      </div>

      <Card content={<ToastExample />} />
    </div>
  );
};

// Pagination Section
const PaginationSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Pagination</h2>
        <p className="text-muted-foreground">
          Pagination components for navigating through multiple pages of
          content.
        </p>
      </div>

      <Card content={<PaginationExample />} />
    </div>
  );
};

// Modals Section
const ModalsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Modals</h2>
        <p className="text-muted-foreground">
          Modal components for overlaying content and user interactions.
        </p>
      </div>

      <ModalExample />
    </div>
  );
};

// Other Section
const OtherSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Other Components
        </h2>
        <p className="text-muted-foreground">
          Additional utility components and patterns.
        </p>
      </div>

      <Card
        title="Avatars"
        description="Avatar components for user profiles"
        content={
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        }
      />

      <Card
        title="Separator"
        description="Visual separator component"
        content={
          <div>
            <p className="text-sm">Content above</p>
            <Separator className="my-4" />
            <p className="text-sm">Content below</p>
          </div>
        }
      />

      <Card
        title="Page Header"
        description="Page header component"
        content={
          <PageHeader
            title="Page Title"
            description="This is a page description"
            action={<Button>Action</Button>}
          />
        }
      />

      <Card
        title="Empty Page"
        description="Empty state component"
        content={
          <EmptyPage
            title="No items found"
            description="There are no items to display at this time."
          />
        }
      />

      <Card
        title="Text Examples"
        description="Typography components"
        content={<TextExample />}
      />
    </div>
  );
};

export default ComponentSandbox;
