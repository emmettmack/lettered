import { router } from 'expo-router';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Photo } from '@/components/Photo';
import { Band, Label, Sans, Serif, tap } from '@/components/ui';
import { fmtRange } from '@/lib/dates';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

export default function You() {
  const i = useSafeAreaInsets();
  const { name, door, hideFromSchool, paused, vouchesLeft, home, trips, set, reset } = useStore();
  const next = trips[0];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.night }} contentContainerStyle={{ paddingTop: i.top + 24, paddingBottom: i.bottom + 120, paddingHorizontal: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
        <Photo tones={['#3A332C', '#100E0C']} initial={(name || 'M')[0]} style={{ width: 76, height: 76, borderRadius: 38 }} />
        <View>
          <Serif style={{ fontSize: 36, lineHeight: 40 }}>{name || 'You'}</Serif>
          <Sans muted style={{ fontSize: 14 }}>Track, USC</Sans>
        </View>
      </View>

      <Label style={{ marginTop: 40 }}>Where you’ll be</Label>
      <Pressable accessibilityRole="button" onPress={() => { tap(); router.push('/travel'); }} style={({ pressed }) => ({ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: pressed ? 0.6 : 1 })}>
        <View style={{ flex: 1 }}>
          <Sans>{home.name}</Sans>
          <Sans muted style={{ fontSize: 14, marginTop: 4 }}>{next ? `Next: ${next.place.name.split(',')[0]}, ${fmtRange(next.start, next.end)}` : 'Add a window for a trip or a meet.'}</Sans>
        </View>
        <Text style={{ fontFamily: font.sans, fontSize: 20, color: color.ash }}>›</Text>
      </Pressable>

      <Label style={{ marginTop: 40 }}>Privacy</Label>
      <Row title="Hide me from my school" body="People from your school won’t see you." value={hideFromSchool} onChange={(v) => set({ hideFromSchool: v })} />
      <Row title="Pause my profile" body="Nobody sees you until you unpause." value={paused} onChange={(v) => set({ paused: v })} />

      <Label style={{ marginTop: 40 }}>Vouches</Label>
      <View style={{ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3 }}>
        <Sans>{vouchesLeft} left</Sans>
        <Sans muted style={{ fontSize: 14, marginTop: 4 }}>Vouch for someone applying. The committee reads every one.</Sans>
      </View>

      <Label style={{ marginTop: 40 }}>Membership</Label>
      <View style={{ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Sans>{door === 'roster' ? 'Roster' : 'Member'}</Sans>
          <Sans muted style={{ fontSize: 14, marginTop: 4 }}>$7.99 a month · renews monthly</Sans>
        </View>
        <Band width={40} height={4} />
      </View>

      <Pressable accessibilityRole="button" onPress={() => { tap(); reset(); router.replace('/'); }} style={{ marginTop: 48, alignSelf: 'center', padding: 12 }}>
        <Text style={{ fontFamily: font.sans, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: color.smoke }}>Demo · start over</Text>
      </Pressable>
    </ScrollView>
  );
}

function Row({ title, body, value, onChange }: { title: string; body: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3 }}>
      <View style={{ flex: 1 }}>
        <Sans>{title}</Sans>
        <Sans muted style={{ fontSize: 14, marginTop: 4 }}>{body}</Sans>
      </View>
      <Switch value={value} onValueChange={(v) => { tap(); onChange(v); }} trackColor={{ false: color.night3, true: color.grass }} thumbColor={color.bone} ios_backgroundColor={color.night3} />
    </View>
  );
}
