import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Photo } from '@/components/Photo';
import { Button, Sans, Screen, Serif, TextLink } from '@/components/ui';
import { people } from '@/lib/data';
import { color } from '@/lib/theme';

export default function Match() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = people.find((x) => x.id === id);
  if (!p) return null;
  const date = p.mode === 'Date';
  const glow = date ? 'rgba(226,65,45,0.5)' : 'rgba(47,127,208,0.5)';

  return (
    <Screen pad={false}>
      <Photo tones={p.tones[0]} initial={p.name[0]} style={[StyleSheet.absoluteFill, { opacity: 0.45 }]} />
      <LinearGradient colors={[glow, 'transparent']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%' }} />
      <LinearGradient colors={['transparent', color.night]} locations={[0.2, 0.7]} style={StyleSheet.absoluteFill} />
      <View style={{ flex: 1 }} />
      <View style={{ paddingHorizontal: 28 }}>
        <Serif style={{ fontSize: 50, lineHeight: 54 }}>{date ? `${p.name} is interested too.` : `${p.name} is in.`}</Serif>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: date ? color.torch : color.sky }} />
          <Sans muted>{date ? 'Only the two of you can see this.' : 'Pick a time and a place.'}</Sans>
        </View>
        <View style={{ marginTop: 32 }}>
          <Button title={`Message ${p.name}`} onPress={() => router.replace({ pathname: '/chat/[id]', params: { id: p.id } })} />
          <TextLink title="Keep looking" onPress={() => router.back()} />
        </View>
      </View>
    </Screen>
  );
}
