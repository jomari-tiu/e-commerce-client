/**
 * User Story: As a developer, I want to see examples of all toast variants
 * and how to use them, so that I can implement consistent notifications
 * throughout the application with the appropriate styling for different
 * message types (success, error, warning, info, primary).
 */

import { Button, useToast } from '../index';

export const ToastExample = () => {
  const { toast, success, error, warning, info, primary, loading } = useToast();

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Toast Examples</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          onClick={() =>
            success('Success!', 'Your action was completed successfully.')
          }
          variant="success"
        >
          Success Toast
        </Button>

        <Button
          onClick={() =>
            error('Error!', 'Something went wrong. Please try again.')
          }
          variant="danger"
        >
          Error Toast
        </Button>

        <Button
          onClick={() =>
            warning('Warning!', 'Please review your input before continuing.')
          }
          variant="warning"
        >
          Warning Toast
        </Button>

        <Button
          onClick={() =>
            info('Info', 'Here is some helpful information for you.')
          }
          variant="info"
        >
          Info Toast
        </Button>

        <Button
          onClick={() => primary('Primary', 'This is a primary notification.')}
          variant="primary"
        >
          Primary Toast
        </Button>

        <Button
          onClick={() =>
            toast({
              title: 'Custom Toast',
              description: 'This is a custom toast with default styling.',
              variant: 'default',
            })
          }
        >
          Default Toast
        </Button>

        <Button
          onClick={() => {
            const loadingToast = loading(
              'Loading...',
              'Please wait while we process your request'
            );
            // Simulate async operation
            setTimeout(() => {
              loadingToast.update({
                loading: false,
                variant: 'success',
                title: 'Success!',
                description: 'Operation completed successfully',
                duration: 3000,
                id: loadingToast.id,
              });
            }, 3000);
          }}
          variant="info"
        >
          Loading Toast
        </Button>

        <Button
          onClick={() =>
            toast({
              title: 'Long Duration',
              description: 'This toast will stay for 10 seconds with timer',
              variant: 'primary',
              duration: 10000,
            })
          }
          variant="primary"
        >
          Long Toast with Timer
        </Button>

        <Button
          onClick={() =>
            toast({
              title: 'No Auto-Dismiss',
              description: 'This toast will not auto-dismiss (no timer)',
              variant: 'warning',
              duration: 0,
            })
          }
          variant="warning"
        >
          Persistent Toast
        </Button>

        <Button
          onClick={() =>
            toast({
              title: 'Short Timer',
              description: 'This toast has a 3-second timer',
              variant: 'info',
              duration: 3000,
            })
          }
          variant="info"
        >
          Short Timer (3s)
        </Button>

        <Button
          onClick={() =>
            toast({
              title: 'No Timer Display',
              description: 'This toast hides the timer animation',
              variant: 'default',
              duration: 5000,
              showTimer: false,
            })
          }
        >
          Hidden Timer
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Usage Examples:</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm">
            {`// Import the hook
import { useToast } from '@/components/ui';

// In your component
const { success, error, warning, info, primary, loading } = useToast();

// Show different toast types
success('Success!', 'Operation completed successfully');
error('Error!', 'Something went wrong');
warning('Warning!', 'Please check your input');
info('Info', 'Here is some information');
primary('Primary', 'Important notification');

// Loading toast that can be updated
const loadingToast = loading('Processing...', 'Please wait');
// Later update it
loadingToast.update({
  loading: false,
  variant: 'success',
  title: 'Done!',
  description: 'Process completed'
});

// Custom toast with more options
toast({
  title: 'Custom Toast',
  description: 'Custom description',
  variant: 'success',
  duration: 5000, // Auto dismiss after 5 seconds
  position: 'bottom-right', // Position on screen
  showTimer: true, // Show animated timer (default: true)
});

// Persistent toast (no auto-dismiss)
toast({
  title: 'Important',
  description: 'This stays until manually dismissed',
  duration: 0, // 0 = no auto-dismiss (no timer shown)
});

// Toast with hidden timer
toast({
  title: 'Hidden Timer',
  description: 'Timer runs but is not visible',
  duration: 5000,
  showTimer: false, // Hide the timer animation
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};
