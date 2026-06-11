-- Create profiles automatically for new auth users and backfill missing profiles.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    email,
    display_name,
    created_at,
    updated_at
  )
  values (
    new.id,
    new.email,
    null,
    now(),
    now()
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

insert into public.profiles (
  id,
  email,
  display_name,
  created_at,
  updated_at
)
select
  users.id,
  users.email,
  null,
  now(),
  now()
from auth.users as users
on conflict (id) do nothing;
