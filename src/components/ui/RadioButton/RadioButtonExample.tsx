import { useState } from 'react';
import { Star, Zap, Shield, Heart } from 'lucide-react';
import RadioGroup from './RadioGroup';
import CardRadioGroup, { CardRadioOption } from './CardRadioGroup';

const RadioButtonExample = () => {
  const [basicValue, setBasicValue] = useState('');
  const [horizontalValue, setHorizontalValue] = useState('');
  const [cardValue, setCardValue] = useState('');
  const [tileValue, setTileValue] = useState('');

  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
  ];

  const detailedOptions: CardRadioOption[] = [
    {
      value: 'basic',
      label: 'Basic Plan',
      description: 'Perfect for individuals and small teams',
      badge: { label: '$9/month' },
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      description: 'Best for growing businesses',
      badge: { label: '$29/month' },
      recommended: true,
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'For large organizations with advanced needs',
      badge: { label: '$99/month' },
    },
  ];

  const iconOptions: CardRadioOption[] = [
    {
      value: 'performance',
      label: 'Performance',
      description: 'Optimized for speed and efficiency',
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      badge: { label: 'Fast', variant: 'ghost' },
    },
    {
      value: 'security',
      label: 'Security',
      description: 'Advanced security features',
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      badge: { label: 'Secure', variant: 'success' },
    },
    {
      value: 'premium',
      label: 'Premium',
      description: 'All features included',
      icon: <Star className="w-6 h-6 text-purple-500" />,
      badge: { label: 'Popular', variant: 'warning' },
      recommended: true,
    },
    {
      value: 'support',
      label: 'Support',
      description: '24/7 customer support',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      badge: { label: '24/7', variant: 'info' },
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">RadioButton Examples</h1>

      {/* Basic Vertical Radio Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Vertical Radio Group</h2>
        <RadioGroup
          label="Choose your preference"
          options={basicOptions}
          value={basicValue}
          onValueChange={setBasicValue}
          required
        />
        <p className="text-sm text-gray-600">
          Selected: {basicValue || 'None'}
        </p>
      </div>

      {/* Horizontal Radio Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal Radio Group</h2>
        <RadioGroup
          label="Size preference"
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
          value={horizontalValue}
          onValueChange={setHorizontalValue}
          orientation="horizontal"
          size="lg"
        />
        <p className="text-sm text-gray-600">
          Selected: {horizontalValue || 'None'}
        </p>
      </div>

      {/* Cards Layout */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cards Layout</h2>
        <CardRadioGroup
          label="Choose your plan"
          options={detailedOptions}
          value={cardValue}
          onValueChange={setCardValue}
          layout="cards"
          columns={3}
        />
        <p className="text-sm text-gray-600">Selected: {cardValue || 'None'}</p>
      </div>

      {/* Tiles Layout with Icons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tiles Layout with Icons</h2>
        <CardRadioGroup
          label="Select features"
          options={iconOptions}
          value={tileValue}
          onValueChange={setTileValue}
          layout="tiles"
          columns={2}
          showIcons
          showBadges
        />
        <p className="text-sm text-gray-600">Selected: {tileValue || 'None'}</p>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Different Sizes</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Small</h3>
            <RadioGroup
              options={[
                { value: 'sm1', label: 'Option 1' },
                { value: 'sm2', label: 'Option 2' },
              ]}
              value=""
              onValueChange={() => {}}
              size="sm"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Default</h3>
            <RadioGroup
              options={[
                { value: 'def1', label: 'Option 1' },
                { value: 'def2', label: 'Option 2' },
              ]}
              value=""
              onValueChange={() => {}}
              size="default"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Large</h3>
            <RadioGroup
              options={[
                { value: 'lg1', label: 'Option 1' },
                { value: 'lg2', label: 'Option 2' },
              ]}
              value=""
              onValueChange={() => {}}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioButtonExample;
