import React from 'react';
import { Input } from './Input';

// Example icons - you can use any icon library like Lucide React, Heroicons, etc.
const SearchIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const InputExample: React.FC = () => {
  return (
    <div className="space-y-4 p-4 max-w-md">
      <h3 className="text-lg font-semibold">Input Component Examples</h3>

      {/* Regular input without icons */}
      <div>
        <label className="block text-sm font-medium mb-1">Regular Input</label>
        <Input placeholder="Enter text..." />
      </div>

      {/* Input with leading icon */}
      <div>
        <label className="block text-sm font-medium mb-1">
          With Leading Icon
        </label>
        <Input placeholder="Search..." leadingIcon={<SearchIcon />} />
      </div>

      {/* Input with trailing icon */}
      <div>
        <label className="block text-sm font-medium mb-1">
          With Trailing Icon
        </label>
        <Input
          type="password"
          placeholder="Password..."
          trailingIcon={<EyeIcon />}
        />
      </div>

      {/* Input with both leading and trailing icons */}
      <div>
        <label className="block text-sm font-medium mb-1">
          With Both Icons
        </label>
        <Input
          placeholder="Username..."
          leadingIcon={<UserIcon />}
          trailingIcon={<EyeIcon />}
        />
      </div>
    </div>
  );
};
