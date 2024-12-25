import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";  // Ensure that this function is correctly imported

// Root component of the popover (Radix)
const Popover = PopoverPrimitive.Root;

// Trigger component (the element that opens the popover)
const PopoverTrigger = PopoverPrimitive.Trigger;

// Content component, customized with extra class names and styling
const PopoverContent = React.forwardRef(
  (
    { className, align = "center", sideOffset = 4, ...props }, 
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}                  // Alignment of the popover content (default: center)
        sideOffset={sideOffset}        // Offset from the trigger element (default: 4px)
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className  // Allow custom class names to be passed in
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);

// Proper display name for React dev tools
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Export the components for use
export { Popover, PopoverTrigger, PopoverContent };
