import { createClient } from '@supabase/supabase-js';

// For development, we'll use environment variables
// You can get these from your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          type: 'individual' | 'company';
          profile: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          type: 'individual' | 'company';
          profile?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          type?: 'individual' | 'company';
          profile?: Record<string, unknown>;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          company_id: string;
          title: string;
          description: string;
          requirements: string[];
          technologies: string[];
          location: string;
          country: string;
          salary_min: number;
          salary_max: number;
          currency: string;
          type: 'full-time' | 'part-time' | 'contract' | 'internship';
          remote: boolean;
          visa_sponsorship: boolean;
          experience_level: 'junior' | 'mid' | 'senior' | 'lead';
          benefits: string[];
          status: 'active' | 'paused' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          title: string;
          description: string;
          requirements?: string[];
          technologies?: string[];
          location: string;
          country: string;
          salary_min?: number;
          salary_max?: number;
          currency?: string;
          type?: 'full-time' | 'part-time' | 'contract' | 'internship';
          remote?: boolean;
          visa_sponsorship?: boolean;
          experience_level?: 'junior' | 'mid' | 'senior' | 'lead';
          benefits?: string[];
          status?: 'active' | 'paused' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          title?: string;
          description?: string;
          requirements?: string[];
          technologies?: string[];
          location?: string;
          country?: string;
          salary_min?: number;
          salary_max?: number;
          currency?: string;
          type?: 'full-time' | 'part-time' | 'contract' | 'internship';
          remote?: boolean;
          visa_sponsorship?: boolean;
          experience_level?: 'junior' | 'mid' | 'senior' | 'lead';
          benefits?: string[];
          status?: 'active' | 'paused' | 'closed';
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          user_id: string;
          job_id: string;
          status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
          cover_letter?: string;
          cv_data?: Record<string, unknown>;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          job_id: string;
          status?: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
          cover_letter?: string;
          cv_data?: Record<string, unknown>;
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          job_id?: string;
          status?: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
          cover_letter?: string;
          cv_data?: Record<string, unknown>;
          updated_at?: string;
        };
      };
      company_follows: {
        Row: {
          id: string;
          user_id: string;
          company_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// SQL schema for setting up the database
export const databaseSchema = `
-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text not null,
  type text not null check (type in ('individual', 'company')),
  profile jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;

-- Policy for users to read their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Policy for users to update their own data
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Jobs table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  requirements text[] default array[]::text[],
  technologies text[] default array[]::text[],
  location text not null,
  country text not null,
  salary_min integer,
  salary_max integer,
  currency text default 'EUR',
  type text default 'full-time' check (type in ('full-time', 'part-time', 'contract', 'internship')),
  remote boolean default false,
  visa_sponsorship boolean default false,
  experience_level text default 'mid' check (experience_level in ('junior', 'mid', 'senior', 'lead')),
  benefits text[] default array[]::text[],
  status text default 'active' check (status in ('active', 'paused', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for jobs
alter table public.jobs enable row level security;

-- Policy for anyone to read active jobs
create policy "Anyone can view active jobs" on public.jobs
  for select using (status = 'active');

-- Policy for companies to manage their own jobs
create policy "Companies can manage own jobs" on public.jobs
  for all using (company_id = auth.uid());

-- Applications table
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'reviewing', 'interview', 'offer', 'rejected')),
  cover_letter text,
  cv_data jsonb,
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, job_id)
);

-- Enable RLS for applications
alter table public.applications enable row level security;

-- Policy for users to view their own applications
create policy "Users can view own applications" on public.applications
  for select using (user_id = auth.uid());

-- Policy for users to create applications
create policy "Users can create applications" on public.applications
  for insert with check (user_id = auth.uid());

-- Policy for companies to view applications for their jobs
create policy "Companies can view applications for their jobs" on public.applications
  for select using (
    exists (
      select 1 from public.jobs 
      where jobs.id = applications.job_id 
      and jobs.company_id = auth.uid()
    )
  );

-- Company follows table
create table public.company_follows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  company_id uuid references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, company_id)
);

-- Enable RLS for company follows
alter table public.company_follows enable row level security;

-- Policy for users to manage their own follows
create policy "Users can manage own follows" on public.company_follows
  for all using (user_id = auth.uid());

-- Functions for updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_users_updated_at before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_jobs_updated_at before update on public.jobs
  for each row execute procedure public.handle_updated_at();

create trigger handle_applications_updated_at before update on public.applications
  for each row execute procedure public.handle_updated_at();

-- Insert some sample data
-- (This would be done through the admin panel or migration scripts)
`;