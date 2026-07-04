"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, Search, Briefcase, Menu, X, Heart, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/categories", label: "Categories" },
  { href: "/companies", label: "Companies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count } = useFavorites();
  const { user, logout } = useAuth();

  useEffect(() => setMounted(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-6 whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">J</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Job<span className="text-violet-500">Z</span></span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1 bg-slate-100/70 dark:bg-slate-800/60 rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap",
                  pathname === link.href
                    ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search button */}
            <Link
              href="/jobs"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-sm hover:border-violet-400 transition-colors w-44"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Search jobs...</span>
            </Link>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Auth area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold hover:bg-violet-600 transition-colors"
                >
                  {user.name[0]}
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg mx-1">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link href="/favorites" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg mx-1">
                        <Heart className="w-4 h-4" /> Favorites {count > 0 && <span className="ml-auto bg-violet-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
                      </Link>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2 my-1" />
                      <button onClick={() => { logout(); setDropdownOpen(false); }} className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors rounded-lg mx-1">
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    pathname === link.href
                      ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 flex gap-2">
                {user ? (
                  <button onClick={logout} className="flex-1 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 text-sm font-medium">Sign out</button>
                ) : (
                  <>
                    <Link href="/login" className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-sm font-medium text-slate-700 dark:text-slate-300">Sign in</Link>
                    <Link href="/register" className="flex-1 py-2.5 rounded-xl bg-violet-500 text-center text-sm font-medium text-white">Get started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex justify-around py-2">
          {[
            { href: "/", icon: "🏠", label: "Home" },
            { href: "/jobs", icon: "💼", label: "Jobs" },
            { href: "/categories", icon: "📂", label: "Categories" },
            { href: "/favorites", icon: "❤️", label: "Saved" },
            { href: user ? "/profile" : "/login", icon: "👤", label: user ? "Profile" : "Login" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium transition-colors",
                pathname === item.href ? "text-violet-500" : "text-slate-400"
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
