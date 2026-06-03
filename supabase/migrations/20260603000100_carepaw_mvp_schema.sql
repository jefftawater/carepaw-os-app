-- CarePaw OS MVP schema.
-- Run this in your Supabase project before switching the UI from mock storage.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dogs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  condition text,
  mobility_notes text,
  current_focus text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.condition_updates (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid not null references public.dogs(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  signal text not null,
  note text not null default '',
  created_at timestamptz not null default now(),
  constraint condition_updates_signal_check check (
    signal in (
      'About the same',
      'A little worse',
      'More uncomfortable',
      'More restless',
      'Bathroom changes'
    )
  )
);

create index if not exists dogs_owner_id_idx
  on public.dogs(owner_id);

create index if not exists condition_updates_owner_created_at_idx
  on public.condition_updates(owner_id, created_at desc);

create index if not exists condition_updates_dog_created_at_idx
  on public.condition_updates(dog_id, created_at desc);

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.dogs to authenticated;
grant select, insert, update, delete on public.condition_updates to authenticated;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_dogs_updated_at on public.dogs;
create trigger set_dogs_updated_at
before update on public.dogs
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.dogs enable row level security;
alter table public.condition_updates enable row level security;

drop policy if exists "Users can select their own profile" on public.profiles;
create policy "Users can select their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users can select their own dogs" on public.dogs;
create policy "Users can select their own dogs"
on public.dogs
for select
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "Users can insert their own dogs" on public.dogs;
create policy "Users can insert their own dogs"
on public.dogs
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "Users can update their own dogs" on public.dogs;
create policy "Users can update their own dogs"
on public.dogs
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "Users can delete their own dogs" on public.dogs;
create policy "Users can delete their own dogs"
on public.dogs
for delete
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "Users can select their own condition updates" on public.condition_updates;
create policy "Users can select their own condition updates"
on public.condition_updates
for select
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "Users can insert condition updates for their dogs" on public.condition_updates;
create policy "Users can insert condition updates for their dogs"
on public.condition_updates
for insert
to authenticated
with check (
  (select auth.uid()) = owner_id
  and exists (
    select 1
    from public.dogs
    where dogs.id = condition_updates.dog_id
      and dogs.owner_id = (select auth.uid())
  )
);

drop policy if exists "Users can update their own condition updates" on public.condition_updates;
create policy "Users can update their own condition updates"
on public.condition_updates
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check (
  (select auth.uid()) = owner_id
  and exists (
    select 1
    from public.dogs
    where dogs.id = condition_updates.dog_id
      and dogs.owner_id = (select auth.uid())
  )
);

drop policy if exists "Users can delete their own condition updates" on public.condition_updates;
create policy "Users can delete their own condition updates"
on public.condition_updates
for delete
to authenticated
using ((select auth.uid()) = owner_id);
