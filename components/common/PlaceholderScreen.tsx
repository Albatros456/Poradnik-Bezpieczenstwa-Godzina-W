import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { OutlineButton } from "./OutlineButton";

type PlaceholderScreenProps = {
  title: string;
};

export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.home);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <OutlineButton label="Wróć" onPress={handleBack} style={styles.backButton} />
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
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    marginBottom: 32,
    textAlign: "center",
  },
  backButton: {
    minHeight: 56,
    minWidth: 140,
  },
});
