import React, { useState } from 'react';
import { Edit, Trash2, Copy, Download, Settings } from 'lucide-react';
import { MenuDropdown, MenuDropdownItem } from './MenuDropdown';
import { IconMenuDropdown } from './IconMenuDropdown';

export const DropdownExample: React.FC = () => {
  const [actionResult, setActionResult] = useState<string>('');

  // Menu dropdown items (action menus)
  const menuItems: MenuDropdownItem[] = [
    {
      label: 'Edit',
      onClick: () => setActionResult('Edit clicked!'),
      icon: <Edit className="h-4 w-4" />,
    },
    {
      label: 'Copy',
      onClick: () => setActionResult('Copy clicked!'),
      icon: <Copy className="h-4 w-4" />,
    },
    {
      label: 'Download',
      onClick: () => setActionResult('Download clicked!'),
      icon: <Download className="h-4 w-4" />,
    },
    { type: 'separator' },
    {
      label: 'Settings',
      onClick: () => setActionResult('Settings clicked!'),
      icon: <Settings className="h-4 w-4" />,
    },
    { type: 'separator' },
    {
      label: 'Delete',
      onClick: () => setActionResult('Delete clicked!'),
      icon: <Trash2 className="h-4 w-4" />,
      destructive: true,
    },
  ];

  return (
    <div className="space-y-8 p-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Menu Dropdowns (Action Menus)
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Button Menu</h4>
            <MenuDropdown
              items={menuItems}
              triggerText="Actions"
              variant="outline"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Icon Menu (Three Dots)</h4>
            <IconMenuDropdown items={menuItems} />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Different Variants</h4>
            <div className="flex gap-2 flex-wrap">
              <MenuDropdown
                items={menuItems.slice(0, 3)}
                triggerText="Primary"
                variant="primary"
              />
              <MenuDropdown
                items={menuItems.slice(0, 3)}
                triggerText="Success"
                variant="success"
              />
              <MenuDropdown
                items={menuItems.slice(0, 3)}
                triggerText="Danger"
                variant="danger"
              />
            </div>
          </div>

          {actionResult && (
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="text-sm">
                Last action: <strong>{actionResult}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
