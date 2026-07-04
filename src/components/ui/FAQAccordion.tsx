"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/data";

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border transition-colors ${
              isOpen
                ? "border-violet-300 dark:border-violet-700 bg-violet-50/60 dark:bg-violet-950/30"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{item.q}</span>
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isOpen ? "bg-violet-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
