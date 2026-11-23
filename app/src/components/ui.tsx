import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { band, color, font, space } from '@/lib/theme';

export const tap = () => {
  if (Platform.OS !== 'web') Haptics.selectionAsync();
};

export function Serif({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  return <Text {...p} style={[{ fontFamily: font.serif, color: color.bone, fontSize: 48, lineHeight: 52, letterSpacing: -0.6 }, style]} />;
}

export function Sans({ style, muted, ...p }: TextProps & { muted?: boolean; style?: StyleProp<TextStyle> }) {
  return <Text {...p} style={[{ fontFamily: font.sans, color: muted ? color.ash : color.bone, fontSize: 16, lineHeight: 23 }, style]} />;
}

export function Label({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[{ fontFamily: font.sansMedium, color: color.ash, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' }, style]}>{children}</Text>;
}

/** Full-screen page on night, with safe areas. */
export function Screen({ children, style, pad = true }: { children: ReactNode; style?: StyleProp<ViewStyle>; pad?: boolean }) {
  const i = useSafeAreaInsets();
  return (
    <View style={[{ flex: 1, backgroundColor: color.night, paddingTop: i.top, paddingBottom: Math.max(i.bottom, 16) }, pad && { paddingHorizontal: space.gutter }, style]}>
      {children}
    </View>
  );
}

/** The one primary button per screen: bone on night. */
export function Button({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => { tap(); onPress(); }}
      style={({ pressed }) => [s.btn, disabled && { opacity: 0.35 }, pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }]}
    >
      <Text style={s.btnText}>{title}</Text>
    </Pressable>
  );
}

export function TextLink({ title, onPress, style }: { title: string; onPress: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable accessibilityRole="button" onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ paddingVertical: 14, alignItems: 'center', opacity: pressed ? 0.5 : 1 }, style]}>
      <Text style={{ fontFamily: font.sans, color: color.ash, fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}

export function Back({ onPress, tint = color.bone }: { onPress?: () => void; tint?: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={16}
      onPress={() => { tap(); if (onPress) onPress(); else if (router.canGoBack()) router.back(); else router.replace('/'); }}
      style={{ height: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
    >
      <Text style={{ color: tint, fontSize: 28, fontFamily: font.sans, marginTop: -4 }}>‹</Text>
    </Pressable>
  );
}

/** Liquid Glass on iOS 26+, blur everywhere else. */
export function Glass({ children, style }: { children?: ReactNode; style?: StyleProp<ViewStyle> }) {
  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {
    return <GlassView style={style} glassEffectStyle="regular" colorScheme="dark">{children}</GlassView>;
  }
  return (
    <BlurView intensity={36} tint="dark" style={[{ overflow: 'hidden', backgroundColor: 'rgba(241,238,231,0.06)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(241,238,231,0.16)' }, style]}>
      {children}
    </BlurView>
  );
}

/** The four-color poster band. */
export function Band({ width = 56, height = 6, style }: { width?: number | `${number}%`; height?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', width, height }, style]}>
      {band.map((c) => <View key={c} style={{ flex: 1, backgroundColor: c }} />)}
    </View>
  );
}

export function Chip({ label, on, onPress, accent = color.bone }: { label: string; on: boolean; onPress: () => void; accent?: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={() => { tap(); onPress(); }}
      style={[s.chip, on && { backgroundColor: accent, borderColor: accent }]}
    >
      <Text style={{ fontFamily: font.sansMedium, fontSize: 14, color: on ? color.night : color.ash }}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: { height: 56, borderRadius: 28, backgroundColor: color.bone, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontFamily: font.sansSemi, fontSize: 16, color: color.night },
  chip: { height: 38, paddingHorizontal: 16, borderRadius: 19, borderWidth: 1, borderColor: color.night3, justifyContent: 'center' },
});
