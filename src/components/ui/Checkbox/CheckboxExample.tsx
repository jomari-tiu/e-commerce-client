import { useState } from 'react';
import { CardCheckboxGroup, CardCheckboxOption } from './index';
import { Zap, Shield, Globe, Database } from 'lucide-react';
import CheckboxGroup from './CheckboxGroup';
import Checkbox from './Checkbox';

const CheckboxExample = () => {
  const [singleChecked, setSingleChecked] = useState(false);
  const [basicValues, setBasicValues] = useState<string[]>([]);
  const [horizontalValues, setHorizontalValues] = useState<string[]>([]);
  const [cardValues, setCardValues] = useState<string[]>([]);
  const [tileValues, setTileValues] = useState<string[]>([]);

  const basicOptions = [
    {
      value: 'option1',
      label: 'Option 1',
      description: 'This is the first option',
    },
    {
      value: 'option2',
      label: 'Option 2',
      description: 'This is the second option',
    },
    {
      value: 'option3',
      label: 'Option 3',
      disabled: true,
      description: 'This option is disabled',
    },
    {
      value: 'option4',
      label: 'Option 4',
      description: 'This is the fourth option',
    },
  ];

  const featureOptions: CardCheckboxOption[] = [
    {
      value: 'analytics',
      label: 'Analytics Dashboard',
      description: 'Advanced analytics and reporting',
      badge: { label: 'Popular', variant: 'info' },
      price: '+$10/month',
    },
    {
      value: 'api',
      label: 'API Access',
      description: 'Full REST API access',
      badge: { label: 'Developer', variant: 'success' },
      price: '+$15/month',
      recommended: true,
    },
    {
      value: 'support',
      label: 'Priority Support',
      description: '24/7 priority customer support',
      badge: { label: 'Premium', variant: 'ghost' },
      price: '+$25/month',
    },
    {
      value: 'storage',
      label: 'Extra Storage',
      description: 'Additional 100GB storage',
      badge: { label: 'Storage', variant: 'warning' },
      price: '+$5/month',
    },
  ];

  const serviceOptions: CardCheckboxOption[] = [
    {
      value: 'hosting',
      label: 'Web Hosting',
      description: 'High-performance web hosting',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      badge: { label: 'Essential', variant: 'primary' },
      price: '$19/month',
    },
    {
      value: 'database',
      label: 'Database',
      description: 'Managed database service',
      icon: <Database className="w-6 h-6 text-green-500" />,
      badge: { label: 'Managed', variant: 'primary' },
      price: '$29/month',
    },
    {
      value: 'performance',
      label: 'Performance',
      description: 'CDN and optimization',
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      badge: { label: 'Fast', variant: 'danger' },
      price: '$15/month',
      recommended: true,
    },
    {
      value: 'security',
      label: 'Security',
      description: 'Advanced security features',
      icon: <Shield className="w-6 h-6 text-red-500" />,
      badge: { label: 'Secure', variant: 'info' },
      price: '$12/month',
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkbox Examples</h1>

      {/* Single Checkbox */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Single Checkbox</h2>
        <Checkbox
          id="single-checkbox"
          label="I agree to the terms and conditions"
          description="Please read our terms and conditions carefully"
          checked={singleChecked}
          onCheckedChange={setSingleChecked}
          required
        />
        <p className="text-sm text-gray-600">
          Checked: {singleChecked ? 'Yes' : 'No'}
        </p>
      </div>

      {/* Basic Checkbox Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Checkbox Group</h2>
        <CheckboxGroup
          label="Select your preferences"
          options={basicOptions}
          values={basicValues}
          onValuesChange={setBasicValues}
          required
        />
        <p className="text-sm text-gray-600">
          Selected: {basicValues.join(', ') || 'None'}
        </p>
      </div>

      {/* Horizontal Checkbox Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal Checkbox Group</h2>
        <CheckboxGroup
          label="Notification preferences"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
            { value: 'push', label: 'Push' },
            { value: 'in_app', label: 'In-App' },
          ]}
          values={horizontalValues}
          onValuesChange={setHorizontalValues}
          orientation="horizontal"
          size="lg"
        />
        <p className="text-sm text-gray-600">
          Selected: {horizontalValues.join(', ') || 'None'}
        </p>
      </div>

      {/* Cards Layout with Select All */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cards Layout with Select All</h2>
        <CardCheckboxGroup
          label="Choose additional features"
          options={featureOptions}
          values={cardValues}
          onValuesChange={setCardValues}
          layout="cards"
          columns={2}
          allowSelectAll
          selectAllLabel="Select all features"
        />
        <p className="text-sm text-gray-600">
          Selected: {cardValues.join(', ') || 'None'}
        </p>
      </div>

      {/* Tiles Layout with Icons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tiles Layout with Icons</h2>
        <CardCheckboxGroup
          label="Select services to include"
          options={serviceOptions}
          values={tileValues}
          onValuesChange={setTileValues}
          layout="tiles"
          columns={2}
          showIcons
          showBadges
          allowSelectAll
        />
        <p className="text-sm text-gray-600">
          Selected: {tileValues.join(', ') || 'None'}
        </p>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Different Sizes</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Small</h3>
            <CheckboxGroup
              options={[
                { value: 'sm1', label: 'Small Option 1' },
                { value: 'sm2', label: 'Small Option 2' },
              ]}
              values={[]}
              onValuesChange={() => {}}
              size="sm"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Default</h3>
            <CheckboxGroup
              options={[
                { value: 'def1', label: 'Default Option 1' },
                { value: 'def2', label: 'Default Option 2' },
              ]}
              values={[]}
              onValuesChange={() => {}}
              size="default"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Large</h3>
            <CheckboxGroup
              options={[
                { value: 'lg1', label: 'Large Option 1' },
                { value: 'lg2', label: 'Large Option 2' },
              ]}
              values={[]}
              onValuesChange={() => {}}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Mixed Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mixed Usage</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Checkbox
              label="Newsletter subscription"
              description="Get weekly updates"
              checked={false}
              onCheckedChange={() => {}}
            />
          </div>
          <div>
            <Checkbox
              label="Marketing emails"
              description="Promotional content"
              checked={true}
              onCheckedChange={() => {}}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxExample;
