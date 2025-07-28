import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple Dialog implementation without any external dependencies
export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange?.(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ children, onClick }) {
  return React.cloneElement(children, { onClick });
}

export function DialogContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "bg-background rounded-lg shadow-lg p-6 w-full max-w-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}