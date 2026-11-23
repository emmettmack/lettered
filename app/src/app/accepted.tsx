import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Band, Button, Sans, Screen, Serif, TextLink } from '@/components/ui';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// Acceptance, then the paywall. Nothing inside is visible until membership starts.
export default function Accepted() {
  const { door, name } = useStore();
  const roster = door === 'roster';

  return (
    <Screen>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 72, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Serif style={{ fontSize: 54, lineHeight: 58 }}>{roster ? 'You were expected.' : 'Accepted.'}</Serif>
        <Band style={{ marginTop: 22 }} />
        <Sans muted style={{ marginTop: 18 }}>
          {roster ? 'Your roster checked out. Your membership is ready when you are.' : 'The committee said yes. It doesn’t say that often.'}
        </Sans>

        <View accessibilityLabel="Membership card" style={{ marginTop: 34, aspectRatio: 1.586, borderRadius: 18, backgroundColor: color.paper, padding: 22, paddingBottom: 32, justifyContent: 'space-between', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 30, shadowOffset: { width: 0, height: 20 } }}>
          <Text style={{ fontFamily: font.serif, fontSize: 28, color: color.night, letterSpacing: -0.4 }}>lettered</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <Text style={card.k}>Member</Text>
              <Text style={card.v}>{(name || 'Member').toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={card.k}>{roster ? 'Roster' : 'Admitted'}</Text>
              <Text style={card.v}>{roster ? 'BY INVITATION' : 'BY COMMITTEE'}</Text>
            </View>
          </View>
          <Band width="100%" height={10} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 30, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: color.night3 }}>
          <Sans muted>Membership</Sans>
          <Text style={{ fontFamily: font.serif, fontSize: 32, color: color.bone }}>
            $7.99<Text style={{ fontFamily: font.sans, fontSize: 15, color: color.ash }}> / month</Text>
          </Text>
        </View>
        <Sans muted style={{ fontSize: 13, marginTop: 14 }}>Members only. Nothing in the app is visible until your membership starts.</Sans>
      </ScrollView>

      <Button title="Start membership" onPress={() => router.push('/membership')} />
      <TextLink title="I have a code" onPress={() => router.push('/code')} />
    </Screen>
  );
}

const card = {
  k: { fontFamily: font.sans, fontSize: 11, color: '#6B6556' },
  v: { fontFamily: font.sansMedium, fontSize: 15, color: color.night, marginTop: 3, letterSpacing: 0.4 },
} as const;
