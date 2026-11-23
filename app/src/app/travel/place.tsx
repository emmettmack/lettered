import { router } from 'expo-router';
import { View } from 'react-native';
import { PlacePicker } from '@/components/PlacePicker';
import { Back, Screen, Serif } from '@/components/ui';
import { useStore } from '@/lib/store';

// Change where you're based.
export default function HomePlace() {
  const { home, set } = useStore();
  return (
    <Screen>
      <Back />
      <View style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Serif style={{ fontSize: 34, lineHeight: 38 }}>Where are you based?</Serif>
      </View>
      <PlacePicker start={home} current={home.name} cta="Base me in" onDone={(p) => { set({ home: p }); router.back(); }} />
    </Screen>
  );
}
