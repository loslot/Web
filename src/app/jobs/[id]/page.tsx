import { fetchJobs } from "@/lib/data";
import JobDetailClient from "./JobDetailClient";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = await fetchJobs();
  const job = jobs.find((j: any) => String(j.id) === id);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
