"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { count } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">My Profile</h1>

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-5 flex flex-col sm:flex-row gap-5 items-start"
      >
        <div className="w-20 h-20 rounded-full bg-violet-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
          {user.name[0]}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-0.5">{user.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{user.email}</p>
          <div className="flex flex-wrap gap-4">
            {[["🌍", user.country], ["📅", `Joined ${user.joined}`], ["❤️", `${count} saved jobs`]].map(([icon, val]) => (
              <span key={val} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                {icon} {val}
              </span>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm">Edit Profile</Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[["0", "Applications"], [String(count), "Saved Jobs"], ["0", "Interviews"]].map(([num, label]) => (
          <div key={label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center">
            <span className="block text-2xl font-bold text-violet-500">{num}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">{label}</span>
          </div>
        ))}
      </div>

      {/* Account settings */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">Account Details</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input defaultValue={user.name} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input defaultValue={user.email} type="email" />
            </div>
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Input defaultValue={user.country} />
            </div>
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">Preferences</h3>
          <div className="space-y-3 text-sm">
            {[["📧 Email alerts", "Receive job alerts by email"], ["🔔 Push notifications", "Browser push notifications"], ["📊 Weekly digest", "Weekly job summary email"]].map(([label, desc]) => (
              <label key={label as string} className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-violet-500 w-4 h-4" />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Account Actions</h3>
        <div className="flex gap-3 flex-wrap">
          <Link href="/favorites">
            <Button variant="secondary" size="sm">❤️ My Favorites</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30">
            🚪 Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
