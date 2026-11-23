import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { PlaceMap } from '@/components/PlaceMap';
import { Button, tap } from '@/components/ui';
import { LA, reverse, searchPlaces, type GeoPlace } from '@/lib/geo';
import { filterSuggested } from '@/lib/places';
import { color, font } from '@/lib/theme';

/**
 * A list first. "Set an address or pin" opens the map, where you can search anywhere or drop a pin.
 * Saved at city level only.
 */
export function PlacePicker({ start, onDone, cta = 'Use', current }: { start?: GeoPlace; onDone: (p: GeoPlace) => void; cta?: string; current?: string }) {
  const [mode, setMode] = useState<'list' | 'map'>('list');
  const [seed, setSeed] = useState('');
  if (mode === 'map') return <MapPicker start={start} seed={seed} onBack={() => setMode('list')} onDone={onDone} cta={cta} />;
  return <ListPicker current={current ?? start?.name} onDone={onDone} onMap={(q) => { setSeed(q); setMode('map'); }} />;
}

function ListPicker({ current, onDone, onMap }: { current?: string; onDone: (p: GeoPlace) => void; onMap: (q: string) => void }) {
  const [q, setQ] = useState('');
  const results = filterSuggested(q);
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={q}
        onChangeText={setQ}
        autoCorrect={false}
        placeholder="Search"
        placeholderTextColor={color.smoke}
        style={{ fontFamily: font.sans, fontSize: 20, color: color.bone, borderBottomWidth: 1, borderBottomColor: color.night3, paddingVertical: 12 }}
      />
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" onPress={() => { tap(); onMap(q); }} style={({ pressed }) => ({ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: pressed ? 0.6 : 1 })}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: font.serif, fontSize: 26, color: color.torch }}>{q.trim() && results.length === 0 ? `Find “${q.trim()}” on the map` : 'Set an address or pin'}</Text>
            <Text style={{ fontFamily: font.sans, fontSize: 13, color: color.ash, marginTop: 3 }}>Search anywhere, or drop a pin on the map.</Text>
          </View>
          <Text style={{ fontFamily: font.sans, fontSize: 20, color: color.ash }}>›</Text>
        </Pressable>
        {results.map((p) => (
          <Pressable key={p.name} accessibilityRole="button" onPress={() => { tap(); onDone(p); }} style={({ pressed }) => ({ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: color.night3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: pressed ? 0.6 : 1 })}>
            <Text style={{ fontFamily: font.serif, fontSize: 24, color: color.bone, flex: 1 }}>{p.name}</Text>
            {current === p.name && <Text style={{ fontFamily: font.sans, fontSize: 13, color: color.ash }}>Current</Text>}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function MapPicker({ start, seed, onBack, onDone, cta }: { start?: GeoPlace; seed: string; onBack: () => void; onDone: (p: GeoPlace) => void; cta: string }) {
  const [picked, setPicked] = useState<GeoPlace>(start ?? LA);
  const [q, setQ] = useState(seed);
  const [results, setResults] = useState<GeoPlace[]>([]);
  const [busy, setBusy] = useState(false);
  const stamp = useRef(0);

  // search as you type
  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); return; }
    const n = ++stamp.current;
    const t = setTimeout(async () => {
      setBusy(true);
      const r = await searchPlaces(q).catch(() => []);
      if (n === stamp.current) { setResults(r); setBusy(false); }
    }, 450);
    return () => clearTimeout(t);
  }, [q]);

  // tapping or dragging the pin: move it now, name it a moment later
  const drop = (lat: number, lng: number) => {
    setPicked((p) => ({ ...p, lat, lng, name: 'Locating…' }));
    setResults([]);
    const n = ++stamp.current;
    reverse(lat, lng).then((r) => { if (n === stamp.current) setPicked(r); });
  };

  const choose = (p: GeoPlace) => { tap(); setPicked(p); setResults([]); setQ(''); stamp.current++; };

  return (
    <View style={{ flex: 1 }}>
      <Pressable accessibilityRole="button" onPress={() => { tap(); onBack(); }} hitSlop={8} style={{ alignSelf: 'flex-start', paddingBottom: 4 }}>
        <Text style={{ fontFamily: font.sans, fontSize: 14, color: color.ash }}>‹ List</Text>
      </Pressable>
      <View style={{ zIndex: 5 }}>
        <TextInput
          value={q}
          onChangeText={setQ}
          autoCorrect={false}
          placeholder="Search an address, city or venue"
          placeholderTextColor={color.smoke}
          style={{ fontFamily: font.sans, fontSize: 18, color: color.bone, borderBottomWidth: 1, borderBottomColor: color.night3, paddingVertical: 12 }}
        />
        {(results.length > 0 || busy) && (
          <View style={{ position: 'absolute', top: 52, left: 0, right: 0, backgroundColor: color.night2, borderRadius: 16, borderWidth: 1, borderColor: color.night3, overflow: 'hidden' }}>
            {busy && results.length === 0 && <ActivityIndicator color={color.ash} style={{ padding: 18 }} />}
            {results.map((r) => (
              <Pressable key={r.name} accessibilityRole="button" onPress={() => choose(r)} style={({ pressed }) => ({ paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: color.night3, opacity: pressed ? 0.6 : 1 })}>
                <Text style={{ fontFamily: font.serif, fontSize: 22, color: color.bone }}>{r.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={{ flex: 1, marginTop: 14, marginBottom: 14, borderRadius: 20, overflow: 'hidden', backgroundColor: color.night2 }}>
        <PlaceMap center={picked} onPick={drop} />
        <View pointerEvents="none" style={{ position: 'absolute', left: 14, bottom: 34, right: 14, zIndex: 1000 }}>
          <Text style={{ fontFamily: font.serif, fontSize: 30, color: color.bone, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 8 }}>{picked.name}</Text>
          <Text style={{ fontFamily: font.sans, fontSize: 12, color: 'rgba(241,238,231,0.75)', textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 6, marginTop: 2 }}>Tap the map or drag the pin. Members only see the city.</Text>
        </View>
      </View>

      <Button title={`${cta} ${picked.name === 'Locating…' ? '…' : picked.name.split(',')[0]}`} disabled={picked.name === 'Locating…'} onPress={() => onDone(picked)} />
    </View>
  );
}
