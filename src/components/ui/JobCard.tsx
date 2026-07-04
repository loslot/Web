"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
  index?: number;
}

function timeAgo(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    return `${Math.floor(days / 30)}mo ago`;
  } catch {
    return "Recently";
  }
}

function colorForCompany(name: string) {
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return colors[Math.abs(h) % colors.length];
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
  const { has, toggle } = useFavorites();
  const { user } = useAuth();
  const saved = has(job.id);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("Sign in to save jobs", "🔒");
      return;
    }
    toggle(job.id);
    showToast(saved ? "Removed from favorites" : "Saved to favorites!", saved ? "🗑️" : "❤️");
  };

  const logoInitial = (job.company_name || "?")[0].toUpperCase();
  const color = colorForCompany(job.company_name || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        href={`/jobs/${job.id}`}
        className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-3 mb-3">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-11 h-11 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ background: color }}
            >
              {logoInitial}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate text-[15px] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {job.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{job.company_name}</p>
          </div>
          <button
            onClick={handleToggleFav}
            aria-label={saved ? "Remove from favorites" : "Save job"}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-colors shrink-0",
              saved
                ? "text-red-500 bg-red-50 dark:bg-red-950/30"
                : "text-slate-300 dark:text-slate-600 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30"
            )}
          >
            <Heart className={cn("w-4 h-4", saved && "fill-current")} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.candidate_required_location && (
            <Badge variant="blue">📍 {job.candidate_required_location.slice(0, 20)}</Badge>
          )}
          {job.job_type && (
            <Badge variant="green">⏱ {job.job_type}</Badge>
          )}
          {job.category && (
            <Badge variant="gray">📂 {job.category.slice(0, 18)}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {job.salary || "Salary not listed"}
          </span>
          <span className="text-xs text-slate-400">🕐 {timeAgo(job.publication_date)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
