import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { tap } from '@/components/ui';
import { MAX_DAYS, MONTHS_LONG, daysBetween, parse, today, ymd } from '@/lib/dates';
import { color, font } from '@/lib/theme';

type Range = { start: string | null; end: string | null };

/**
 * A quiet month grid. First tap sets the start, second sets the end.
 * `blocked` ranges (your other window) can't be picked.
 */
export function RangeCalendar({ value, onChange, blocked = [] }: { value: Range; onChange: (r: Range) => void; blocked?: { start: string; end: string }[] }) {
  const t = today();
  const seed = parse(value.start ?? t);
  const [cursor, setCursor] = useState({ y: seed.getFullYear(), m: seed.getMonth() });

  const first = new Date(cursor.y, cursor.m, 1);
  const lead = first.getDay();
  const count = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => ymd(new Date(cursor.y, cursor.m, i + 1)))];
  while (cells.length % 7) cells.push(null);

  const isBlocked = (d: string) => blocked.some((b) => d >= b.start && d <= b.end);
  const canPrev = cursor.y > parse(t).getFullYear() || cursor.m > parse(t).getMonth();

  const pick = (d: string) => {
    tap();
    const { start, end } = value;
    if (!start || end) return onChange({ start: d, end: null });
    if (d < start) return onChange({ start: d, end: null });
    // the window can't run past the limit or across your other window
    const tooLong = daysBetween(start, d) + 1 > MAX_DAYS;
    const crosses = blocked.some((b) => b.start > start && b.start <= d);
    if (tooLong || crosses) return onChange({ start: d, end: null });
    onChange({ start, end: d });
  };

  const step = (n: number) => {
    tap();
    const d = new Date(cursor.y, cursor.m + n, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Text style={{ fontFamily: font.serif, fontSize: 24, color: color.bone }}>
          {MONTHS_LONG[cursor.m]} <Text style={{ color: color.ash }}>{cursor.y}</Text>
        </Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Arrow label="Previous month" glyph="‹" disabled={!canPrev} onPress={() => step(-1)} />
          <Arrow label="Next month" glyph="›" onPress={() => step(1)} />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Text key={i} style={{ flex: 1, textAlign: 'center', fontFamily: font.sansMedium, fontSize: 11, letterSpacing: 1, color: color.smoke, paddingBottom: 8 }}>{d}</Text>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }, (_, r) => (
        <View key={r} style={{ flexDirection: 'row' }}>
          {cells.slice(r * 7, r * 7 + 7).map((d, c) => {
            if (!d) return <View key={c} style={{ flex: 1, height: 44 }} />;
            const past = d < t;
            const off = past || isBlocked(d);
            const s = value.start, e = value.end ?? value.start;
            const isStart = d === s, isEnd = d === e && !!value.end;
            const inside = !!s && !!e && d > s && d < e;
            const filled = isStart || isEnd;
            return (
              <Pressable
                key={c}
                accessibilityRole="button"
                accessibilityLabel={d}
                accessibilityState={{ selected: filled, disabled: off }}
                disabled={off}
                onPress={() => pick(d)}
                style={{ flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                {(inside || (isStart && !!value.end) || isEnd) && (
                  <View style={{ position: 'absolute', top: 5, bottom: 5, left: isStart ? '50%' : 0, right: isEnd ? '50%' : 0, backgroundColor: 'rgba(241,238,231,0.1)' }} />
                )}
                <View style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: filled ? color.bone : 'transparent', borderWidth: d === t && !filled ? 1 : 0, borderColor: color.night3 }}>
                  <Text style={{ fontFamily: font.sans, fontSize: 16, color: filled ? color.night : off ? color.smoke : color.bone, opacity: off ? 0.45 : 1 }}>{parse(d).getDate()}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}

      <Text style={{ fontFamily: font.sans, fontSize: 13, color: color.ash, marginTop: 14 }}>
        {!value.start ? 'Pick the day you arrive.' : !value.end ? 'Now the day you leave. Or tap the same day.' : `${daysBetween(value.start, value.end) + 1} ${daysBetween(value.start, value.end) === 0 ? 'day' : 'days'}. Windows run up to ${MAX_DAYS}.`}
      </Text>
    </View>
  );
}

function Arrow({ glyph, label, onPress, disabled }: { glyph: string; label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} hitSlop={6} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.25 : 1 }}>
      <Text style={{ fontFamily: font.sans, fontSize: 26, color: color.bone, marginTop: -3 }}>{glyph}</Text>
    </Pressable>
  );
}

