import { useState } from 'react';
import { Tabs, TabItem } from './Tabs';
import {
  User,
  Settings,
  Bell,
  Lock,
  CreditCard,
  FileText,
  Home,
  ShoppingCart,
  BarChart,
} from 'lucide-react';

const TabsExample = () => {
  const [controlledValue, setControlledValue] = useState('tab1');
  const [accountTab, setAccountTab] = useState('profile');

  // Basic tabs
  const basicTabs: TabItem[] = [
    {
      value: 'tab1',
      label: 'Tab 1',
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
          <p className="text-gray-600">
            This is the content for the first tab. You can put any React
            component or JSX here.
          </p>
        </div>
      ),
    },
    {
      value: 'tab2',
      label: 'Tab 2',
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
          <p className="text-gray-600">This is the content for the second tab.</p>
        </div>
      ),
    },
    {
      value: 'tab3',
      label: 'Tab 3',
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
          <p className="text-gray-600">This is the content for the third tab.</p>
        </div>
      ),
    },
  ];

  // Tabs with icons
  const iconTabs: TabItem[] = [
    {
      value: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Home Dashboard</h3>
          <p className="text-gray-600">Welcome to your dashboard overview.</p>
        </div>
      ),
    },
    {
      value: 'orders',
      label: 'Orders',
      icon: <ShoppingCart className="w-4 h-4" />,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
          <p className="text-gray-600">View and manage your orders here.</p>
        </div>
      ),
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: <BarChart className="w-4 h-4" />,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600">View your performance metrics.</p>
        </div>
      ),
    },
  ];

  // Account settings tabs
  const accountTabs: TabItem[] = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Profile Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      ),
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Push notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">SMS notifications</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>
      ),
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <CreditCard className="w-4 h-4" />,
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Billing Information</h3>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pro Plan</p>
                  <p className="text-sm text-gray-600">$29/month</p>
                </div>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  Change Plan
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium mb-2">Payment Method</p>
              <p className="text-sm text-gray-600">•••• •••• •••• 4242</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Controlled tabs
  const controlledTabs: TabItem[] = [
    {
      value: 'tab1',
      label: 'First',
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p>Content for the first tab (controlled)</p>
          <p className="text-sm text-gray-600 mt-2">
            Current value: {controlledValue}
          </p>
        </div>
      ),
    },
    {
      value: 'tab2',
      label: 'Second',
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p>Content for the second tab (controlled)</p>
          <p className="text-sm text-gray-600 mt-2">
            Current value: {controlledValue}
          </p>
        </div>
      ),
    },
    {
      value: 'tab3',
      label: 'Third',
      disabled: true,
      content: (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p>This tab is disabled</p>
        </div>
      ),
    },
  ];

  // Vertical tabs
  const verticalTabs: TabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="p-4 border border-gray-200 rounded-lg h-full">
          <h3 className="text-lg font-semibold mb-2">General Settings</h3>
          <p className="text-gray-600">Configure your general preferences.</p>
        </div>
      ),
    },
    {
      value: 'documents',
      label: 'Documents',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="p-4 border border-gray-200 rounded-lg h-full">
          <h3 className="text-lg font-semibold mb-2">Documents</h3>
          <p className="text-gray-600">Manage your documents and files.</p>
        </div>
      ),
    },
    {
      value: 'privacy',
      label: 'Privacy',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="p-4 border border-gray-200 rounded-lg h-full">
          <h3 className="text-lg font-semibold mb-2">Privacy</h3>
          <p className="text-gray-600">Control your privacy settings.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tabs Examples</h1>

      {/* Basic Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Tabs</h2>
        <Tabs items={basicTabs} />
      </div>

      {/* Tabs with Icons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tabs with Icons</h2>
        <Tabs items={iconTabs} />
      </div>

      {/* Controlled Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Controlled Tabs</h2>
        <div className="mb-2">
          <p className="text-sm text-gray-600">Current tab: {controlledValue}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setControlledValue('tab1')}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Go to First
            </button>
            <button
              onClick={() => setControlledValue('tab2')}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Go to Second
            </button>
          </div>
        </div>
        <Tabs
          items={controlledTabs}
          value={controlledValue}
          onValueChange={setControlledValue}
        />
      </div>

      {/* Different Sizes */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Different Sizes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">Small</h3>
            <Tabs items={basicTabs} size="sm" />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">Default</h3>
            <Tabs items={basicTabs} size="default" />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">Large</h3>
            <Tabs items={basicTabs} size="lg" />
          </div>
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Tabs</h2>
        <div className="flex gap-4">
          <Tabs items={verticalTabs} orientation="vertical" />
        </div>
      </div>

      {/* Complex Example: Account Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Complex Example: Account Settings</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <Tabs
            items={accountTabs}
            value={accountTab}
            onValueChange={setAccountTab}
          />
        </div>
      </div>
    </div>
  );
};

export default TabsExample;

