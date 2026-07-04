import { fetchJobs, CATEGORIES } from "@/lib/data";
import JobsClientPage from "./JobsClient";

export const revalidate = 1800;

interface Props {
  searchParams: Promise<{ search?: string; category?: string; type?: string; page?: string }>;
}

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const type = params.type || "";
  const page = parseInt(params.page || "1");

  const allJobs = await fetchJobs(category || undefined, search || undefined);

  const filtered = allJobs.filter((j: any) => {
    if (type && j.job_type && !j.job_type.toLowerCase().includes(type.toLowerCase())) return false;
    return true;
  });

  const perPage = 12;
  const totalPages = Math.ceil(filtered.length / perPage);
  const jobs = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <JobsClientPage
      jobs={jobs}
      totalJobs={filtered.length}
      currentPage={page}
      totalPages={totalPages}
      initialSearch={search}
      initialCategory={category}
      initialType={type}
    />
  );
}
