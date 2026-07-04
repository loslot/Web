"use client";
import { useState, useEffect, useCallback } from "react";

interface Toast {
  id: number;
  message: string;
  icon?: string;
}

let toastListeners: Array<(t: Toast | null) => void> = [];
let toastId = 0;

export function showToast(message: string, icon = "✅") {
  const toast = { id: ++toastId, message, icon };
  toastListeners.forEach(l => l(toast));
  setTimeout(() => toastListeners.forEach(l => l(null)), 2800);
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    toastListeners.push(setToast);
    return () => { toastListeners = toastListeners.filter(l => l !== setToast); };
  }, []);

  return toast;
}
