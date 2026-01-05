import * as React from 'react';
import {
  Tabs as ShadTabs,
  TabsList as ShadTabsList,
  TabsTrigger as ShadTabsTrigger,
  TabsContent as ShadTabsContent,
} from '../@raw-shadcn/tabs';
import { cn } from '@/utils/cn';

export type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
  tabsContentClassName?: string;
  size?: 'default' | 'sm' | 'lg';
};

const sizeClasses = {
  sm: {
    list: 'h-8',
    trigger: 'px-2 py-1 text-xs',
  },
  default: {
    list: 'h-10',
    trigger: 'px-3 py-1.5 text-sm',
  },
  lg: {
    list: 'h-12',
    trigger: 'px-4 py-2 text-base',
  },
};

export const Tabs = React.forwardRef<
  React.ElementRef<typeof ShadTabs>,
  TabsProps
>(
  (
    {
      items,
      defaultValue,
      value,
      onValueChange,
      orientation = 'horizontal',
      className,
      tabsListClassName,
      tabsTriggerClassName,
      tabsContentClassName,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const firstEnabledItem = items.find((item) => !item.disabled);
    const effectiveDefaultValue =
      defaultValue || value || firstEnabledItem?.value || items[0]?.value;

    return (
      <ShadTabs
        ref={ref}
        defaultValue={effectiveDefaultValue}
        value={value}
        onValueChange={onValueChange}
        orientation={orientation}
        className={cn('w-full', className)}
        {...props}
      >
        <ShadTabsList
          className={cn(
            sizeClasses[size].list,
            orientation === 'vertical' && 'flex-col h-auto w-auto',
            tabsListClassName
          )}
        >
          {items.map((item) => (
            <ShadTabsTrigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cn(
                sizeClasses[size].trigger,
                'flex items-center gap-2',
                tabsTriggerClassName
              )}
            >
              {item.icon && <span className="inline-flex">{item.icon}</span>}
              {item.label}
            </ShadTabsTrigger>
          ))}
        </ShadTabsList>
        {items.map((item) => (
          <ShadTabsContent
            key={item.value}
            value={item.value}
            className={cn(tabsContentClassName)}
          >
            {item.content}
          </ShadTabsContent>
        ))}
      </ShadTabs>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;

