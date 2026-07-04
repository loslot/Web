"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/hooks/useToast";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "alex@email.com", password: "password123" },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    login("Alex Johnson", data.email);
    showToast("Welcome back, Alex! 👋", "👋");
    router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold text-violet-500 mb-2">
            Job<span className="text-slate-800 dark:text-slate-100">Z</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
              <input type="checkbox" {...register("remember")} className="accent-violet-500" />
              Remember me
            </label>
            <button type="button" className="text-sm text-violet-500 hover:underline">Forgot password?</button>
          </div>
          <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-slate-200 dark:border-slate-800" />
          <span className="text-xs text-slate-400">or continue with</span>
          <hr className="flex-1 border-slate-200 dark:border-slate-800" />
        </div>

        <button
          onClick={() => { login(); showToast("Welcome back! 👋", "👋"); router.push("/"); }}
          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all flex items-center justify-center gap-2"
        >
          🌐 Continue with Google
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-violet-500 hover:underline font-medium">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
