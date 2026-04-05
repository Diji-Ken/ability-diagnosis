import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg font-bold transition-all duration-200 cursor-pointer",
        {
          "rpg-button": variant === "primary",
          "border-2 border-border-rpg bg-bg-card text-foreground hover:border-border-rpg-light hover:bg-bg-secondary":
            variant === "secondary",
          "text-text-secondary hover:text-foreground": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
