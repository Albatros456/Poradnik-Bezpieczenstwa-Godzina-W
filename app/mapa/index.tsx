import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

type MapButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

function MapButton({ iconName, label, onPress }: MapButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={30} color={colors.primary} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
      <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
    </Pressable>
  );
}

export default function MapsScreen() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mapy</Text>

        <View style={styles.buttons}>
          <MapButton
            iconName="map-outline"
            label="Mapa offline"
            onPress={() => router.push(ROUTES.offlineMap)}
          />
          <MapButton
            iconName="globe-outline"
            label="Mapa online"
            onPress={() => router.push(ROUTES.onlineMap)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    alignSelf: "center",
    flex: 1,
    maxWidth: 720,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
    width: "100%",
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 24,
    textAlign: "center",
  },
  buttons: {
    gap: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    minHeight: 92,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  iconCircle: {
    alignItems: "center",
    backgroundColor: colors.surfaceAccent,
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  buttonText: {
    color: colors.text,
    flex: 1,
    fontSize: 19,
    fontWeight: "800",
    marginLeft: 16,
  },
  pressed: {
    opacity: 0.82,
  },
});
