import { clsx } from "clsx";

type TitleSize = "sm" | "md" | "lg";
type TitleColor = "violet" | "yellow" | "blue" | "cyan" | "green" | "pink" | "foreground";

interface TitleOptions {
  size?: TitleSize;
  color?: TitleColor;
  fullWidth?: boolean;
}

const sizeClasses: Record<TitleSize, string> = {
  sm: "text-3xl lg:text-4xl",
  md: "text-[2.3rem] lg:text-5xl",
  lg: "text-4xl lg:text-6xl",
};

const colorClasses: Record<TitleColor, string> = {
  violet: "bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent",
  yellow: "bg-gradient-to-b from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent",
  blue: "bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent",
  cyan: "bg-gradient-to-b from-[#00b7fa] to-[#01cfea] bg-clip-text text-transparent",
  green: "bg-gradient-to-b from-[#6FEE8D] to-[#17c964] bg-clip-text text-transparent",
  pink: "bg-gradient-to-b from-[#FF72E1] to-[#F54C7A] bg-clip-text text-transparent",
  foreground: "bg-gradient-to-b dark:from-[#FFFFFF] dark:to-[#4B4B4B] bg-clip-text text-transparent",
};

export function title(options: TitleOptions = {}) {
  const { size = "md", color, fullWidth } = options;
  
  return clsx(
    "tracking-tight inline font-semibold",
    sizeClasses[size],
    color && colorClasses[color],
    fullWidth && "w-full block"
  );
}

interface SubtitleOptions {
  fullWidth?: boolean;
}

export function subtitle(options: SubtitleOptions = {}) {
  const { fullWidth = true } = options;
  
  return clsx(
    "my-2 text-lg lg:text-xl text-default-600 block max-w-full",
    fullWidth ? "w-full" : "w-full md:w-1/2"
  );
}
