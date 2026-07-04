"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ExternalLink, ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";

function colorForCompany(name: string) {
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return colors[Math.abs(h) % colors.length];
}

function timeAgo(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  } catch { return "Recently"; }
}

export default function JobDetailClient({ job }: { job: Job }) {
  const { has, toggle } = useFavorites();
  const { user } = useAuth();
  const saved = has(job.id);

  const handleFav = () => {
    if (!user) { showToast("Sign in to save jobs", "🔒"); return; }
    toggle(job.id);
    showToast(saved ? "Removed from favorites" : "Saved!", saved ? "🗑️" : "❤️");
  };

  const color = colorForCompany(job.company_name || "");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to jobs
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-5">
              {job.company_logo ? (
                <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 rounded-2xl object-contain bg-slate-100 dark:bg-slate-800 p-1.5 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0" style={{ background: color }}>
                  {(job.company_name || "?")[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{job.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{job.company_name}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {job.candidate_required_location && <Badge variant="blue"><MapPin className="w-3 h-3" /> {job.candidate_required_location}</Badge>}
              {job.job_type && <Badge variant="green"><Clock className="w-3 h-3" /> {job.job_type}</Badge>}
              {job.category && <Badge variant="gray"><Briefcase className="w-3 h-3" /> {job.category}</Badge>}
              {job.salary && <Badge variant="amber">💰 {job.salary}</Badge>}
            </div>

            <div className="flex gap-3">
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full gap-2">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFav}
                className={cn(saved && "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30")}
              >
                <Heart className={cn("w-4 h-4", saved && "fill-current")} />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">Job Description</h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed [&>h2]:text-slate-800 dark:[&>h2]:text-slate-200 [&>h3]:text-slate-800 dark:[&>h3]:text-slate-200 [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-3"
              dangerouslySetInnerHTML={{ __html: job.description || "<p>No description provided.</p>" }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Job Details</h3>
            <div className="space-y-3">
              {[
                ["Company", job.company_name],
                ["Category", job.category],
                ["Job Type", job.job_type],
                ["Location", job.candidate_required_location],
                ["Salary", job.salary || "Not specified"],
                ["Posted", timeAgo(job.publication_date)],
              ].map(([label, val]) => val && (
                <div key={label} className="flex justify-between items-start gap-2">
                  <span className="text-xs text-slate-400 shrink-0">{label}</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {job.tags && job.tags.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="gray" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-violet-800 dark:text-violet-300 mb-2">Ready to apply?</h3>
            <p className="text-xs text-violet-600 dark:text-violet-400 mb-4 leading-relaxed">Don't wait — this position might close soon. Apply directly on the company's website.</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">Apply Now →</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
