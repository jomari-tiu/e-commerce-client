import * as React from 'react';
import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

// Base Card component (for composition API)
const CardBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
CardBase.displayName = 'CardBase';

// Props-based Card component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      content,
      footer,
      header,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // If children are provided without props, use composition API (backward compatible)
    if (children && !title && !description && !content && !footer && !header) {
      return (
        <CardBase ref={ref} className={className} {...props}>
          {children}
        </CardBase>
      );
    }

    // Props-based API
    const cardContent = content ?? children;
    
    return (
      <CardBase ref={ref} className={className} {...props}>
        {(header || title || description) && (
          <CardHeader>
            {header || (
              <>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </>
            )}
          </CardHeader>
        )}
        {cardContent && <CardContent>{cardContent}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </CardBase>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
