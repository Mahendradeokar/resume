import {
  useState,
  type ReactNode,
  type ComponentProps,
  createContext,
  useContext,
} from "react";
import Button from "./Button";
import { CheckIcon } from "@heroicons/react/24/outline";

type ButtonState = "normal" | "loading" | "completed";

interface StateButtonContextType {
  state: ButtonState;
  setState: (state: ButtonState) => void;
  disabled: boolean;
}

const StateButtonContext = createContext<StateButtonContextType | null>(null);

function useStateButton() {
  const context = useContext(StateButtonContext);
  if (!context) {
    throw new Error(
      "StateButton components must be used within a StateButton.Root",
    );
  }
  return context;
}

type ButtonComponentProps = Parameters<typeof Button>[0];
interface StateButtonRootProps extends Omit<ButtonComponentProps, "onClick"> {
  children: ReactNode;
  onClick: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
}

function StateButtonRoot({
  children,
  onClick,
  disabled = false,
  ...props
}: StateButtonRootProps) {
  const [state, setState] = useState<ButtonState>("normal");

  const handleClick = async () => {
    if (disabled || state === "completed" || state === "loading") return;

    setState("loading");
    try {
      const result = onClick();
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      if (result instanceof Promise) {
        await Promise.allSettled([result, delayPromise]);
      } else {
        await delayPromise;
      }
      setState("completed");
      setTimeout(() => setState("normal"), 1000);
    } catch (error) {
      console.error("Button action failed:", error);
      setState("normal");
    }
  };

  return (
    <StateButtonContext.Provider value={{ state, setState, disabled }}>
      <Button
        onClick={handleClick}
        disabled={disabled || state === "completed" || state === "loading"}
        className={`${state === "loading" && "animate-pulse"} ${props.className}`}
        {...props}
      >
        {children}
      </Button>
    </StateButtonContext.Provider>
  );
}

function StateButtonNormal({ children }: { children: ReactNode }) {
  const { state } = useStateButton();
  return state === "normal" ? <>{children}</> : null;
}

function StateButtonLoading({ children }: { children: ReactNode }) {
  const { state } = useStateButton();
  return state === "loading" ? <>{children}</> : null;
}

function StateButtonCompleted({ children }: { children: ReactNode }) {
  const { state } = useStateButton();
  return state === "completed" ? <>{children}</> : null;
}

// Compound component
const ActionButton = Object.assign(StateButtonRoot, {
  Normal: StateButtonNormal,
  Loading: StateButtonLoading,
  Completed: StateButtonCompleted,
});

export default ActionButton;
