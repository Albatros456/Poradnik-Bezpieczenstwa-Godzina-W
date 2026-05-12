import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ROUTES } from "../constants/routes";

type IconName = keyof typeof Ionicons.glyphMap;

type MenuCardProps = {
  title: string;
  iconName: IconName;
  onPress: () => void;
};

type BottomButtonProps = MenuCardProps & {
  backgroundColor: string;
};

function MenuCard({ title, iconName, onPress }: MenuCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={30} color="#2563FF" />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </Pressable>
  );
}

function BottomButton({
  title,
  iconName,
  backgroundColor,
  onPress,
}: BottomButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.bottomButton,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={iconName} size={28} color="#FFFFFF" />
      <Text style={styles.bottomButtonText}>{title}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Poradnik Bezpieczeństwa</Text>

        <View style={styles.menu}>
          <MenuCard
            title="Poradniki"
            iconName="book-outline"
            onPress={() => router.push(ROUTES.guides)}
          />
          <MenuCard
            title="Mapa offline"
            iconName="map-outline"
            onPress={() => router.push(ROUTES.map)}
          />
          <MenuCard
            title="Notatnik"
            iconName="create-outline"
            onPress={() => router.push(ROUTES.notes)}
          />
        </View>

        <View style={styles.spacer} />

        <View style={styles.bottomButtons}>
          <BottomButton
            title="Numery alarmowe"
            iconName="call-outline"
            backgroundColor="#2563FF"
            onPress={() => router.push(ROUTES.emergency)}
          />
          <BottomButton
            title="Sygnał SOS"
            iconName="warning-outline"
            backgroundColor="#FF2D3D"
            onPress={() => router.push(ROUTES.sos)}
          />
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 36,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 25,
  },
  menu: {
    gap: 20,
    marginTop: 44,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    flexDirection: "row",
    minHeight: 112,
    paddingHorizontal: 32,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  iconCircle: {
    alignItems: "center",
    backgroundColor: "#DCEBFF",
    borderRadius: 32,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  cardText: {
    color: "#0B1F3A",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 24,
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  bottomButtons: {
    gap: 18,
  },
  bottomButton: {
    alignItems: "center",
    borderRadius: 18,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 82,
    paddingHorizontal: 18,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
  bottomButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 14,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
