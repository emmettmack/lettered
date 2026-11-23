import type { ReactNode } from 'react';
import { Platform, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { color, font } from '@/lib/theme';

const W = 390;
const H = 844;
const BEZEL = 11;

/**
 * Web only. On a computer the app sits inside an iPhone, so the demo reads as
 * the app and not as a website. On a phone-sized window it fills the screen.
 * Native builds never see this.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const { width, height } = useWindowDimensions();
  if (Platform.OS !== 'web' || width < 600) return <>{children}</>;

  const outerH = Math.min(H, height - 40 - BEZEL * 2) + BEZEL * 2;

  return (
    <View style={{ flex: 1, backgroundColor: '#050505', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: W + BEZEL * 2,
          height: outerH,
          borderRadius: 66,
          backgroundColor: '#1B1B19',
          padding: BEZEL,
          boxShadow: '0 0 0 2px #2A2A27, 0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 1px #3A3A36',
        }}
      >
        <View style={{ flex: 1, borderRadius: 55, overflow: 'hidden', backgroundColor: color.night }}>
          <SafeAreaInsetsContext.Provider value={{ top: 54, bottom: 30, left: 0, right: 0 }}>
            {children}
          </SafeAreaInsetsContext.Provider>
          <StatusBar />
          <View pointerEvents="none" style={{ position: 'absolute', top: 11, alignSelf: 'center', width: 118, height: 34, borderRadius: 17, backgroundColor: '#000' }} />
          <View pointerEvents="none" style={{ position: 'absolute', bottom: 8, alignSelf: 'center', width: 134, height: 5, borderRadius: 3, backgroundColor: 'rgba(241,238,231,0.55)' }} />
        </View>
      </View>
    </View>
  );
}

function StatusBar() {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 34, paddingTop: 6, zIndex: 50 }}>
      <Text style={{ fontFamily: font.sansSemi, fontSize: 16, color: color.bone }}>9:41</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 12 }}>
          {[4, 6, 9, 12].map((hh) => <View key={hh} style={{ width: 3, height: hh, borderRadius: 1, backgroundColor: color.bone }} />)}
        </View>
        <View style={{ width: 25, height: 12, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(241,238,231,0.45)', padding: 1.5 }}>
          <View style={{ flex: 1, borderRadius: 2, backgroundColor: color.bone }} />
        </View>
      </View>
    </View>
  );
}
