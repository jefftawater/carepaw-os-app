-- Allow all Care category pages to log focused care actions.

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
    'mental_stimulation_helped',
    'more_restless',
    'bathroom_normal',
    'bathroom_changes',
    'comfort_stable',
    'more_uncomfortable',
    'skin_checked_clear',
    'skin_concern',
    'mobility_supported',
    'mobility_more_difficult',
    'routine_completed',
    'routine_missed'
  )
);
