import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
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
        <Ionicons name={iconName} size={28} color={colors.primary} />
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
            title="Mapy"
            iconName="map-outline"
            onPress={() => router.push(ROUTES.map)}
          />
          <MenuCard
            title="Notatnik"
            iconName="create-outline"
            onPress={() => router.push(ROUTES.notes)}
          />
          <MenuCard
            title="Plan kryzysowy"
            iconName="people-outline"
            onPress={() => router.push(ROUTES.crisisPlan)}
          />
          <MenuCard
            title="Spakuj plecak"
            iconName="bag-outline"
            onPress={() => router.push(ROUTES.packBackpack)}
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
    backgroundColor: colors.background,
  },
  container: {
    alignSelf: "center",
    flexGrow: 1,
    maxWidth: 720,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    width: "100%",
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 39,
    marginTop: 12,
    textAlign: "center",
  },
  menu: {
    gap: 14,
    marginTop: 32,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    minHeight: 96,
    paddingHorizontal: 20,
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
  cardText: {
    color: colors.text,
    flex: 1,
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 25,
    marginLeft: 18,
  },
  spacer: {
    flex: 1,
    minHeight: 28,
  },
  bottomButtons: {
    gap: 12,
  },
  bottomButton: {
    alignItems: "center",
    borderRadius: 18,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 66,
    paddingHorizontal: 18,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  bottomButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.82,
  },
});
