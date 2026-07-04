"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (category) params.set("category", category);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 rounded-full p-2 flex flex-col sm:flex-row items-center gap-2 shadow-2xl shadow-violet-900/10 max-w-xl mx-auto mb-8 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 flex-1 px-4 w-full">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Job title, company, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 py-2"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="sm:border-l border-t sm:border-t-0 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm px-4 py-2 rounded-full sm:rounded-none outline-none w-full sm:w-auto"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white rounded-full text-sm font-semibold transition-all shadow-md shadow-violet-500/25"
      >
        Search jobs
      </button>
    </form>
  );
}
