"use client";

import React, { createContext, useContext, useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionContextValue {
  openValues: string[];
  toggleValue: (val: string) => void;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}

export interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Accessible Accordion component for FAQs, syllabus breakdowns, and collapsible disclosures.
 */
export function Accordion({
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const initialOpen = () => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  };

  const [uncontrolledOpen, setUncontrolledOpen] = useState<string[]>(initialOpen);
  const baseId = useId();

  const isControlled = controlledValue !== undefined;
  const openValues = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : uncontrolledOpen;

  const toggleValue = (val: string) => {
    let next: string[];
    if (type === "single") {
      next = openValues.includes(val) ? [] : [val];
    } else {
      next = openValues.includes(val)
        ? openValues.filter((v) => v !== val)
        : [...openValues, val];
    }

    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onValueChange?.(type === "single" ? next[0] || "" : next);
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleValue, baseId }}>
      <div className={cn("divide-y divide-border", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <div
      data-value={value}
      className={cn("py-2 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass value down
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, {
            itemValue: value,
          });
        }
        return child;
      })}
    </div>
  );
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string;
}

export function AccordionTrigger({
  itemValue = "",
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { openValues, toggleValue, baseId } = useAccordionContext();
  const isOpen = openValues.includes(itemValue);
  const triggerId = `${baseId}-trigger-${itemValue}`;
  const contentId = `${baseId}-content-${itemValue}`;

  return (
    <h3>
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => toggleValue(itemValue)}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-heading text-body font-semibold text-ink-900 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-700 cursor-pointer select-none",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200",
            isOpen && "rotate-180 text-brand-700"
          )}
          aria-hidden="true"
        />
      </button>
    </h3>
  );
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  itemValue?: string;
}

export function AccordionContent({
  itemValue = "",
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { openValues, baseId } = useAccordionContext();
  const isOpen = openValues.includes(itemValue);
  const triggerId = `${baseId}-trigger-${itemValue}`;
  const contentId = `${baseId}-content-${itemValue}`;

  if (!isOpen) return null;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn(
        "pb-4 pt-1 text-body-sm text-ink-600 leading-relaxed animate-in fade-in-50 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
