import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div>
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Browse by Category</h1>
          <p className="text-slate-500 dark:text-slate-400">Explore remote opportunities across all industries and specializations</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group text-center"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-1">{cat.name}</p>
                <p className="text-xs text-slate-400">{cat.count.toLocaleString()} open positions</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
