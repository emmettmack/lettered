import { Redirect } from 'expo-router';
import { Tabs, type BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Glass, tap } from '@/components/ui';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

export default function TabsLayout() {
  const { member } = useStore();
  if (!member) return <Redirect href="/" />;

  return (
    <Tabs tabBar={(p) => <GlassTabBar {...p} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: color.night } }}>
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="you" options={{ title: 'You' }} />
    </Tabs>
  );
}

/** A floating Liquid Glass pill. Text only, no icons. */
function GlassTabBar({ state, descriptors, navigateToTab }: BottomTabBarProps) {
  const i = useSafeAreaInsets();
  const { matches, threads, read } = useStore();
  const unread = matches.some((id) => (threads[id]?.length ?? 0) > (read[id] ?? 0));

  return (
    <View style={{ position: 'absolute', left: 16, right: 16, bottom: Math.max(i.bottom - 6, 14) }}>
      <Glass style={{ borderRadius: 32, flexDirection: 'row', padding: 6 }}>
        {state.routes.map((r, idx) => {
          const focused = state.index === idx;
          const title = descriptors[r.key].options.title ?? r.name;
          return (
            <Pressable
              key={r.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              onPress={() => {
                tap();
                if (!focused) navigateToTab(r.key);
              }}
              style={{ flex: 1, height: 46, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? 'rgba(241,238,231,0.12)' : 'transparent' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: font.sansMedium, fontSize: 14, color: focused ? color.bone : color.ash }}>{title}</Text>
                {r.name === 'messages' && unread && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color.torch }} />}
              </View>
            </Pressable>
          );
        })}
      </Glass>
    </View>
  );
}
