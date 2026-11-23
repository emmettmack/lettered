import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Back, Button, Chip, Label, Sans, Screen, Serif, tap } from '@/components/ui';
import { sportCategories } from '@/lib/data';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

const STEPS = 3;
const photoTones: [string, string][] = [['#3A2A22', '#0F0C0A'], ['#2A3440', '#0C0F12'], ['#40302A', '#120D0B'], ['#25352A', '#0B0F0C'], ['#33302B', '#0F0E0C'], ['#2B3B44', '#0B1013']];

export default function Apply() {
  const { name, setName } = useStore();
  const [step, setStep] = useState(1);
  const [kinds, setKinds] = useState<string[]>([]);
  const [photos, setPhotos] = useState<boolean[]>(Array(6).fill(false));
  const [song, setSong] = useState('');
  const [answer, setAnswer] = useState('');
  const [vouch, setVouch] = useState('');

  const ready =
    step === 1 ? name.trim().length > 1 && kinds.length > 0 :
    step === 2 ? photos.filter(Boolean).length === 6 :
    song.trim().length > 1 && answer.trim().length > 1;

  const next = () => (step < STEPS ? setStep(step + 1) : router.replace('/received'));

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Back onPress={step > 1 ? () => setStep(step - 1) : undefined} />
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
          {Array.from({ length: STEPS }, (_, i) => (
            <View key={i} style={{ flex: 1, height: 2, backgroundColor: i < step ? color.sun : color.night3 }} />
          ))}
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 40, paddingBottom: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {step === 1 && (
            <>
              <Serif>Who are you.</Serif>
              <Label style={{ marginTop: 40 }}>First name</Label>
              <Field value={name} onChangeText={setName} placeholder="Your name" />
              <Label style={{ marginTop: 36 }}>What you do</Label>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                {sportCategories.map((k) => (
                  <Chip key={k} label={k} on={kinds.includes(k)} onPress={() => setKinds(kinds.includes(k) ? kinds.filter((x) => x !== k) : [...kinds, k])} />
                ))}
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Serif>Six photos.</Serif>
              <Sans muted style={{ marginTop: 14 }}>At least one doing what you do.</Sans>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
                {photos.map((on, i) => (
                  <Pressable
                    key={i}
                    accessibilityRole="button"
                    accessibilityLabel={on ? `Photo ${i + 1} added` : `Add photo ${i + 1}`}
                    onPress={() => { tap(); setPhotos(photos.map((p, j) => (j === i ? !p : p))); }}
                    style={{ width: '31.6%', aspectRatio: 3 / 4, borderRadius: 12, overflow: 'hidden', backgroundColor: color.night2, alignItems: 'center', justifyContent: 'center' }}
                  >
                    {on ? <LinearGradient colors={photoTones[i]} style={{ position: 'absolute', inset: 0 }} /> : <Text style={{ color: color.smoke, fontSize: 26, fontFamily: font.serif }}>+</Text>}
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <Serif>Last thing.</Serif>
              <Label style={{ marginTop: 40 }}>A song that’s you</Label>
              <Field value={song} onChangeText={setSong} placeholder="Song and artist" />
              <Label style={{ marginTop: 36 }}>What are you the best at?</Label>
              <Field value={answer} onChangeText={setAnswer} placeholder="One line" multiline />
              <Label style={{ marginTop: 36 }}>A member who’ll vouch · optional</Label>
              <Field value={vouch} onChangeText={setVouch} placeholder="Their name" />
            </>
          )}
        </ScrollView>

        <Button title={step < STEPS ? 'Continue' : 'Submit'} disabled={!ready} onPress={next} />
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Field(p: { value: string; onChangeText: (t: string) => void; placeholder: string; multiline?: boolean }) {
  return (
    <TextInput
      {...p}
      placeholderTextColor={color.smoke}
      style={{ marginTop: 10, fontFamily: font.sans, fontSize: 19, color: color.bone, borderBottomWidth: 1, borderBottomColor: color.night3, paddingVertical: 10 }}
    />
  );
}
