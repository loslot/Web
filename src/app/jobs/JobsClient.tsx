"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import JobCard from "@/components/ui/JobCard";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

interface Props {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  initialSearch: string;
  initialCategory: string;
  initialType: string;
}

export default function JobsClientPage({ jobs, totalJobs, currentPage, totalPages, initialSearch, initialCategory, initialType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState(initialType);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const applyFilters = (s = search, c = category, t = type, p = 1) => {
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (c) params.set("category", c);
    if (t) params.set("type", t);
    if (p > 1) params.set("page", String(p));
    startTransition(() => router.push(`/jobs?${params.toString()}`));
  };

  const clearFilters = () => {
    setSearch(""); setCategory(""); setType("");
    startTransition(() => router.push("/jobs"));
  };

  const hasFilters = !!(initialSearch || initialCategory || initialType);

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => { setCategory(""); applyFilters(search, "", type); }}
            className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors", !category ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800")}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setCategory(cat.name); applyFilters(search, cat.name, type); }}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between", category === cat.name ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800")}
            >
              <span>{cat.icon} {cat.name}</span>
              <span className="text-xs text-slate-400">{cat.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">Job Type</h3>
        <div className="space-y-1">
          <button
            onClick={() => { setType(""); applyFilters(search, category, ""); }}
            className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors", !type ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800")}
          >
            All Types
          </button>
          {JOB_TYPES.map((t_) => (
            <button
              key={t_}
              onClick={() => { setType(t_); applyFilters(search, category, t_); }}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors", type === t_ ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800")}
            >
              {t_}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Page header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Remote Jobs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{totalJobs.toLocaleString()} positions available {hasFilters && "matching your filters"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Filters</h2>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-violet-500 hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search bar + mobile filter */}
          <div className="flex gap-2 mb-5">
            <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-2.5 bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
              {search && (
                <button type="button" onClick={() => { setSearch(""); applyFilters("", category, type); }}>
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </form>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {initialSearch && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 rounded-full text-xs font-medium">
                  "{initialSearch}"
                  <button onClick={() => { setSearch(""); applyFilters("", category, type); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              {initialCategory && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 rounded-full text-xs font-medium">
                  {initialCategory}
                  <button onClick={() => { setCategory(""); applyFilters(search, "", type); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              {initialType && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 rounded-full text-xs font-medium">
                  {initialType}
                  <button onClick={() => { setType(""); applyFilters(search, category, ""); }}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {isPending && (
            <div className="text-center py-8 text-slate-400 text-sm animate-pulse">Loading jobs...</div>
          )}

          {!isPending && jobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">No jobs found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => applyFilters(search, category, type, p)}
                      className={cn(
                        "w-9 h-9 rounded-xl text-sm font-medium border transition-all",
                        p === currentPage
                          ? "bg-violet-500 text-white border-violet-500"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 hover:text-violet-500"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-800 dark:text-slate-100">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <Sidebar />
          </motion.div>
        </div>
      )}
    </div>
  );
}
