import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { Back, Button, Label, Sans, Screen, Serif } from '@/components/ui';
import { color, font } from '@/lib/theme';

// The Roster door: Olympians, pros, top D1.
export default function Invite() {
  const [code, setCode] = useState('');
  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Back />
        <View style={{ flex: 1, paddingTop: 48 }}>
          <Serif>You don’t need to apply.</Serif>
          <Sans muted style={{ marginTop: 18 }}>Enter the invitation you were sent. We’ll check the roster and have you in shortly.</Sans>
          <Label style={{ marginTop: 48 }}>Invitation</Label>
          <TextInput
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            autoCorrect={false}
            placeholder="XXXX-XXXX"
            placeholderTextColor={color.smoke}
            style={{ marginTop: 10, fontFamily: font.sans, fontSize: 22, letterSpacing: 2, color: color.bone, borderBottomWidth: 1, borderBottomColor: color.night3, paddingVertical: 10 }}
          />
        </View>
        <Button title="Continue" disabled={code.trim().length < 4} onPress={() => router.replace('/accepted')} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
