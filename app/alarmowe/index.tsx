import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
import { emergencyNumbers } from "../../data/emergencyNumbers";

export default function EmergencyNumbersScreen() {
  const openDialer = async (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    const canOpenDialer = await Linking.canOpenURL(phoneUrl);

    if (!canOpenDialer) {
      Alert.alert("Nie udało się otworzyć dialera.");
      return;
    }

    await Linking.openURL(phoneUrl);
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Numery alarmowe</Text>

        <View style={styles.list}>
          {emergencyNumbers.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              <Text
                style={[
                  styles.label,
                  item.phoneNumber !== "112" && styles.labelWithoutDescription,
                ]}
              >
                {item.label}
              </Text>
              {item.phoneNumber === "112" ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={() => openDialer(item.phoneNumber)}
                style={({ pressed }) => [
                  styles.dialButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.dialButtonText}>Wybierz numer</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
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
    maxWidth: 720,
    paddingBottom: 40,
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
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
  },
  phoneNumber: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  label: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 25,
    marginBottom: 8,
  },
  labelWithoutDescription: {
    marginBottom: 18,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },
  dialButton: {
    alignItems: "center",
    backgroundColor: colors.surfaceAccent,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
  },
  dialButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
