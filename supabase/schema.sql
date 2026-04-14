-- Create Users Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  national_id_url TEXT,
  face_image_url TEXT,
  role TEXT CHECK (role IN ('citizen', 'company', 'admin')) DEFAULT 'citizen',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Cases Table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  case_type TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'investigating', 'resolved', 'escalated')) DEFAULT 'pending',
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  assigned_consultant UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Companies Table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  service_type TEXT NOT NULL
);

-- Simple Mock Authentication triggers (In a real app, integrate with auth.users)
-- Add RLS Policies (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow read access to cases for the user who created them
CREATE POLICY "Users can view their own cases" ON public.cases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create cases" ON public.cases
  FOR INSERT WITH CHECK (auth.uid() = user_id);
