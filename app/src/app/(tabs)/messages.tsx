import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Photo } from '@/components/Photo';
import { Label, Sans, Serif, tap } from '@/components/ui';
import { people } from '@/lib/data';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

export default function Messages() {
  const i = useSafeAreaInsets();
  const { matches, threads, read } = useStore();
  const fresh = matches.filter((id) => !(threads[id] ?? []).some((m) => m.from === 'me'));
  const talking = matches.filter((id) => (threads[id] ?? []).some((m) => m.from === 'me'));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.night }} contentContainerStyle={{ paddingTop: i.top + 24, paddingBottom: i.bottom + 120, paddingHorizontal: 24 }}>
      <Serif style={{ fontSize: 40, lineHeight: 44 }}>Messages</Serif>

      {matches.length === 0 && (
        <Sans muted style={{ marginTop: 18 }}>Nothing yet. When it’s mutual, it shows up here.</Sans>
      )}

      {fresh.length > 0 && (
        <>
          <Label style={{ marginTop: 36 }}>New</Label>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 14, marginHorizontal: -24 }} contentContainerStyle={{ paddingHorizontal: 24, gap: 14 }}>
            {fresh.map((id) => {
              const p = people.find((x) => x.id === id)!;
              return (
                <Pressable key={id} accessibilityRole="button" accessibilityLabel={`Message ${p.name}`} onPress={() => { tap(); router.push({ pathname: '/chat/[id]', params: { id } }); }} style={{ alignItems: 'center', gap: 8 }}>
                  <View style={{ padding: 2, borderRadius: 40, borderWidth: 1.5, borderColor: p.mode === 'Date' ? color.torch : color.sky }}>
                    <Photo tones={p.tones[0]} initial={p.name[0]} style={{ width: 68, height: 68, borderRadius: 34 }} />
                  </View>
                  <Text style={{ fontFamily: font.sans, fontSize: 13, color: color.bone }}>{p.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      )}

      {talking.length > 0 && <Label style={{ marginTop: 36 }}>Conversations</Label>}
      {talking.map((id) => {
        const p = people.find((x) => x.id === id)!;
        const last = (threads[id] ?? []).at(-1);
        const theirTurn = (threads[id]?.length ?? 0) > (read[id] ?? 0);
        return (
          <Pressable key={id} accessibilityRole="button" onPress={() => { tap(); router.push({ pathname: '/chat/[id]', params: { id } }); }} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: color.night3, opacity: pressed ? 0.6 : 1 })}>
            <Photo tones={p.tones[0]} initial={p.name[0]} style={{ width: 52, height: 52, borderRadius: 26 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: font.sansMedium, fontSize: 16, color: color.bone }}>{p.name}</Text>
              <Text numberOfLines={1} style={{ fontFamily: font.sans, fontSize: 14, color: theirTurn ? color.bone : color.ash, marginTop: 2 }}>{last?.text}</Text>
            </View>
            {theirTurn && <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color.torch }} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
