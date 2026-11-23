import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Band, Back, Screen } from '@/components/ui';
import { color, font } from '@/lib/theme';

// The acceptance email, as it reads in a mail app.
export default function Letter() {
  return (
    <Screen pad={false} style={{ backgroundColor: color.paper }}>
      <View style={{ paddingHorizontal: 28 }}>
        <Back tint={color.night} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 32, paddingTop: 40 }}>
        <Text style={{ fontFamily: font.sansMedium, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: '#6B6556' }}>From lettered</Text>
        <Text style={{ fontFamily: font.serif, fontSize: 40, lineHeight: 44, color: color.night, marginTop: 40, letterSpacing: -0.5 }}>You’re in.</Text>
        <Text style={{ fontFamily: font.serif, fontSize: 22, lineHeight: 30, color: '#3B3830', marginTop: 16 }}>Your acceptance doesn’t expire.</Text>
        <Band width={56} style={{ marginTop: 36 }} />
        <Pressable accessibilityRole="link" onPress={() => router.replace('/accepted')} style={{ marginTop: 40, alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: color.night, paddingBottom: 2 }}>
          <Text style={{ fontFamily: font.sansSemi, fontSize: 16, color: color.night }}>Open lettered</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
