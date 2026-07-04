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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: authRegister } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    authRegister(`${data.firstName} ${data.lastName}`, data.email);
    showToast("Account created! Welcome to JobZ 🎉", "🎉");
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
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Create your account</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Join thousands of job seekers finding remote work</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Alex" {...register("firstName")} />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Johnson" {...register("lastName")} />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Min. 8 characters" {...register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" placeholder="Repeat your password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <label className="flex items-start gap-2 text-sm text-slate-500 cursor-pointer">
              <input type="checkbox" {...register("terms")} className="accent-violet-500 mt-0.5" />
              <span>I agree to the <span className="text-violet-500 hover:underline">Terms of Service</span> and <span className="text-violet-500 hover:underline">Privacy Policy</span></span>
            </label>
            {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>}
          </div>
          <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-slate-200 dark:border-slate-800" />
          <span className="text-xs text-slate-400">or continue with</span>
          <hr className="flex-1 border-slate-200 dark:border-slate-800" />
        </div>

        <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
          🌐 Continue with Google
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-500 hover:underline font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
