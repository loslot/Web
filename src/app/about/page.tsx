import Link from "next/link";
import { Button } from "@/components/ui/button";

const cards = [
  { icon: "🌍", title: "Remote-first", desc: "Every job on JobZ is remote or remote-friendly. We curate listings from companies that genuinely embrace flexible work." },
  { icon: "⚡", title: "Always fresh", desc: "Our jobs are pulled from the Remotive API multiple times a day, so you're always seeing the most recent opportunities." },
  { icon: "🔍", title: "Smart search", desc: "Filter by category, job type, company, salary, and more. Finding the right job should take seconds, not hours." },
  { icon: "🔒", title: "Privacy first", desc: "Your data stays yours. We never sell your information or spam your inbox. You control what you share." },
];

const tech = ["Next.js 15", "TypeScript", "Tailwind CSS", "Shadcn UI", "Framer Motion", "Zod", "Remotive API", "React Hook Form"];

export default function AboutPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-violet-600 to-violet-600 py-20 px-6 text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Our mission</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          JobZ exists to connect talented people with remote opportunities worldwide. We believe great work can happen from anywhere — a home office, a café, or a beach.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {cards.map((card) => (
            <div key={card.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 mb-16">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">Technologies powering JobZ</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>

        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Ready to find your dream job?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Join thousands of professionals who found their perfect role through JobZ.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild><Link href="/jobs">Browse jobs</Link></Button>
            <Button variant="outline" asChild><Link href="/register">Create account</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
