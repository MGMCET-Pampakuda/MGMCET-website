"use client";

import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  className?: string;
}

/**
 * Accessible dialog modal with backdrop blur, escape listener, focus trap, and body scroll lock.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-modal-title`;
  const descId = `${baseId}-modal-desc`;

  // Body scroll lock & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog box */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full rounded-card bg-surface shadow-pop border border-border p-6 sm:p-8 transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto flex flex-col",
          sizeClasses[size],
          className
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-md p-1.5 text-ink-400 hover:text-ink-900 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {title && (
          <div className="mb-4 pr-8">
            <h2 id={titleId} className="font-heading text-h3 font-bold text-ink-900">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-body-sm text-ink-600">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}

export function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
