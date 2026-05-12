import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Numery alarmowe</Text>

        <View style={styles.list}>
          {emergencyNumbers.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.description}>{item.description}</Text>

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
    backgroundColor: "#F6F8FB",
  },
  container: {
    padding: 24,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  phoneNumber: {
    color: "#2563FF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },
  label: {
    color: "#0B1F3A",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: "#35465F",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  dialButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E7F0FF",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  dialButtonText: {
    color: "#2563FF",
    fontSize: 16,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.75,
  },
});
