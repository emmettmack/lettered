import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Back, Label, Sans, Screen, Serif, tap } from '@/components/ui';
import { fmtRange, relative } from '@/lib/dates';
import { MAX_TRIPS, useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// Where you'll be. Home plus up to two upcoming windows.
export default function Travel() {
  const { home, trips, removeTrip } = useStore();
  const slots = Array.from({ length: MAX_TRIPS }, (_, i) => trips[i] ?? null);

  return (
    <Screen>
      <Back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 28, paddingBottom: 32 }}>
        <Serif>Where you’ll be.</Serif>
        <Sans muted style={{ marginTop: 14 }}>Set a window and you show up there for those dates. Only people in that place see it.</Sans>

        <Label style={{ marginTop: 40 }}>Now</Label>
        <Pressable accessibilityRole="button" onPress={() => { tap(); router.push({ pathname: '/travel/place', params: { for: 'home' } }); }} style={({ pressed }) => ({ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: pressed ? 0.6 : 1 })}>
          <View>
            <Text style={{ fontFamily: font.serif, fontSize: 28, color: color.bone }}>{home.name}</Text>
            <Sans muted style={{ fontSize: 14, marginTop: 2 }}>Where you’re based</Sans>
          </View>
          <Text style={{ fontFamily: font.sans, fontSize: 14, color: color.ash }}>Change</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 40 }}>
          <Label>Upcoming</Label>
          <Text style={{ fontFamily: font.sans, fontSize: 12, color: color.smoke }}>{trips.length} of {MAX_TRIPS}</Text>
        </View>

        {slots.map((t, i) =>
          t ? (
            <View key={t.id} style={{ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: color.night3 }}>
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${t.place.name}`} onPress={() => { tap(); router.push({ pathname: '/travel/edit', params: { id: t.id } }); }} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Text style={{ fontFamily: font.serif, fontSize: 28, color: color.bone, flex: 1 }}>{t.place.name}</Text>
                  <Text style={{ fontFamily: font.sansMedium, fontSize: 13, color: color.sky }}>{relative(t.start, t.end)}</Text>
                </View>
                <Sans style={{ marginTop: 4 }}>{fmtRange(t.start, t.end)}</Sans>
                <Sans muted style={{ fontSize: 14, marginTop: 2 }}>{t.reason}</Sans>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${t.place.name}`} onPress={() => { tap(); removeTrip(t.id); }} hitSlop={8} style={{ alignSelf: 'flex-start', marginTop: 12 }}>
                <Text style={{ fontFamily: font.sans, fontSize: 13, color: color.smoke }}>Remove</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable key={`empty-${i}`} accessibilityRole="button" accessibilityLabel="Add a window" onPress={() => { tap(); router.push('/travel/edit'); }} style={({ pressed }) => ({ marginTop: 14, height: 92, borderRadius: 18, borderWidth: 1, borderColor: color.night3, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 })}>
              <Text style={{ fontFamily: font.serif, fontSize: 22, color: color.ash }}>Add a window</Text>
            </Pressable>
          ),
        )}

        <Sans muted style={{ fontSize: 13, marginTop: 28 }}>Back home when a window ends. Nothing here is public.</Sans>
      </ScrollView>
    </Screen>
  );
}
