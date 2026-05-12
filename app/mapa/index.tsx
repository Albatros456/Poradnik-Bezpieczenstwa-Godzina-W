import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const [statusText, setStatusText] = useState("Przygotowywanie kafelków offline...");

  useEffect(() => {
    void prepareOfflineTiles()
      .then(() => {
        setTilePathTemplate(getLocalTilePathTemplate());
        setStatusText("Kafelki offline są gotowe i wyświetlane z pamięci urządzenia.");
      })
      .catch(() => {
        setStatusText("Nie udało się przygotować kafelków offline.");
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mapa offline</Text>
        <Text style={styles.description}>
          Mapa używa lokalnych kafelków zapisanych w aplikacji. Nie pobiera
          kafelków z internetu.
        </Text>

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

        <Text style={styles.offlineInfo}>{statusText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    color: "#35465F",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22,
    textAlign: "center",
  },
  mapCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    height: 420,
    overflow: "hidden",
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  offlineInfo: {
    backgroundColor: "#E7F0FF",
    borderRadius: 14,
    color: "#0B1F3A",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 18,
    padding: 16,
    textAlign: "center",
  },
});
