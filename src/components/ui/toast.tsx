"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";

export function ToastContainer() {
  const toast = useToast();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-2xl text-sm font-medium max-w-xs"
        >
          <span>{toast.icon}</span>
          <span>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
