"use client";
import Link from "next/link";
import { COMPANIES } from "@/lib/data";

function CompanyChip({ co }: { co: typeof COMPANIES[number] }) {
  return (
    <Link
      href={`/jobs?search=${encodeURIComponent(co.name)}`}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-400 hover:shadow-md transition-all duration-200 min-w-[190px] shrink-0 group"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ background: co.color }}>
        {co.logo}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-sm truncate">{co.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{co.jobs} open roles</p>
      </div>
    </Link>
  );
}

export default function CompanyMarquee() {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
        {[...COMPANIES, ...COMPANIES].map((co, i) => (
          <CompanyChip key={`${co.name}-${i}`} co={co} />
        ))}
      </div>
    </div>
  );
}
