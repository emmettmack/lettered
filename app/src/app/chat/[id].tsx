import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View, type ScrollViewInstance } from 'react-native';
import { Photo } from '@/components/Photo';
import { Back, Glass, Screen, tap } from '@/components/ui';
import { people } from '@/lib/data';
import { useStore } from '@/lib/store';
import { color, font } from '@/lib/theme';

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = people.find((x) => x.id === id);
  const { threads, send, markRead } = useStore();
  const [text, setText] = useState('');
  const scroll = useRef<ScrollViewInstance>(null);
  const count = p ? (threads[p.id]?.length ?? 0) : 0;
  useEffect(() => { if (p) markRead(p.id, count); }, [p, count, markRead]);
  if (!p) return null;
  const msgs = threads[p.id] ?? [];

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    tap();
    send(p.id, t);
    setText('');
  };

  return (
    <Screen pad={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: color.night3 }}>
          <Back />
          <Photo tones={p.tones[0]} initial={p.name[0]} style={{ width: 36, height: 36, borderRadius: 18 }} />
          <View>
            <Text style={{ fontFamily: font.sansMedium, fontSize: 16, color: color.bone }}>{p.name}</Text>
            <Text style={{ fontFamily: font.sans, fontSize: 12, color: color.ash }}>{p.what}</Text>
          </View>
        </View>

        <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 8, flexGrow: 1, justifyContent: 'flex-end' }} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}>
          {msgs.length === 0 && <Text style={{ fontFamily: font.serif, fontSize: 22, color: color.ash, textAlign: 'center', marginBottom: 24 }}>Say something worth answering.</Text>}
          {msgs.map((m, k) => (
            <View key={k} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '78%', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: m.from === 'me' ? color.bone : color.night2 }}>
              <Text style={{ fontFamily: font.sans, fontSize: 16, lineHeight: 22, color: m.from === 'me' ? color.night : color.bone }}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 14, paddingTop: 6 }}>
          <Glass style={{ borderRadius: 26, flexDirection: 'row', alignItems: 'center', paddingLeft: 18, paddingRight: 6, minHeight: 52 }}>
            <TextInput
              value={text}
              onChangeText={setText}
              onSubmitEditing={submit}
              placeholder="Message"
              placeholderTextColor={color.smoke}
              returnKeyType="send"
              style={{ flex: 1, fontFamily: font.sans, fontSize: 16, color: color.bone, paddingVertical: 12 }}
            />
            <Pressable accessibilityRole="button" accessibilityLabel="Send" disabled={!text.trim()} onPress={submit} style={{ height: 40, paddingHorizontal: 16, borderRadius: 20, backgroundColor: text.trim() ? color.bone : 'transparent', justifyContent: 'center' }}>
              <Text style={{ fontFamily: font.sansSemi, fontSize: 15, color: text.trim() ? color.night : color.smoke }}>Send</Text>
            </Pressable>
          </Glass>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
