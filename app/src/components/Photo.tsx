import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { color, font } from '@/lib/theme';

/** Placeholder portrait until members upload real photos. */
export function Photo({ tones, initial, style }: { tones: [string, string]; initial: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ overflow: 'hidden', backgroundColor: color.night2 }, style]}>
      <LinearGradient colors={tones} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontFamily: font.serif, fontSize: 220, color: 'rgba(241,238,231,0.05)', marginTop: -60 }}>{initial}</Text>
      </View>
    </View>
  );
}
