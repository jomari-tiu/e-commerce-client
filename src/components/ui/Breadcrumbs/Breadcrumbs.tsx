import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/@raw-shadcn/breadcrumb';
import {
  ShadDropdownMenu,
  ShadDropdownMenuContent,
  ShadDropdownMenuItem,
  ShadDropdownMenuTrigger,
} from '@/components/ui/@raw-shadcn/Dropdown';

export interface BreadcrumbItemType {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

/**
 * Breadcrumbs component - A prop-based breadcrumb navigation
 * 
 * @param items - Array of breadcrumb items with title, href, and optional onClick
 * @param separator - Custom separator element (default: ChevronRight)
 * @param maxItems - Maximum number of items to show before collapsing (default: show all)
 * @param className - Additional CSS classes
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  maxItems,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const shouldCollapse = maxItems && items.length > maxItems;

  const renderBreadcrumbItem = (item: BreadcrumbItemType, index: number, isLast: boolean) => {
    const content = isLast ? (
      <BreadcrumbPage>{item.title}</BreadcrumbPage>
    ) : item.href ? (
      <BreadcrumbLink href={item.href} onClick={item.onClick}>
        {item.title}
      </BreadcrumbLink>
    ) : (
      <span onClick={item.onClick} className="cursor-pointer transition-colors hover:text-foreground">
        {item.title}
      </span>
    );

    return (
      <React.Fragment key={index}>
        <BreadcrumbItem>{content}</BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
      </React.Fragment>
    );
  };

  const renderCollapsedBreadcrumbs = () => {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems! - 1));
    const collapsedItems = items.slice(1, -(maxItems! - 1));

    return (
      <>
        {renderBreadcrumbItem(firstItem, 0, false)}
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <ShadDropdownMenu>
            <ShadDropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis />
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent align="start">
              {collapsedItems.map((item, index) => (
                <ShadDropdownMenuItem key={index} asChild>
                  {item.href ? (
                    <a href={item.href} onClick={item.onClick}>
                      {item.title}
                    </a>
                  ) : (
                    <span onClick={item.onClick} className="cursor-pointer">
                      {item.title}
                    </span>
                  )}
                </ShadDropdownMenuItem>
              ))}
            </ShadDropdownMenuContent>
          </ShadDropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        {lastItems.map((item, index) =>
          renderBreadcrumbItem(
            item,
            items.length - lastItems.length + index,
            index === lastItems.length - 1
          )
        )}
      </>
    );
  };

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {shouldCollapse
          ? renderCollapsedBreadcrumbs()
          : items.map((item, index) =>
              renderBreadcrumbItem(item, index, index === items.length - 1)
            )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

