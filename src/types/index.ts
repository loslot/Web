export interface Job {
  id: number;
  title: string;
  company_name: string;
  company_logo: string;
  job_type: string;
  candidate_required_location: string;
  salary: string;
  publication_date: string;
  category: string;
  url: string;
  description: string;
  tags: string[];
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export interface Company {
  name: string;
  color: string;
  jobs: number;
  logo: string;
}
