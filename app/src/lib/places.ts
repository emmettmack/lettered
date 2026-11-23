import type { GeoPlace } from './geo';

// Suggested places for the list. Anywhere else is one tap away: "Set an address or pin".
type Suggest = GeoPlace & { keys: string };

export const suggested: Suggest[] = [
  { name: 'Los Angeles, California', lat: 34.1, lng: -118.2, keys: 'la usc ucla' },
  { name: 'Bloomington, Indiana', lat: 39.2, lng: -86.5, keys: 'iu hoosiers' },
  { name: 'State College, Pennsylvania', lat: 40.8, lng: -77.9, keys: 'penn state psu nittany' },
  { name: 'Eugene, Oregon', lat: 44.1, lng: -123.1, keys: 'ducks hayward' },
  { name: 'Austin, Texas', lat: 30.3, lng: -97.7, keys: 'longhorns ut' },
  { name: 'Boulder, Colorado', lat: 40.0, lng: -105.3, keys: 'buffs' },
  { name: 'Columbus, Ohio', lat: 40.0, lng: -83.0, keys: 'ohio state buckeyes' },
  { name: 'Ann Arbor, Michigan', lat: 42.3, lng: -83.7, keys: 'wolverines' },
  { name: 'Durham, North Carolina', lat: 36.0, lng: -78.9, keys: 'duke' },
  { name: 'Gainesville, Florida', lat: 29.7, lng: -82.3, keys: 'gators uf' },
  { name: 'Tuscaloosa, Alabama', lat: 33.2, lng: -87.6, keys: 'crimson tide' },
  { name: 'Palo Alto, California', lat: 37.4, lng: -122.1, keys: 'stanford cardinal' },
  { name: 'San Diego, California', lat: 32.7, lng: -117.2, keys: 'surf' },
  { name: 'Honolulu, Hawaii', lat: 21.3, lng: -157.9, keys: 'oahu surf' },
  { name: 'Miami, Florida', lat: 25.8, lng: -80.2, keys: '' },
  { name: 'New York, New York', lat: 40.7, lng: -74.0, keys: 'nyc' },
  { name: 'Chicago, Illinois', lat: 41.9, lng: -87.6, keys: '' },
  { name: 'Seattle, Washington', lat: 47.6, lng: -122.3, keys: '' },
];

// One edit apart counts as a match, so "pen state" still finds Penn State.
function within1(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

const tokenMatches = (t: string, words: string[]) => words.some((w) => w.startsWith(t) || (t.length >= 3 && within1(t, w.slice(0, t.length + 1))));

export function filterSuggested(q: string): GeoPlace[] {
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const all = suggested.map(({ keys: _k, ...p }) => p);
  if (tokens.length === 0) return all;
  return suggested
    .filter((p) => {
      const words = `${p.name} ${p.keys}`.toLowerCase().replace(/,/g, '').split(/\s+/);
      return tokens.every((t) => tokenMatches(t, words));
    })
    .map(({ keys: _k, ...p }) => p);
}
