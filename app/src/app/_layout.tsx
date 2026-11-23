import { HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk';
import { Newsreader_300Light, Newsreader_300Light_Italic } from '@expo-google-fonts/newsreader';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StoreProvider } from '@/lib/store';
import '@/lib/webInputReset';
import { color } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded] = useFonts({
    Newsreader_300Light,
    Newsreader_300Light_Italic,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="light" />
        <PhoneFrame>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.night }, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="index" options={{ animation: 'fade' }} />
            <Stack.Screen name="(tabs)" options={{ animation: 'fade', gestureEnabled: false }} />
            <Stack.Screen name="membership" options={{ presentation: 'formSheet', sheetAllowedDetents: [0.52], sheetCornerRadius: 38, contentStyle: { backgroundColor: color.night2 } }} />
            <Stack.Screen name="match/[id]" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
            <Stack.Screen name="chat/[id]" options={{ animation: 'slide_from_right' }} />
          </Stack>
        </PhoneFrame>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
