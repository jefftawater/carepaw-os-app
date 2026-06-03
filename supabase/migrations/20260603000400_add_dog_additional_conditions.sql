-- Allow dog profiles to store optional additional condition keys.

alter table public.dogs
add column if not exists additional_conditions text[] not null default '{}';
