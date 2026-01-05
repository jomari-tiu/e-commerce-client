/**
 * User Story: As a developer, I want a simple hook to show toast notifications
 * with different variants (success, error, warning, info), so that I can provide
 * user feedback throughout the application with consistent styling and behavior.
 */

import * as React from "react";

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/@raw-shadcn/Toast/Toast";

const TOAST_LIMIT = 5; // Allow multiple toasts
const TOAST_REMOVE_DELAY = 5000; // 5 seconds default timeout

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  loading?: boolean;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
};

export const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const delay = duration || TOAST_REMOVE_DELAY;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, delay);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        const toast = state.toasts.find((t) => t.id === toastId);
        addToRemoveQueue(toastId, toast?.duration);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, toast.duration);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ duration = TOAST_REMOVE_DELAY, ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      duration,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  // Auto-dismiss after duration (unless loading or duration is 0)
  if (!props.loading && duration > 0) {
    setTimeout(() => {
      addToRemoveQueue(id, 1000); // Give 1 second for exit animation
    }, duration - 1000);
  }

  return {
    id: id,
    dismiss,
    update,
  };
}

// Convenience methods for different toast variants
function success(
  title: string,
  description?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "success",
    title,
    description,
    ...options,
  });
}

function error(title: string, description?: string, options?: Partial<Toast>) {
  return toast({
    variant: "danger",
    title,
    description,
    ...options,
  });
}

function warning(
  title: string,
  description?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "warning",
    title,
    description,
    ...options,
  });
}

function info(title: string, description?: string, options?: Partial<Toast>) {
  return toast({
    variant: "info",
    title,
    description,
    ...options,
  });
}

function primary(
  title: string,
  description?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "primary",
    title,
    description,
    ...options,
  });
}

function loading(
  title: string,
  description?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "default",
    title,
    description,
    loading: true,
    duration: 0, // Don't auto-dismiss loading toasts
    ...options,
  });
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    success,
    error,
    warning,
    info,
    primary,
    loading,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
