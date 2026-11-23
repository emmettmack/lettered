// Places on a map. Searching and reverse lookup use OpenStreetMap's Nominatim for the demo.
// Production swaps this for a paid geocoder (Mapbox, Google or Apple) behind our own server.

export type GeoPlace = { name: string; lat: number; lng: number };

export const LA: GeoPlace = { name: 'Los Angeles, California', lat: 34.1, lng: -118.2 };

// Members are only ever placed at city level, never an exact spot.
export const coarse = (v: number) => Math.round(v * 10) / 10;

export const cityOf = (name: string) => name.split(',')[0];

type Addr = Record<string, string | undefined>;

function labelFrom(a: Addr | undefined, fallback: string): string {
  if (!a) return fallback;
  const city = a.city || a.town || a.village || a.municipality || a.hamlet || a.suburb || a.county;
  const region = a.country_code === 'us' ? a.state : a.state || a.country;
  if (city && region) return `${city}, ${region}`;
  return city || region || fallback;
}

const base = 'https://nominatim.openstreetmap.org';

export async function searchPlaces(q: string): Promise<GeoPlace[]> {
  const t = q.trim();
  if (t.length < 2) return [];
  const r = await fetch(`${base}/search?format=jsonv2&addressdetails=1&limit=5&q=${encodeURIComponent(t)}`, { headers: { Accept: 'application/json' } });
  if (!r.ok) return [];
  const rows = (await r.json()) as { lat: string; lon: string; display_name: string; address?: Addr }[];
  const seen = new Set<string>();
  const out: GeoPlace[] = [];
  for (const row of rows) {
    const name = labelFrom(row.address, row.display_name.split(',').slice(0, 2).join(','));
    if (seen.has(name)) continue;
    seen.add(name);
    out.push({ name, lat: coarse(parseFloat(row.lat)), lng: coarse(parseFloat(row.lon)) });
  }
  return out;
}

export async function reverse(lat: number, lng: number): Promise<GeoPlace> {
  const here = { lat: coarse(lat), lng: coarse(lng) };
  const fallback = `${here.lat.toFixed(1)}°, ${here.lng.toFixed(1)}°`;
  try {
    const r = await fetch(`${base}/reverse?format=jsonv2&zoom=10&addressdetails=1&lat=${lat}&lon=${lng}`, { headers: { Accept: 'application/json' } });
    if (!r.ok) return { name: fallback, ...here };
    const j = (await r.json()) as { address?: Addr };
    return { name: labelFrom(j.address, fallback), ...here };
  } catch {
    return { name: fallback, ...here };
  }
}
