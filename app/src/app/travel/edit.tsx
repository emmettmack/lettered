import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { PlacePicker } from '@/components/PlacePicker';
import type { GeoPlace } from '@/lib/geo';
import { RangeCalendar } from '@/components/RangeCalendar';
import { Back, Button, Chip, Label, Sans, Screen, Serif, tap } from '@/components/ui';
import { fmtRange } from '@/lib/dates';
import { tripProblem, useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

const reasons = ['Competition', 'Training', 'Visiting', 'Other'] as const;

// Add or edit one window: where, when, why.
export default function EditTrip() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { trips, saveTrip } = useStore();
  const existing = trips.find((t) => t.id === id);

  const [place, setPlace] = useState<GeoPlace | null>(existing?.place ?? null);
  const [picking, setPicking] = useState(!existing);
  const [range, setRange] = useState<{ start: string | null; end: string | null }>({ start: existing?.start ?? null, end: existing?.end ?? null });
  const [reason, setReason] = useState<string>(existing?.reason ?? 'Competition');
  const [error, setError] = useState<string | null>(null);

  const others = trips.filter((t) => t.id !== existing?.id);
  const ready = !!place && !!range.start && !!range.end;

  const save = () => {
    if (!place || !range.start || !range.end) return;
    const t = { id: existing?.id ?? `${Date.now()}`, place, start: range.start, end: range.end, reason };
    const problem = tripProblem(trips, t);
    if (problem) return setError(problem);
    saveTrip(t);
    router.back();
  };

  if (picking) {
    return (
      <Screen>
        <Back onPress={place ? () => setPicking(false) : undefined} />
        <View style={{ paddingTop: 12, paddingBottom: 12 }}>
          <Serif style={{ fontSize: 34, lineHeight: 38 }}>Where are you going?</Serif>
        </View>
        <PlacePicker start={place ?? undefined} current={place?.name} cta="Going to" onDone={(p) => { setPlace(p); setPicking(false); setError(null); }} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}>
        <Pressable accessibilityRole="button" onPress={() => { tap(); setPicking(true); }}>
          <Label>{existing ? 'Edit window' : 'New window'}</Label>
          <Text style={{ fontFamily: font.serif, fontSize: 44, lineHeight: 48, color: color.bone, marginTop: 8, letterSpacing: -0.6 }}>{place?.name}</Text>
          <Sans muted style={{ fontSize: 14, marginTop: 4 }}>Change place</Sans>
        </Pressable>

        <View style={{ marginTop: 36 }}>
          <RangeCalendar value={range} onChange={(r) => { setRange(r); setError(null); }} blocked={others} />
        </View>

        <Label style={{ marginTop: 36 }}>Why you’re going</Label>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {reasons.map((r) => <Chip key={r} label={r} on={reason === r} onPress={() => setReason(r)} accent={color.sky} />)}
        </View>

        {error && <Sans style={{ marginTop: 22, fontSize: 14, color: color.torch }}>{error}</Sans>}
      </ScrollView>
      <Button title={ready ? `Save · ${fmtRange(range.start!, range.end!)}` : 'Save'} disabled={!ready} onPress={save} />
    </Screen>
  );
}
