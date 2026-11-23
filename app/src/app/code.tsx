import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { Back, Button, Label, Sans, Screen, Serif } from '@/components/ui';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

// Personal codes from Emmett. A code stands in for the card.
export default function Code() {
  const { becomeMember } = useStore();
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);

  const redeem = () => {
    // Demo rule: any code of six or more characters works. Real codes are checked server-side.
    if (code.trim().length < 6) return setWrong(true);
    becomeMember();
    if (router.canDismiss()) router.dismissAll();
    router.replace('/discover');
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Back />
        <View style={{ flex: 1, paddingTop: 48 }}>
          <Serif>A code.</Serif>
          <Sans muted style={{ marginTop: 18 }}>If someone gave you one, it covers your membership.</Sans>
          <Label style={{ marginTop: 48 }}>Code</Label>
          <TextInput
            value={code}
            onChangeText={(t) => { setCode(t); setWrong(false); }}
            autoCapitalize="characters"
            autoCorrect={false}
            placeholder="Your code"
            placeholderTextColor={color.smoke}
            style={{ marginTop: 10, fontFamily: font.sans, fontSize: 22, letterSpacing: 2, color: color.bone, borderBottomWidth: 1, borderBottomColor: wrong ? color.torch : color.night3, paddingVertical: 10 }}
          />
          {wrong && <Sans style={{ marginTop: 12, fontSize: 14, color: color.torch }}>That code doesn’t work.</Sans>}
        </View>
        <Button title="Redeem" disabled={code.trim().length === 0} onPress={redeem} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
