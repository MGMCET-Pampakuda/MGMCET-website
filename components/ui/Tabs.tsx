"use client";

import React, { createContext, useContext, useState, useId } from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  value: string;
  onValueChange: (val: string) => void;
  baseId: string;
  variant?: "underline" | "pills";
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "underline" | "pills";
  className?: string;
  children: React.ReactNode;
}

/**
 * Accessible Tabs container adhering to WAI-ARIA Tabs pattern.
 */
export function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "underline",
  className,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || "");
  const baseId = useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        baseId,
        variant,
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string;
}

export function TabsList({ className, ariaLabel, children, ...props }: TabsListProps) {
  const { variant } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center overflow-x-auto scrollbar-none",
        variant === "underline"
          ? "border-b border-border gap-6"
          : "bg-brand-50 p-1.5 rounded-xl gap-1.5 border border-brand-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onValueChange, baseId, variant } = useTabsContext();
  const isSelected = activeValue === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-heading text-body-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-brand-700 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variant === "underline"
          ? cn(
              "py-3 border-b-2 -mb-px px-1",
              isSelected
                ? "border-brand-700 text-brand-900"
                : "border-transparent text-ink-600 hover:text-ink-900 hover:border-border"
            )
          : cn(
              "py-2 px-4 rounded-lg",
              isSelected
                ? "bg-surface text-brand-900 shadow-sm"
                : "text-ink-600 hover:text-ink-900 hover:bg-surface/50"
            ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value: activeValue, baseId } = useTabsContext();
  const isSelected = activeValue === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn("pt-6 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
