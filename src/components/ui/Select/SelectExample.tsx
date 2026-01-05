import React, { useState } from 'react';
import {
  Select,
  SelectMenu,
  SelectOption,
  AdvancedSelectOption,
  SelectValue,
} from '.';

export const SelectExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<SelectValue | null>(null);
  const [multiSelectedValues, setMultiSelectedValues] = useState<SelectValue[]>(
    []
  );
  const [advancedValue, setAdvancedValue] = useState<SelectValue | null>(null);
  const [clearableValue, setClearableValue] = useState<SelectValue | null>(
    null
  );

  // Basic select options
  const basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4', separator: true },
    { value: 'option5', label: 'Option 5' },
  ];

  // Advanced select options with separators and labels
  const advancedOptions: AdvancedSelectOption[] = [
    { type: 'label' as const, label: 'Fruits' },
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { type: 'separator' as const },
    { type: 'label' as const, label: 'Vegetables' },
    { value: 'carrot', label: 'Carrot' },
    { value: 'broccoli', label: 'Broccoli' },
    { value: 'spinach', label: 'Spinach' },
  ];

  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Custom Select</h3>
        <Select
          label="Choose an option"
          placeholder="Select something..."
          options={basicOptions}
          value={selectedValue}
          onValueChange={setSelectedValue}
          className="w-full"
          required
        />
        {selectedValue && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedValue.label} (value: {selectedValue.value})
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Multiple Selection Select
        </h3>
        <SelectMenu
          label="Choose multiple options"
          placeholder="Select multiple..."
          options={basicOptions}
          multiple
          values={multiSelectedValues}
          onMultiValueChange={setMultiSelectedValues}
          className="w-full"
        />
        {multiSelectedValues.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {multiSelectedValues.map(v => v.label).join(', ')}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Searchable Advanced Select
        </h3>
        <SelectMenu
          label="Search and select"
          placeholder="Search items..."
          options={advancedOptions}
          value={advancedValue}
          onValueChange={setAdvancedValue}
          searchable
          className="w-full"
        />
        {advancedValue && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {advancedValue.label} (value: {advancedValue.value})
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Clearable Searchable Select
        </h3>
        <SelectMenu
          label="Search countries"
          placeholder="Search and select a country..."
          options={countryOptions}
          value={clearableValue}
          onValueChange={setClearableValue}
          searchable
          clearable
          onClear={() => console.log('Cleared!')}
          className="w-full"
        />
        {clearableValue && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {clearableValue.label} (value: {clearableValue.value})
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="space-y-3">
          <Select
            placeholder="Small size"
            options={basicOptions.slice(0, 3)}
            onValueChange={value => console.log('Small selected:', value)}
            size="sm"
          />
          <Select
            placeholder="Default size"
            options={basicOptions.slice(0, 3)}
            onValueChange={value => console.log('Default selected:', value)}
            size="default"
          />
          <Select
            placeholder="Large size"
            options={basicOptions.slice(0, 3)}
            onValueChange={value => console.log('Large selected:', value)}
            size="lg"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Form Integration</h3>
        <form className="space-y-4">
          <Select
            label="Country"
            name="country"
            placeholder="Select your country"
            options={countryOptions.slice(0, 5)}
            onValueChange={value => console.log('Country selected:', value)}
            required
          />
          <Select
            label="Preferred Language"
            name="language"
            placeholder="Select language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
            ]}
            onValueChange={value => console.log('Language selected:', value)}
          />
        </form>
      </div>
    </div>
  );
};
