import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-heading font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-sm",
        accent:
          "bg-accent-500 text-ink-900 font-semibold hover:bg-accent-600 active:bg-accent-700 shadow-sm",
        outline:
          "border border-border-strong bg-surface text-ink-900 hover:bg-brand-50 hover:border-brand-700 hover:text-brand-800",
        "outline-light":
          "border border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white",
        ghost:
          "bg-transparent text-ink-700 hover:bg-brand-50 hover:text-brand-900",
        link:
          "bg-transparent text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline p-0 h-auto font-normal",
        dark:
          "bg-brand-950 text-white hover:bg-brand-900 active:bg-brand-800 shadow-sm",
      },
      size: {
        sm: "h-9 px-3.5 text-body-sm rounded-md gap-1.5",
        md: "h-11 px-5 text-body rounded-md gap-2",
        lg: "h-12 px-6 text-body-lg rounded-md gap-2.5",
        icon: "h-10 w-10 p-0 rounded-md shrink-0",
      },
      pill: {
        true: "rounded-pill",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      pill: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Optional icon rendered before the button text */
  leftIcon?: React.ReactNode;
  /** Optional icon rendered after the button text */
  rightIcon?: React.ReactNode;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
}

/**
 * Institutional Button component supporting semantic color variants,
 * loading indicator, icons, and pill radius styling.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      pill,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, pill, fullWidth }), className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
