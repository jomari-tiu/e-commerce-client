/**
 * ToastTimer Component - Visual timer animation for toast notifications
 * Shows a progress bar that animates from full to empty based on the toast duration
 */

import * as React from 'react';
import { cn } from '@/utils/cn';

interface ToastTimerProps {
  duration: number; // Duration in milliseconds
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'primary';
  className?: string;
  onComplete?: () => void;
  isPaused?: boolean;
}

export const ToastTimer = React.forwardRef<HTMLDivElement, ToastTimerProps>(
  (
    { duration, variant = 'default', className, onComplete, isPaused = false },
    ref
  ) => {
    const [progress, setProgress] = React.useState(100);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = React.useRef<number>(0);
    const pausedTimeRef = React.useRef<number>(0);

    // Color variants for the progress bar
    const progressColors = {
      default: 'bg-gray-400',
      success: 'bg-green-500',
      danger: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      primary: 'bg-primary',
    };

    const backgroundColors = {
      default: 'bg-gray-200',
      success: 'bg-green-100',
      danger: 'bg-red-100',
      warning: 'bg-yellow-100',
      info: 'bg-blue-100',
      primary: 'bg-primary/20',
    };

    React.useEffect(() => {
      if (duration <= 0) return; // Don't show timer for persistent toasts

      setIsAnimating(true);
      startTimeRef.current = Date.now();

      const updateProgress = () => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current - pausedTimeRef.current;
        const remaining = Math.max(0, duration - elapsed);
        const newProgress = (remaining / duration) * 100;

        setProgress(newProgress);

        if (remaining <= 0) {
          setIsAnimating(false);
          onComplete?.();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      };

      intervalRef.current = setInterval(updateProgress, 50);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [duration, onComplete]);

    React.useEffect(() => {
      if (isPaused) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        pausedTimeRef.current = Date.now() - startTimeRef.current;
      } else if (isAnimating && !intervalRef.current) {
        // Resume animation
        startTimeRef.current = Date.now() - pausedTimeRef.current;

        const updateProgress = () => {
          const now = Date.now();
          const elapsed = now - startTimeRef.current;
          const remaining = Math.max(0, duration - elapsed);
          const newProgress = (remaining / duration) * 100;

          setProgress(newProgress);

          if (remaining <= 0) {
            setIsAnimating(false);
            onComplete?.();
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        };

        intervalRef.current = setInterval(updateProgress, 50);
      }
    }, [isPaused, isAnimating, duration, onComplete]);

    if (duration <= 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg',
          backgroundColors[variant],
          className
        )}
      >
        <div
          className={cn(
            'h-full',
            progressColors[variant]
          )}
          style={{
            width: `${progress}%`,
            transition: isPaused ? 'none' : 'width 75ms ease-linear',
          }}
        />
      </div>
    );
  }
);

ToastTimer.displayName = 'ToastTimer';
