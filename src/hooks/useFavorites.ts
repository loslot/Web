"use client";
import { useState, useCallback } from "react";
import { create } from "zustand";

interface FavoritesStore {
  ids: Set<number>;
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  count: number;
}

// Simple in-memory store using React state via a module-level variable
let globalIds: Set<number> = new Set([1, 3]);
let listeners: Array<() => void> = [];

function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => { listeners = listeners.filter(l => l !== fn); };
}

function getIds() { return globalIds; }

function toggleId(id: number) {
  const next = new Set(globalIds);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  globalIds = next;
  listeners.forEach(l => l());
}

import { useState as useReactState, useEffect } from "react";

export function useFavorites() {
  const [ids, setIds] = useReactState(() => new Set(globalIds));

  useEffect(() => {
    return subscribe(() => setIds(new Set(globalIds)));
  }, []);

  const toggle = useCallback((id: number) => toggleId(id), []);
  const has = useCallback((id: number) => ids.has(id), [ids]);

  return { ids, toggle, has, count: ids.size };
}
