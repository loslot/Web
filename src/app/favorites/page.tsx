"use client";
import Link from "next/link";
import { Heart, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

// Statically defined sample jobs for favorites display
const SAMPLE_JOBS = [
  { id: 1, title: "Senior React Developer", company_name: "Stripe", company_logo: "", job_type: "Full-time", candidate_required_location: "Worldwide", salary: "$120k–$160k", publication_date: new Date().toISOString(), category: "Software Dev", url: "#", description: "", tags: [] },
  { id: 3, title: "Product Designer", company_name: "Figma", company_logo: "", job_type: "Full-time", candidate_required_location: "USA Only", salary: "$110k–$140k", publication_date: new Date().toISOString(), category: "Design", url: "#", description: "", tags: [] },
];

export default function FavoritesPage() {
  const { ids } = useFavorites();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Sign in to see your favorites</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Create an account to save jobs and revisit them any time.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild><Link href="/login">Sign in</Link></Button>
          <Button variant="outline" asChild><Link href="/register">Register</Link></Button>
        </div>
      </div>
    );
  }

  const savedJobs = SAMPLE_JOBS.filter((j) => ids.has(j.id));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Saved Jobs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">No saved jobs yet</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Browse jobs and click the heart icon to save them here.</p>
          <Button asChild><Link href="/jobs">Browse Jobs</Link></Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {savedJobs.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/jobs/${job.id}`} className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-400 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-500 flex items-center justify-center text-white font-bold shrink-0">
                    {job.company_name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.company_name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{job.salary}</span>
                  <span className="text-xs text-slate-400">{job.job_type}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
