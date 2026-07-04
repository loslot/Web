import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "green" | "amber" | "gray" | "red";
}

export function Badge({ className, variant = "blue", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          blue: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
          green: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
          amber: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
          gray: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
          red: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
        }[variant],
        className
      )}
      {...props}
    />
  );
}
