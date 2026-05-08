-- Contact form submissions
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  company text,
  service text,
  message text,
  selected_plan text,
  selected_plan_price text
);

-- Assessment quiz leads
create table assessment_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  score integer,
  band text
);

-- Row level security (allow public inserts, block reads from browser)
alter table contact_submissions enable row level security;
alter table assessment_leads enable row level security;

create policy "Allow insert" on contact_submissions for insert with check (true);
create policy "Allow insert" on assessment_leads for insert with check (true);
