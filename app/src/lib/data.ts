// Mock data for the first draft. Replaced by the backend later.

export type Mode = 'Date' | 'Friends';

export type Person = {
  id: string;
  name: string;
  age: number;
  what: string; // sport and place
  note: string; // their one line
  song: string;
  mode: Mode;
  likesYou: boolean; // demo: a "yes" from you makes a match
  tones: [string, string][]; // placeholder photo gradients until real photos exist
};

export const people: Person[] = [
  { id: 'ava', name: 'Ava', age: 23, what: 'Track, USC', note: 'Four hundred meters and a long breakfast after.', song: '“Pink + White” by Frank Ocean', mode: 'Date', likesYou: true,
    tones: [['#3A2A22', '#0F0C0A'], ['#2A3440', '#0C0F12'], ['#40302A', '#120D0B']] },
  { id: 'marco', name: 'Marco', age: 26, what: 'Water polo, pro', note: 'Back from Barcelona in January.', song: '“Nikes” by Frank Ocean', mode: 'Date', likesYou: false,
    tones: [['#1F3442', '#0A1014'], ['#2E3A3F', '#0D1012'], ['#22303A', '#0B0F12']] },
  { id: 'june', name: 'June', age: 24, what: 'Surf, Malibu', note: 'Dawn patrol. You bring the coffee.', song: '“Dreams” by Fleetwood Mac', mode: 'Date', likesYou: true,
    tones: [['#2B3B44', '#0B1013'], ['#3E3A30', '#11100D'], ['#24343C', '#0A0E10']] },
  { id: 'sol', name: 'Sol', age: 27, what: 'Volleyball, Olympian', note: 'Manhattan Beach most weekends.', song: '“Sunday Morning” by The Velvet Underground', mode: 'Date', likesYou: false,
    tones: [['#43352A', '#120E0B'], ['#38302A', '#100D0B'], ['#2F2A26', '#0E0C0B']] },
  { id: 'theo', name: 'Theo', age: 25, what: 'Skate, Venice', note: 'Looking for a crew for early sessions.', song: '“Nangs” by Tame Impala', mode: 'Friends', likesYou: true,
    tones: [['#2D2D2A', '#0D0D0C'], ['#33302B', '#0F0E0C'], ['#2A2C2E', '#0C0D0E']] },
  { id: 'nia', name: 'Nia', age: 22, what: 'Soccer, UCLA', note: 'Pickup Sundays. Need a keeper.', song: '“Location” by Khalid', mode: 'Friends', likesYou: false,
    tones: [['#25352A', '#0B0F0C'], ['#2E3A2F', '#0D100D'], ['#28302A', '#0C0E0C']] },
  { id: 'cole', name: 'Cole', age: 28, what: 'Climbing, coach', note: 'Running a Thursday session in Arts District.', song: '“Holocene” by Bon Iver', mode: 'Friends', likesYou: true,
    tones: [['#3A332C', '#100E0C'], ['#2C2A28', '#0D0C0B'], ['#35302A', '#0F0D0B']] },
];

export type Message = { from: 'me' | 'them'; text: string };

export const openers: Record<string, string> = {
  ava: 'You run the 400 too? Respect.',
  june: 'Tomorrow, 6am, County Line?',
  theo: 'We skate the Venice bowl Saturdays. Come.',
  cole: 'Thursday, 7pm. Bring chalk.',
};

export const sportCategories = ['College athlete', 'Pro', 'Olympian', 'Surf', 'Skate', 'Fitness', 'Coach'] as const;
