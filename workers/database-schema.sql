-- Cloudflare D1 Database Schema for Tunel Platform
-- This file contains the SQL schema for user authentication and management

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('individual', 'company', 'recruiter')),
  password_hash TEXT NOT NULL,
  profile TEXT NOT NULL DEFAULT '{}', -- JSON string for flexible profile data
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(type);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- User sessions table for active login tracking (optional)
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON user_sessions(expires_at);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Email verification tokens table
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON email_verification_tokens(user_id);

-- Jobs table (for future expansion)
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT DEFAULT '[]', -- JSON array
  technologies TEXT DEFAULT '[]', -- JSON array
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'EUR',
  type TEXT DEFAULT 'full-time' CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  remote BOOLEAN DEFAULT FALSE,
  visa_sponsorship BOOLEAN DEFAULT FALSE,
  experience_level TEXT DEFAULT 'mid' CHECK (experience_level IN ('junior', 'mid', 'senior', 'lead')),
  benefits TEXT DEFAULT '[]', -- JSON array
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_country ON jobs(country);
CREATE INDEX IF NOT EXISTS idx_jobs_visa_sponsorship ON jobs(visa_sponsorship);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'offer', 'rejected')),
  cover_letter TEXT,
  cv_data TEXT, -- JSON string
  applied_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE(user_id, job_id) -- Prevent duplicate applications
);

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);

-- Company follows table (for job seekers to follow companies)
CREATE TABLE IF NOT EXISTS company_follows (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  company_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, company_id) -- Prevent duplicate follows
);

CREATE INDEX IF NOT EXISTS idx_follows_user_id ON company_follows(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_company_id ON company_follows(company_id);

-- Insert some sample data for testing (optional)
-- This will be populated by the application during development

-- Sample individual user
INSERT OR REPLACE INTO users (
  id, email, name, type, password_hash, profile, created_at, updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'demo@example.com',
  'Demo User',
  'individual',
  'demo_hash_here', -- In real app, this would be properly hashed
  '{"firstName": "Demo", "lastName": "User", "location": "Istanbul, Turkey", "bio": "Software Developer", "skills": ["JavaScript", "React", "Node.js"]}',
  datetime('now'),
  datetime('now')
);

-- Sample company user
INSERT OR REPLACE INTO users (
  id, email, name, type, password_hash, profile, created_at, updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'company@example.com',
  'Demo Company',
  'company',
  'demo_hash_here',
  '{"description": "Leading tech company", "website": "https://example.com", "industry": "Technology", "size": "100-500", "location": "Amsterdam, Netherlands"}',
  datetime('now'),
  datetime('now')
);

-- Sample recruiter user
INSERT OR REPLACE INTO users (
  id, email, name, type, password_hash, profile, created_at, updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  'recruiter@example.com',
  'Demo Recruiter',
  'recruiter',
  'demo_hash_here',
  '{"firstName": "Demo", "lastName": "Recruiter", "company": "TechTalent Agency", "location": "Berlin, Germany", "specialties": ["Frontend", "Backend"], "languages": ["Turkish", "English", "German"]}',
  datetime('now'),
  datetime('now')
);