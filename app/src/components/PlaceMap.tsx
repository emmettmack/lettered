import { useEffect, useRef } from 'react';
import MapView, { Marker, type Region } from 'react-native-maps';

type Props = { center: { lat: number; lng: number }; onPick: (lat: number, lng: number) => void };

// Native (iOS and Android). Not yet run on a device. Needs a first test in Expo Go or a build.
export function PlaceMap({ center, onPick }: Props) {
  const ref = useRef<MapView>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    ref.current?.animateToRegion({ latitude: center.lat, longitude: center.lng, latitudeDelta: 2.5, longitudeDelta: 2.5 } satisfies Region, 450);
  }, [center.lat, center.lng]);

  return (
    <MapView
      ref={ref}
      style={{ flex: 1 }}
      userInterfaceStyle="dark"
      initialRegion={{ latitude: center.lat, longitude: center.lng, latitudeDelta: 2.5, longitudeDelta: 2.5 }}
      onPress={(e) => onPick(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
      showsPointsOfInterests={false}
      toolbarEnabled={false}
    >
      <Marker coordinate={{ latitude: center.lat, longitude: center.lng }} pinColor="#E2412D" draggable onDragEnd={(e) => onPick(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)} />
    </MapView>
  );
}
