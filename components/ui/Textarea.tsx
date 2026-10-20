import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Institutional Textarea component with integrated label, error message, and helper text.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-heading text-body-sm font-semibold text-ink-900"
          >
            {label}
            {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "w-full rounded-md border bg-surface p-3.5 text-body text-ink-900 placeholder:text-ink-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:bg-brand-50/50 disabled:text-ink-400",
            error
              ? "border-danger focus-visible:outline-danger"
              : "border-border hover:border-border-strong focus-visible:outline-brand-700",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-caption font-medium text-danger">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-caption text-ink-600">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
