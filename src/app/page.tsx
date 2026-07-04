import Link from "next/link";
import { Search, Download, PlayCircle, Bell, Sparkles, MousePointerClick, Radar, Star, ArrowRight } from "lucide-react";
import { CATEGORIES, FEATURES } from "@/lib/data";
import { fetchJobs } from "@/lib/data";
import JobCard from "@/components/ui/JobCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CompanyMarquee from "@/components/ui/CompanyMarquee";

export const revalidate = 3600;

const STEPS = [
  { title: "Create Profile", desc: "Sign up in just a few simple steps and start building your professional profile in minutes.", icon: "👤" },
  { title: "Upload Resume", desc: "Upload your resume so our smart matching engine can surface roles that fit your skills.", icon: "📄" },
  { title: "Apply & Get Hired", desc: "Apply to your dream jobs with a single click and get noticed by top companies.", icon: "🚀" },
];

const TESTIMONIALS = [
  { name: "Sarah Johnson", role: "Product Designer at Google", quote: "This platform completely transformed my job search. The recommendations matched my skills perfectly and the apply flow made everything effortless.", rating: 5 },
  { name: "Michael Chen", role: "Software Engineer at Microsoft", quote: "The one-click apply feature saved me so much time. I could focus my energy on interview prep instead of paperwork.", rating: 5 },
  { name: "Emily Park", role: "Marketing Manager at Amazon", quote: "The personalized alerts saved me from missing out on great roles. I heard back from three companies within a week.", rating: 5 },
];

export default async function HomePage() {
  const jobs: any[] = await fetchJobs();
  const featured: any[] = jobs.slice(0, 6);
  const latest: any[] = jobs.slice(6, 12);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-16 pb-24 px-6">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-violet-300/40 via-purple-200/30 to-transparent rounded-full blur-3xl -z-10 dark:from-violet-800/20 dark:via-purple-900/10" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 rounded-full px-4 py-1.5 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Inclusive workplaces for all
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-5">
            Find Your <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">Dream Jobs</span> And<br />
            plan your next future with us
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-9 leading-relaxed max-w-xl mx-auto">
            Connect with top employers and explore thousands of opportunities tailored to your skills and career goals. Start your journey toward a brighter future today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white text-sm font-semibold shadow-md shadow-violet-500/25 transition-all">
              <Download className="w-4 h-4" /> Get Started
            </Link>
            <Link href="/jobs" className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <PlayCircle className="w-4 h-4" /> Learn More
            </Link>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -left-6 top-8 hidden md:flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 rotate-[-6deg] border border-slate-100 dark:border-slate-800">
            <span className="text-lg">💰</span>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">+140</p>
              <p className="text-[10px] text-slate-400">New Jobs</p>
            </div>
          </div>
          <div className="absolute -right-4 top-2 hidden md:flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 rotate-[5deg] border border-slate-100 dark:border-slate-800">
            <span className="text-lg">🎉</span>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">+100</p>
              <p className="text-[10px] text-slate-400">Hired Today</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-violet-900/10 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">Good Morning, Alexander</p>
                <p className="text-xs text-slate-400">Here's what's happening with your search</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5" /> Search jobs...
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[["+140", "Total Applicants"], ["+100", "Total Interviewed"], ["+20", "Total Job Offers"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-violet-50 dark:bg-violet-950/40 p-3">
                  <p className="text-lg font-extrabold text-violet-600 dark:text-violet-400">{n}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">Recommended Jobs</p>
              {[["Google", "Lead UI/UX Designer", "$70K–$90K"], ["Dribbble", "Product Designer", "$90K–$100K"]].map(([co, title, pay]) => (
                <div key={title} className="flex items-center gap-3 py-2 border-t border-slate-200/70 dark:border-slate-700/60 first:border-t-0">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0">{co[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{title}</p>
                    <p className="text-[10px] text-slate-400">{co} · {pay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies Hiring */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-7 px-1">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Top Companies Hiring</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Industry leaders with open remote positions</p>
          </div>
          <Link href="/companies" className="text-sm font-medium text-violet-500 hover:underline whitespace-nowrap">View all →</Link>
        </div>
        <CompanyMarquee />
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">How it works</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Getting started is quick, easy, and completely hassle-free. Just follow three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-2xl text-white mb-5">
                {s.icon}
              </div>
              <span className="absolute top-5 right-6 text-3xl font-extrabold text-slate-100 dark:text-slate-800">0{i + 1}</span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">Why choose us</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">What Makes Us Different</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Everything you need to land your next remote role, built into one seamless experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-6 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">Featured jobs</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">Top Featured Jobs</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Explore the best opportunities available today across the most promising paths, industries, and careers.</p>
        </div>
        {featured.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {(featured as any[]).map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
            </div>
            <div className="text-center">
              <Link href="/jobs" className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white text-sm font-semibold shadow-md shadow-violet-500/25 transition-all">
                View More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-4">💼</div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Jobs loading...</p>
            <p className="text-sm">Check back in a moment or browse all jobs</p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Browse by Category</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Explore jobs across all industries</p>
            </div>
            <Link href="/categories" className="text-sm font-medium text-violet-500 hover:underline whitespace-nowrap">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight">{cat.name}</span>
                <span className="text-[10px] text-slate-400">{cat.count.toLocaleString()} jobs</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Built for job seekers & employers */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">Built for job</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">Built for Job Seekers &amp; Employers</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Discovering the most promising paths, industries, and careers that are growing right now.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 p-8">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-5">
              <Bell className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Real Time Alerts</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Stay updated with real-time alerts that instantly notify you when opportunities matching your skills, preferences, and career goals go live.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 p-8">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-5">
              <MousePointerClick className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Smart Job Search</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Find the right opportunities faster with intelligent job matching and a personalized search experience built around your profile.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 p-8">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-5">
              <Radar className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Search Company Reviews</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Research and explore company reviews to gain real insights from employees and job seekers who've experienced the culture firsthand.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 p-8">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">One-Click Apply</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Submit applications instantly without dealing with lengthy forms — apply with one seamless click and get discovered faster.</p>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      {latest.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Latest Opportunities</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fresh listings added in the last 24 hours</p>
            </div>
            <Link href="/jobs" className="text-sm font-medium text-violet-500 hover:underline whitespace-nowrap">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(latest as any[]).map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">Testimonial</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">What Our Users Say</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Join thousands of happy job seekers who have already transformed their careers through our platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">FAQ</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">Have questions about how our platform works? You're not alone — here are clear answers.</p>
        </div>
        <FAQAccordion />
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-violet-500 rounded-[2rem] py-16 px-8 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%)]" />
            <p className="relative text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">Let's find your dream job</p>
            <h2 className="relative text-3xl font-extrabold text-white mb-3">Take the next big step in<br />your career today</h2>
            <p className="relative text-white/80 mb-8 text-sm max-w-md mx-auto">Discover thousands of opportunities that match your skills and career goals, and move your career quickly.</p>
            <form className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 px-5 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
