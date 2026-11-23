import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen, Serif } from '@/components/ui';
import { color, font } from '@/lib/theme';

// After applying: one word. No place in line, no timeline.
export default function Received() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Serif style={{ fontSize: 56, lineHeight: 60 }}>Received.</Serif>
      </View>
      {/* Demo only: stands in for the acceptance email arriving. Removed before launch. */}
      <Pressable accessibilityRole="button" onPress={() => router.push('/letter')} style={{ alignSelf: 'center', paddingVertical: 14 }}>
        <Text style={{ fontFamily: font.sans, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: color.smoke }}>Demo · open the email</Text>
      </Pressable>
    </Screen>
  );
}
