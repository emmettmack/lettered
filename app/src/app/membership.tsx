import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { tap } from '@/components/ui';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// Stand-in for the App Store subscription sheet. Wired to real in-app purchase later.
export default function Membership() {
  const { becomeMember } = useStore();
  const [busy, setBusy] = useState(false);

  const confirm = () => {
    tap();
    setBusy(true);
    setTimeout(() => {
      becomeMember();
      if (router.canDismiss()) router.dismissAll();
      router.replace('/discover');
    }, 900);
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.night2, padding: 24, paddingTop: 28 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontFamily: font.sansSemi, fontSize: 17, color: color.bone }}>Subscription</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => router.back()} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#9A9AA0', fontSize: 15 }}>✕</Text>
        </Pressable>
      </View>
      <Line k="lettered" v="Membership" />
      <Line k="Price" v="$7.99 per month" />
      <Line k="Renews" v="Monthly until cancelled" />
      <View style={{ flex: 1 }} />
      <Pressable accessibilityRole="button" disabled={busy} onPress={confirm} style={({ pressed }) => ({ height: 54, borderRadius: 16, backgroundColor: color.bone, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.9 : 1 })}>
        {busy ? <ActivityIndicator color={color.night} /> : <Text style={{ fontFamily: font.sansSemi, fontSize: 16, color: color.night }}>Subscribe</Text>}
      </Pressable>
      <Text style={{ fontFamily: font.sans, fontSize: 12, color: color.smoke, textAlign: 'center', marginTop: 12 }}>Demo. No charge is made.</Text>
    </View>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#2C2C2E' }}>
      <Text style={{ fontFamily: font.sans, fontSize: 15, color: '#9A9AA0' }}>{k}</Text>
      <Text style={{ fontFamily: font.sans, fontSize: 15, color: color.bone }}>{v}</Text>
    </View>
  );
}
