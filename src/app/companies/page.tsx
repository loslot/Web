import { COMPANIES } from "@/lib/data";
import Link from "next/link"; // 1. Imported Link

export default function CompaniesPage() {
  return (
    <div>
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Top Companies Hiring</h1>
          <p className="text-slate-500 dark:text-slate-400">Discover industry-leading companies with open remote positions</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {COMPANIES.map((co) => (
            /* 2. Changed <div> to <Link> */
            <Link 
              key={co.name}
              href={`/jobs?search=${encodeURIComponent(co.name)}`}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-400 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" style={{ background: co.color }}>
                {co.logo}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {co.name}
                </p>
                <p className="text-sm text-slate-400 mt-1">{co.jobs} open roles</p>
              </div>
              <span className="text-xs text-violet-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View jobs →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
