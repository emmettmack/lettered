import { Redirect, router } from 'expo-router';
import { View } from 'react-native';
import { Torch } from '@/components/Torch';
import { Button, Sans, Screen, TextLink } from '@/components/ui';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// The cover. Says almost nothing.
export default function Cover() {
  const { member, setDoor } = useStore();
  if (member) return <Redirect href="/discover" />;

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Torch height={210} />
        <Sans style={{ marginTop: 28, fontFamily: font.serif, fontSize: 64, lineHeight: 68, letterSpacing: -1.4 }}>lettered</Sans>
        <Sans muted style={{ marginTop: 10, fontFamily: font.serif, fontSize: 21, lineHeight: 28, color: color.ash }}>A private room for athletes.</Sans>
      </View>
      <View style={{ gap: 4 }}>
        <Button title="Apply" onPress={() => { setDoor('apply'); router.push('/apply'); }} />
        <TextLink title="I was invited" onPress={() => { setDoor('roster'); router.push('/invite'); }} />
      </View>
    </Screen>
  );
}
