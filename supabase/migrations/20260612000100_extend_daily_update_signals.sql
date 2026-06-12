-- Allow the expanded daily update form signals without changing existing rows.

alter table public.condition_updates
drop constraint if exists condition_updates_signal_check;

alter table public.condition_updates
add constraint condition_updates_signal_check check (
  signal in (
    'About the same',
    'A little worse',
    'More uncomfortable',
    'More restless',
    'Bathroom changes',
    'about_the_same',
    'a_little_worse',
    'better_than_usual',
    'mental_stimulation_helped',
    'more_restless',
    'lower_energy',
    'appetite_changed',
    'bathroom_normal',
    'bathroom_changes',
    'bathroom_accident',
    'comfort_stable',
    'more_uncomfortable',
    'skin_checked_clear',
    'skin_concern',
    'hygiene_moisture_concern',
    'mobility_supported',
    'mobility_more_difficult',
    'needed_more_help_moving',
    'traction_trouble',
    'routine_completed',
    'routine_missed',
    'home_setup_helped',
    'home_setup_needs_attention'
  )
);
