import React, { useState } from 'react';
import { Sheet } from '../@raw-shadcn/Sheet/Sheet';
import { Button } from '../button';

export const UpdatedSheetExample: React.FC = () => {
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  const handleSaveUser = () => {
    console.log('Saving user:', userFormData);
    // Here you would typically call an API
    alert('User saved successfully!');
  };

  const handleCloseUser = () => {
    console.log('User form closed');
    setUserFormData({ name: '', email: '', department: '' });
  };

  const handleSettingsSave = () => {
    console.log('Settings saved');
    alert('Settings saved!');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Updated Sheet Examples</h2>

      {/* Basic form sheet with title and description */}
      <Sheet
        trigger={<Button>Create User</Button>}
        title="Create New User"
        description="Fill in the user information below"
        side="right"
        size="lg"
        onSave={handleSaveUser}
        onClose={handleCloseUser}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter full name"
              value={userFormData.name}
              onChange={e =>
                setUserFormData(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email address"
              value={userFormData.email}
              onChange={e =>
                setUserFormData(prev => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={userFormData.department}
              onChange={e =>
                setUserFormData(prev => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
            >
              <option value="">Select department</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>
      </Sheet>

      {/* Settings sheet with custom button text */}
      <Sheet
        trigger={<Button variant="outline">Settings</Button>}
        title="Application Settings"
        description="Configure your application preferences"
        side="right"
        size="md"
        onSave={handleSettingsSave}
        saveText="Apply Changes"
        closeText="Cancel"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Dark Mode</label>
            <input type="checkbox" className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Email Notifications</label>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Save</label>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
        </div>
      </Sheet>

      {/* View-only sheet without footer */}
      <Sheet
        trigger={<Button variant="success">View Details</Button>}
        title="User Profile"
        description="Read-only user information"
        side="right"
        size="md"
        showFooter={false}
      >
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Name:</span>
            <p className="text-base">John Doe</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">Email:</span>
            <p className="text-base">john.doe@example.com</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">
              Department:
            </span>
            <p className="text-base">Engineering</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">
              Join Date:
            </span>
            <p className="text-base">January 15, 2024</p>
          </div>
        </div>
      </Sheet>

      {/* Bottom sheet example */}
      <Sheet
        trigger={<Button variant="info">Quick Actions</Button>}
        title="Quick Actions"
        description="Choose an action to perform"
        side="bottom"
        size="sm"
        onSave={() => console.log('Action confirmed')}
        saveText="Confirm"
      >
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 text-left border rounded hover:bg-gray-50">
            <div className="font-medium">Export Data</div>
            <div className="text-sm text-gray-600">Download CSV file</div>
          </button>

          <button className="p-3 text-left border rounded hover:bg-gray-50">
            <div className="font-medium">Import Data</div>
            <div className="text-sm text-gray-600">Upload CSV file</div>
          </button>

          <button className="p-3 text-left border rounded hover:bg-gray-50">
            <div className="font-medium">Generate Report</div>
            <div className="text-sm text-gray-600">Create summary</div>
          </button>

          <button className="p-3 text-left border rounded hover:bg-gray-50">
            <div className="font-medium">Backup Data</div>
            <div className="text-sm text-gray-600">Create backup</div>
          </button>
        </div>
      </Sheet>

      {/* Left navigation sheet */}
      <Sheet
        trigger={<Button variant="ghost">Navigation</Button>}
        title="Site Navigation"
        side="left"
        size="sm"
        showFooter={false}
      >
        <nav className="space-y-2">
          <a
            href="#"
            className="block p-3 rounded hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium">Dashboard</div>
            <div className="text-sm text-gray-600">Overview and stats</div>
          </a>

          <a
            href="#"
            className="block p-3 rounded hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium">Users</div>
            <div className="text-sm text-gray-600">Manage user accounts</div>
          </a>

          <a
            href="#"
            className="block p-3 rounded hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium">Reports</div>
            <div className="text-sm text-gray-600">View analytics</div>
          </a>

          <a
            href="#"
            className="block p-3 rounded hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium">Settings</div>
            <div className="text-sm text-gray-600">App configuration</div>
          </a>
        </nav>
      </Sheet>
    </div>
  );
};
