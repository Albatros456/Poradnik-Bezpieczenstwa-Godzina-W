import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { Magnetometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { LocalTile, Marker } from "react-native-maps";

type OfflineTile = {
  z: number;
  x: number;
  y: number;
  source: number;
};

const offlineRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 140,
  longitudeDelta: 140,
};

const offlineTilesDirectory = `${FileSystem.documentDirectory}offline-map-tiles/`;

const offlineTiles: OfflineTile[] = [
  { z: 0, x: 0, y: 0, source: require("../../assets/maps/offline/0/0/0.png") },
  { z: 1, x: 0, y: 0, source: require("../../assets/maps/offline/1/0/0.png") },
  { z: 1, x: 0, y: 1, source: require("../../assets/maps/offline/1/0/1.png") },
  { z: 1, x: 1, y: 0, source: require("../../assets/maps/offline/1/1/0.png") },
  { z: 1, x: 1, y: 1, source: require("../../assets/maps/offline/1/1/1.png") },
  { z: 2, x: 0, y: 0, source: require("../../assets/maps/offline/2/0/0.png") },
  { z: 2, x: 0, y: 1, source: require("../../assets/maps/offline/2/0/1.png") },
  { z: 2, x: 0, y: 2, source: require("../../assets/maps/offline/2/0/2.png") },
  { z: 2, x: 0, y: 3, source: require("../../assets/maps/offline/2/0/3.png") },
  { z: 2, x: 1, y: 0, source: require("../../assets/maps/offline/2/1/0.png") },
  { z: 2, x: 1, y: 1, source: require("../../assets/maps/offline/2/1/1.png") },
  { z: 2, x: 1, y: 2, source: require("../../assets/maps/offline/2/1/2.png") },
  { z: 2, x: 1, y: 3, source: require("../../assets/maps/offline/2/1/3.png") },
  { z: 2, x: 2, y: 0, source: require("../../assets/maps/offline/2/2/0.png") },
  { z: 2, x: 2, y: 1, source: require("../../assets/maps/offline/2/2/1.png") },
  { z: 2, x: 2, y: 2, source: require("../../assets/maps/offline/2/2/2.png") },
  { z: 2, x: 2, y: 3, source: require("../../assets/maps/offline/2/2/3.png") },
  { z: 2, x: 3, y: 0, source: require("../../assets/maps/offline/2/3/0.png") },
  { z: 2, x: 3, y: 1, source: require("../../assets/maps/offline/2/3/1.png") },
  { z: 2, x: 3, y: 2, source: require("../../assets/maps/offline/2/3/2.png") },
  { z: 2, x: 3, y: 3, source: require("../../assets/maps/offline/2/3/3.png") },
];

function getLocalTilePathTemplate() {
  const pathTemplate = `${offlineTilesDirectory}{z}/{x}/{y}.png`;

  return Platform.OS === "android"
    ? pathTemplate.replace("file://", "")
    : pathTemplate;
}

function getDirection(degrees: number) {
  if (degrees >= 337.5 || degrees < 22.5) {
    return "N";
  }
  if (degrees < 67.5) {
    return "NE";
  }
  if (degrees < 112.5) {
    return "E";
  }
  if (degrees < 157.5) {
    return "SE";
  }
  if (degrees < 202.5) {
    return "S";
  }
  if (degrees < 247.5) {
    return "SW";
  }
  if (degrees < 292.5) {
    return "W";
  }
  return "NW";
}

function calculateHeading(x: number, y: number) {
  let angle = Math.atan2(y, x) * (180 / Math.PI);
  angle = angle >= 0 ? angle : angle + 360;
  return Math.round(angle);
}

async function prepareOfflineTiles() {
  await FileSystem.makeDirectoryAsync(offlineTilesDirectory, { intermediates: true });

  for (const tile of offlineTiles) {
    const tileDirectory = `${offlineTilesDirectory}${tile.z}/${tile.x}/`;
    const tilePath = `${tileDirectory}${tile.y}.png`;
    const tileInfo = await FileSystem.getInfoAsync(tilePath);

    if (tileInfo.exists) {
      continue;
    }

    await FileSystem.makeDirectoryAsync(tileDirectory, { intermediates: true });

    const asset = Asset.fromModule(tile.source);
    await asset.downloadAsync();

    if (asset.localUri) {
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: tilePath,
      });
    }
  }
}

