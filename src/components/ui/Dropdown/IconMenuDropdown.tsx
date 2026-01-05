import { cn } from '@/utils/cn';
import { MenuDropdown, MenuDropdownProps } from './MenuDropdown';
import { MoreVertical } from 'lucide-react';
import { ShadDropdownMenuTrigger } from '../@raw-shadcn/Dropdown/ShadDropdownMenu';
import React from 'react';

export const IconMenuDropdown = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuTrigger>,
  Omit<MenuDropdownProps, 'triggerText' | 'triggerIcon' | 'showChevron'>
>(({ triggerClassName, ...props }, ref) => {
  return (
    <MenuDropdown
      ref={ref}
      triggerIcon={<MoreVertical className="h-4 w-4" />}
      variant="ghost"
      size="icon"
      showChevron={false}
      triggerClassName={cn('h-8 w-8', triggerClassName)}
      {...props}
    />
  );
});

IconMenuDropdown.displayName = 'IconMenuDropdown';
