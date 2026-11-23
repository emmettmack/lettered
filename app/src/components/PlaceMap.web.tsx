import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

type Props = { center: { lat: number; lng: number }; onPick: (lat: number, lng: number) => void };

// Web demo map. OpenStreetMap tiles, darkened with a CSS filter to match the brand.
// Fine for a demo. Production needs a paid tile provider (MapTiler, Mapbox) because OSM's public tiles are for light use.
if (typeof document !== 'undefined' && !document.getElementById('lettered-map-dark')) {
  const st = document.createElement('style');
  st.id = 'lettered-map-dark';
  st.textContent = `
    .lettered-map .leaflet-tile-pane{filter:invert(1) hue-rotate(180deg) saturate(.25) brightness(.78) contrast(.92)}
    .lettered-map .leaflet-container{background:#0C0C0B;font-family:inherit}
    .lettered-map .leaflet-control-attribution{background:rgba(12,12,11,.7)!important;color:#8C8980!important;font-size:10px}
    .lettered-map .leaflet-control-attribution a{color:#8C8980!important}`;
  document.head.appendChild(st);
}

export function PlaceMap({ center, onPick }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const pin = useRef<L.Marker | null>(null);
  const pick = useRef(onPick);
  pick.current = onPick;

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, attributionControl: true }).setView([center.lat, center.lng], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 12,
      attribution: '© OpenStreetMap',
    }).addTo(m);
    const icon = L.divIcon({
      className: '',
      html: '<div style="width:18px;height:18px;border-radius:50%;background:#E2412D;box-shadow:0 0 0 6px rgba(226,65,45,0.28),0 2px 10px rgba(0,0,0,0.5)"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    const p = L.marker([center.lat, center.lng], { icon, draggable: true }).addTo(m);
    p.on('dragend', () => { const c = p.getLatLng(); pick.current(c.lat, c.lng); });
    m.on('click', (e: L.LeafletMouseEvent) => pick.current(e.latlng.lat, e.latlng.lng));
    map.current = m;
    pin.current = p;
    return () => { m.remove(); map.current = null; pin.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current, p = pin.current;
    if (!m || !p) return;
    p.setLatLng([center.lat, center.lng]);
    if (!m.getBounds().pad(-0.25).contains([center.lat, center.lng])) m.setView([center.lat, center.lng], Math.max(m.getZoom(), 7), { animate: false });
  }, [center.lat, center.lng]);

  return <div className="lettered-map" style={{ position: 'absolute', inset: 0 }}><div ref={el} style={{ position: 'absolute', inset: 0, background: '#0C0C0B' }} /></div>;
}
