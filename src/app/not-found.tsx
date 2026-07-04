import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="text-8xl font-extrabold text-violet-500 leading-none mb-4">404</div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page not found</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild><Link href="/">Go home</Link></Button>
    </div>
  );
}
