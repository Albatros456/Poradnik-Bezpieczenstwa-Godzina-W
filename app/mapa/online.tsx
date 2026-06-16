import { Magnetometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";

const kielceRegion = {
  latitude: 50.8661,
  longitude: 20.6286,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

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

export default function OnlineMapScreen() {
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
    return () => {
      compassSubscriptionRef.current?.remove();
      compassSubscriptionRef.current = null;
    };
  }, []);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <View style={styles.container}>
        {!isCompassVisible ? (
          <Text style={styles.title}>Mapa online</Text>
        ) : null}

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
            <MapView initialRegion={kielceRegion} style={styles.map} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    alignSelf: "center",
    flex: 1,
    maxWidth: 900,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    width: "100%",
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 18,
    textAlign: "center",
  },
  compassButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 14,
    minHeight: 54,
  },
  compassButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    gap: 14,
  },
  compassCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    gap: 18,
    minHeight: 180,
    justifyContent: "center",
    padding: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  compassCircle: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 66,
    borderWidth: 2,
    height: 132,
    justifyContent: "center",
    width: 132,
  },
  compassLetter: {
    color: colors.text,
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
    borderTopColor: colors.text,
    borderTopWidth: 35,
    height: 0,
    width: 0,
  },
  needleCenter: {
    backgroundColor: colors.white,
    borderColor: colors.text,
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
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  directionText: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: "800",
  },
  mapCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    overflow: "hidden",
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  map: {
    flex: 1,
  },
  pressed: {
    opacity: 0.82,
  },
});
