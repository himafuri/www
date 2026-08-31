"use client";

import type { ComponentProps } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between px-6 py-4 text-left text-base font-semibold text-card-foreground transition-all outline-none hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 cursor-pointer",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDownIcon className="size-5 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-t border-border bg-muted/30"
      {...props}
    >
      <div
        className={cn(
          "px-6 pt-4 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
