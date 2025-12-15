import { clsx } from "clsx";

interface KbdProps {
  keys?: (
    | "command"
    | "shift"
    | "ctrl"
    | "option"
    | "enter"
    | "delete"
    | "escape"
    | "tab"
    | "up"
    | "down"
    | "left"
    | "right"
  )[];
  className?: string;
  children?: React.ReactNode;
}

const keySymbols: Record<string, string> = {
  command: "⌘",
  shift: "⇧",
  ctrl: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌫",
  escape: "⎋",
  tab: "⇥",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export function Kbd({ keys, className, children }: KbdProps) {
  return (
    <kbd
      className={clsx(
        "inline-flex items-center gap-1 px-1.5 py-0.5",
        "bg-default-100 border border-default-300 rounded",
        "text-xs font-mono text-default-600",
        className,
      )}
    >
      {keys?.map((key) => <span key={key}>{keySymbols[key] || key}</span>)}
      {children}
    </kbd>
  );
}
