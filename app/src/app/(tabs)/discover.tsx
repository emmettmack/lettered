import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Photo } from '@/components/Photo';
import { Glass, Sans, Serif, tap } from '@/components/ui';
import { people, type Mode } from '@/lib/data';
import { fmtRange, today } from '@/lib/dates';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// A short, curated set each day. When it runs out, it's out until tomorrow.
export default function Discover() {
  const i = useSafeAreaInsets();
  const { mode, setMode, seen, decide, paused, home, trips } = useStore();
  const t = today();
  const here = trips.find((x) => t >= x.start && t <= x.end);
  const upcoming = trips.find((x) => x.start > t);
  const where = here ? `${here.place.name.split(',')[0]} · until ${fmtRange(here.end, here.end)}` : home.name.split(',')[0];
  const soon = !here && upcoming ? `${upcoming.place.name.split(',')[0]} ${fmtRange(upcoming.start, upcoming.end)}` : null;
  const accent = mode === 'Date' ? color.torch : color.sky;
  const deck = people.filter((p) => p.mode === mode && !seen[mode].includes(p.id));
  const p = deck[0];
  const [ph, setPh] = useState(0);
  useEffect(() => setPh(0), [p?.id]);

  const choose = (yes: boolean) => {
    if (!p) return;
    tap();
    const matched = decide(p.id, yes);
    if (matched) router.push({ pathname: '/match/[id]', params: { id: p.id } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.night }}>
      {p ? (
        <>
          <Photo key={`${p.id}-${ph}`} tones={p.tones[ph]} initial={p.name[0]} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={['rgba(12,12,11,0.55)', 'transparent']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 180 }} />
          <LinearGradient colors={['transparent', 'rgba(12,12,11,0.92)', color.night]} locations={[0, 0.55, 1]} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '62%' }} />
          {/* tap halves to move through photos */}
          <View style={[StyleSheet.absoluteFill, { flexDirection: 'row' }]}>
            <Pressable accessibilityLabel="Previous photo" style={{ flex: 1 }} onPress={() => setPh(Math.max(0, ph - 1))} />
            <Pressable accessibilityLabel="Next photo" style={{ flex: 1 }} onPress={() => setPh(Math.min(p.tones.length - 1, ph + 1))} />
          </View>
        </>
      ) : null}

      <View style={{ paddingTop: i.top + 8, paddingHorizontal: 24 }} pointerEvents="box-none">
        <ModeSwitch mode={mode} onChange={setMode} />
        <Pressable accessibilityRole="button" accessibilityLabel="Where you'll be" onPress={() => { tap(); router.push('/travel'); }} style={{ marginTop: 10, alignSelf: 'flex-start' }}>
          <Text style={{ fontFamily: font.sans, fontSize: 13, color: 'rgba(241,238,231,0.7)' }}>
            {where}{soon ? <Text style={{ color: 'rgba(241,238,231,0.45)' }}>  ·  next {soon}</Text> : null}
          </Text>
        </Pressable>
        {p && (
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 14 }} pointerEvents="none">
            {p.tones.map((_, k) => <View key={k} style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: k === ph ? accent : 'rgba(241,238,231,0.25)' }} />)}
          </View>
        )}
      </View>

      <View style={{ flex: 1 }} pointerEvents="box-none" />

      {paused ? (
        <Empty title="You’re paused." body="Nobody sees you, and you see nobody. Unpause from You." />
      ) : p ? (
        <View style={{ paddingHorizontal: 24, paddingBottom: i.bottom + 92 }} pointerEvents="box-none">
          <Text style={{ fontFamily: font.serif, fontSize: 52, lineHeight: 56, color: color.bone, letterSpacing: -0.8 }}>
            {p.name}<Text style={{ fontSize: 30, color: color.ash }}>  {p.age}</Text>
          </Text>
          <Sans style={{ fontFamily: font.sansMedium, marginTop: 6 }}>{p.what}</Sans>
          <Sans muted style={{ marginTop: 4 }}>{p.note}</Sans>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: accent }} />
            <Sans muted style={{ fontSize: 13 }}>{p.song}</Sans>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <Pressable accessibilityRole="button" onPress={() => choose(false)} style={{ borderRadius: 28 }}>
              <Glass style={{ height: 56, paddingHorizontal: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: font.sansMedium, fontSize: 16, color: color.ash }}>Pass</Text>
              </Glass>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => choose(true)} style={({ pressed }) => ({ flex: 1, height: 56, borderRadius: 28, backgroundColor: color.bone, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.9 : 1 })}>
              <Text style={{ fontFamily: font.sansSemi, fontSize: 16, color: color.night }}>{mode === 'Date' ? 'Interested' : 'Let’s train'}</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Empty title="That’s everyone for today." body="New letters arrive at nine tomorrow morning." />
      )}
    </View>
  );
}

function ModeSwitch({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 22 }} accessibilityRole="tablist">
      {(['Date', 'Friends'] as const).map((m) => {
        const on = m === mode;
        return (
          <Pressable key={m} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => { tap(); onChange(m); }}>
            <Text style={{ fontFamily: font.serif, fontSize: 24, color: on ? color.bone : 'rgba(241,238,231,0.45)' }}>{m}</Text>
            <View style={{ height: 1.5, marginTop: 3, backgroundColor: on ? (m === 'Date' ? color.torch : color.sky) : 'transparent' }} />
          </Pressable>
        );
      })}
    </View>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  const i = useSafeAreaInsets();
  return (
    <View style={{ paddingHorizontal: 28, paddingBottom: i.bottom + 120 }}>
      <Serif style={{ fontSize: 38, lineHeight: 42 }}>{title}</Serif>
      <Sans muted style={{ marginTop: 14 }}>{body}</Sans>
    </View>
  );
}
