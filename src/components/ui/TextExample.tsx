import React from 'react';
import { Text } from './Text';

export const TextExample: React.FC = () => {
  return (
    <div className="space-y-4 p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <h2 className="text-2xl font-bold mb-4 col-span-2">
        Text Component Examples
      </h2>

      {/* Size Examples */}
      <div className="space-y-2 flex flex-col gap-2  p-4">
        <h3 className="text-lg font-semibold">Size Variants</h3>
        <Text size="xs">Extra small text</Text>
        <Text size="sm">Small text</Text>
        <Text size="base">Base text (default)</Text>
        <Text size="lg">Large text</Text>
        <Text size="xl">Extra large text</Text>
        <Text size="2xl">2XL text</Text>
      </div>

      {/* Weight Examples */}
      <div className="space-y-2 flex flex-col gap-2  p-4">
        <h3 className="text-lg font-semibold">Weight Variants</h3>
        <Text weight="thin">Thin weight</Text>
        <Text weight="light">Light weight</Text>
        <Text weight="normal">Normal weight (default)</Text>
        <Text weight="medium">Medium weight</Text>
        <Text weight="semibold">Semibold weight</Text>
        <Text weight="bold">Bold weight</Text>
        <Text weight="extrabold">Extra bold weight</Text>
      </div>

      {/* Color Examples */}
      <div className="space-y-2 flex flex-col gap-2  p-4">
        <h3 className="text-lg font-semibold">Color Variants</h3>
        <Text color="default">Default color</Text>
        <Text color="primary">Primary color</Text>
        <Text color="success">Success color</Text>
        <Text color="warning">Warning color</Text>
        <Text color="danger">Danger color</Text>
        <Text color="info">Info color</Text>
        <Text color="muted">Muted color</Text>
        <Text color="accent">Accent color</Text>
      </div>

      {/* Combined Examples */}
      <div className="space-y-2 flex flex-col gap-2  p-4">
        <h3 className="text-lg font-semibold">Combined Props</h3>
        <Text size="lg" weight="bold" color="primary">
          Large, bold, primary text
        </Text>
        <Text size="sm" weight="medium" color="muted">
          Small, medium, muted text
        </Text>
        <Text size="xl" weight="extrabold" color="danger">
          Extra large, extra bold, danger text
        </Text>
      </div>

      {/* Different HTML Elements */}
      <div className="space-y-2 flex flex-col gap-2  p-4">
        <h3 className="text-lg font-semibold">Different HTML Elements</h3>
        <Text as="p" size="base" color="default">
          This is a paragraph element
        </Text>
        <Text as="h4" size="lg" weight="semibold" color="primary">
          This is an h4 heading
        </Text>
        <Text as="div" size="sm" color="muted">
          This is a div element
        </Text>
      </div>
    </div>
  );
};
