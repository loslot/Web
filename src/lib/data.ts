import type { Category, Company } from "@/types";

export const CATEGORIES: Category[] = [
  { name: "Software Dev", icon: "💻", count: 2840 },
  { name: "Design", icon: "🎨", count: 623 },
  { name: "Marketing", icon: "📣", count: 891 },
  { name: "Finance", icon: "💰", count: 445 },
  { name: "Customer Support", icon: "🎧", count: 734 },
  { name: "Sales", icon: "📈", count: 556 },
  { name: "Product", icon: "🧩", count: 318 },
  { name: "HR", icon: "👥", count: 227 },
  { name: "Data Science", icon: "📊", count: 512 },
  { name: "DevOps", icon: "⚙️", count: 389 },
  { name: "Writing", icon: "✍️", count: 201 },
  { name: "Legal", icon: "⚖️", count: 143 },
];

export const COMPANIES: Company[] = [
  { name: "Stripe", color: "#635BFF", jobs: 24, logo: "S" },
  { name: "Notion", color: "#000000", jobs: 18, logo: "N" },
  { name: "Linear", color: "#5E6AD2", jobs: 12, logo: "L" },
  { name: "Vercel", color: "#000000", jobs: 31, logo: "V" },
  { name: "Figma", color: "#F24E1E", jobs: 15, logo: "F" },
  { name: "GitHub", color: "#24292e", jobs: 42, logo: "G" },
  { name: "Shopify", color: "#96BF48", jobs: 28, logo: "Sh" },
  { name: "Atlassian", color: "#0052CC", jobs: 19, logo: "A" },
];

export const FEATURES = [
  { icon: "🔍", title: "Smart search", desc: "Find the perfect job with powerful filters by category, type, and location." },
  { icon: "🔔", title: "Job alerts", desc: "Get notified immediately when new jobs matching your skills are posted." },
  { icon: "✅", title: "Easy apply", desc: "One-click apply to jobs and track your applications effortlessly." },
  { icon: "📱", title: "Responsive design", desc: "Browse and save jobs on any device, anywhere, anytime." },
  { icon: "❤️", title: "Save favorites", desc: "Bookmark jobs and revisit them whenever you're ready to apply." },
];

export const FAQS = [
  { q: "How do I apply for a job?", a: "Click on any job listing to view full details, then click the 'Apply now' button which takes you directly to the company's application page." },
  { q: "Is JobZ free to use?", a: "Yes! Browsing, searching, and applying to jobs on JobZ is completely free for job seekers. Create an account to unlock additional features like saving favorites." },
  { q: "How often are jobs updated?", a: "We pull new listings from Remotive API multiple times daily. Most jobs appear within hours of being posted by companies." },
  { q: "Can I save jobs to apply later?", a: "Yes — create a free account and use the bookmark button on any job card to save it to your Favorites for later review." },
];

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Software Dev": "software-dev",
  "Design": "design",
  "Marketing": "marketing",
  "Finance": "finance",
  "Customer Support": "customer-support",
  "Sales": "sales",
  "Product": "product",
  "HR": "hr",
  "Data Science": "data-science",
  "DevOps": "devops",
  "Writing": "writing",
  "Legal": "legal",
};

export async function fetchJobs(category?: string, search?: string) {
  try {
    let url = "https://remotive.com/api/remote-jobs?limit=20";
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.jobs ?? [];
  } catch {
    return [];
  }
}
