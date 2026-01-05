import { Sheet } from '../@raw-shadcn/Sheet/Sheet';
import { Button } from '../button';

export const SheetExample = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Simple Sheet Examples</h2>

      {/* Basic usage */}
      <Sheet trigger={<Button>Open Basic Sheet</Button>} side="right" size="md">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sheet Content</h3>
          <p>This is the content of the sheet. You can put anything here!</p>
          <Button>Action Button</Button>
        </div>
      </Sheet>

      {/* With form content */}
      <Sheet
        trigger={<Button variant="outline">Open Form Sheet</Button>}
        side="right"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">User Profile</h3>
            <p className="text-sm text-gray-600">
              Update your profile information
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button>Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </Sheet>

      {/* Bottom sheet */}
      <Sheet
        trigger={<Button variant="success">Open Bottom Sheet</Button>}
        side="bottom"
        size="md"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bottom Sheet</h3>
          <p>This sheet opens from the bottom of the screen.</p>
          <div className="flex gap-2">
            <Button size="sm">Option 1</Button>
            <Button size="sm" variant="outline">
              Option 2
            </Button>
          </div>
        </div>
      </Sheet>

      {/* Left sheet */}
      <Sheet
        trigger={<Button variant="info">Open Left Sheet</Button>}
        side="left"
        size="sm"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-100">
              Dashboard
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-100">
              Settings
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-100">
              Profile
            </a>
          </nav>
        </div>
      </Sheet>
    </div>
  );
};
