import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold text-violet-500 mb-3">
              Job<span className="text-slate-800 dark:text-slate-100">Z</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Find your dream job anywhere, anytime. Browse thousands of remote opportunities from companies building the future.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Browse</h4>
            <div className="flex flex-col gap-2">
              {[["All Jobs", "/jobs"], ["Categories", "/categories"], ["Companies", "/companies"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Account</h4>
            <div className="flex flex-col gap-2">
              {[["Sign in", "/login"], ["Register", "/register"], ["Favorites", "/favorites"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              {[["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "#"]].map(([label, href]) => (
                <Link key={label} href={href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-400">© 2024 JobZ. All rights reserved.</span>
          <span className="text-xs text-slate-400">Made with ❤️ for remote job seekers</span>
        </div>
      </div>
    </footer>
  );
}