export default function MapScreen() {
  const [tilePathTemplate, setTilePathTemplate] = useState<string | null>(null);
  const [isCompassVisible, setIsCompassVisible] = useState(false);
  const [heading, setHeading] = useState(0);
  const compassSubscriptionRef = useRef<ReturnType<typeof Magnetometer.addListener> | null>(
    null,
  );

  const stopCompass = () => {
    compassSubscriptionRef.current?.remove();
    compassSubscriptionRef.current = null;
    setIsCompassVisible(false);
  };

  const startCompass = async () => {
    const isAvailable = await Magnetometer.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert("Kompas nie jest dostępny na tym urządzeniu.");
      return;
    }

    Magnetometer.setUpdateInterval(300);
    compassSubscriptionRef.current = Magnetometer.addListener(({ x, y }) => {
      setHeading(calculateHeading(x, y));
    });
    setIsCompassVisible(true);
  };

  const toggleCompass = () => {
    if (isCompassVisible) {
      stopCompass();
      return;
    }

    void startCompass();
  };

  useEffect(() => {
    void prepareOfflineTiles()
      .then(() => setTilePathTemplate(getLocalTilePathTemplate()))
      .catch(() => {});

    return () => {
      compassSubscriptionRef.current?.remove();
      compassSubscriptionRef.current = null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mapa offline</Text>

        <Pressable
          accessibilityRole="button"
          onPress={toggleCompass}
          style={({ pressed }) => [styles.compassButton, pressed && styles.pressed]}
        >
          <Text style={styles.compassButtonText}>
            {isCompassVisible ? "Zamknij kompas" : "Uruchom kompas"}
          </Text>
        </Pressable>

        <View style={styles.content}>
          {isCompassVisible ? (
            <View style={styles.compassCard}>
              <View style={styles.compassCircle}>
                <Text style={[styles.compassLetter, styles.northLetter]}>N</Text>
                <Text style={[styles.compassLetter, styles.eastLetter]}>E</Text>
                <Text style={[styles.compassLetter, styles.southLetter]}>S</Text>
                <Text style={[styles.compassLetter, styles.westLetter]}>W</Text>
                <View
                  style={[
                    styles.compassNeedle,
                    { transform: [{ rotate: `${heading}deg` }] },
                  ]}
                >
                  <View style={styles.needleNorth} />
                  <View style={styles.needleSouth} />
                  <View style={styles.needleCenter} />
                </View>
              </View>
              <View style={styles.compassInfo}>
                <Text style={styles.directionText}>{getDirection(heading)}</Text>
                <Text style={styles.headingText}>{heading}°</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.mapCard}>
            <MapView
              initialRegion={offlineRegion}
              mapType="none"
              maxZoomLevel={2}
              minZoomLevel={0}
              style={styles.map}
            >
              {tilePathTemplate ? (
                <LocalTile
                  pathTemplate={tilePathTemplate}
                  tileSize={256}
                  zIndex={1}
                />
              ) : null}

              <Marker
                coordinate={{
                  latitude: offlineRegion.latitude,
                  longitude: offlineRegion.longitude,
                }}
                title="Przykładowy punkt"
              />
            </MapView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  compassButton: {
    alignItems: "center",
    backgroundColor: "#2563FF",
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 16,
    minHeight: 56,
  },
  compassButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    gap: 16,
  },
  compassCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    flexDirection: "row",
    gap: 18,
    height: 190,
    justifyContent: "center",
    padding: 16,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  compassCircle: {
    alignItems: "center",
    borderColor: "#E1E7F0",
    borderRadius: 66,
    borderWidth: 2,
    height: 132,
    justifyContent: "center",
    width: 132,
  },
  compassLetter: {
    color: "#0B1F3A",
    fontSize: 16,
    fontWeight: "800",
    position: "absolute",
  },
  northLetter: {
    top: 8,
  },
  eastLetter: {
    right: 10,
  },
  southLetter: {
    bottom: 8,
  },
  westLetter: {
    left: 10,
  },
  compassNeedle: {
    alignItems: "center",
    height: 90,
    left: "50%",
    marginLeft: -8,
    marginTop: -45,
    position: "absolute",
    top: "50%",
    width: 16,
  },
  needleNorth: {
    borderBottomColor: "#FF2D3D",
    borderBottomWidth: 45,
    borderLeftColor: "transparent",
    borderLeftWidth: 8,
    borderRightColor: "transparent",
    borderRightWidth: 8,
    height: 0,
    width: 0,
  },
  needleSouth: {
    borderLeftColor: "transparent",
    borderLeftWidth: 6,
    borderRightColor: "transparent",
    borderRightWidth: 6,
    borderTopColor: "#0B1F3A",
    borderTopWidth: 35,
    height: 0,
    width: 0,
  },
  needleCenter: {
    backgroundColor: "#FFFFFF",
    borderColor: "#0B1F3A",
    borderRadius: 7,
    borderWidth: 2,
    height: 14,
    left: 1,
    position: "absolute",
    top: 38,
    width: 14,
  },
  compassInfo: {
    alignItems: "center",
    minWidth: 92,
  },
  headingText: {
    color: "#0B1F3A",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  directionText: {
    color: "#2563FF",
    fontSize: 34,
    fontWeight: "800",
  },
  mapCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    flex: 1,
    overflow: "hidden",
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  map: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
