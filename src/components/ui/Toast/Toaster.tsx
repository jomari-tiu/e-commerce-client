/**
 * User Story: As a user, I want toast notifications to appear in a consistent
 * location on the screen and automatically disappear after a reasonable time,
 * so that I can see important feedback without having to manually dismiss
 * every notification.
 */

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/@raw-shadcn/Toast/Toast';
import { useToast } from '@/components/ui/Toast/useToast';

interface ToasterProps {
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

export function Toaster({ position = 'top-right' }: ToasterProps = {}) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        loading,
        duration,
        ...props
      }) {
        return (
          <Toast key={id} loading={loading} duration={duration} {...props}>
            <div className="grid gap-1 mb-1">
              {title && <ToastTitle loading={loading}>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            {!loading && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport position={position} />
    </ToastProvider>
  );
}
