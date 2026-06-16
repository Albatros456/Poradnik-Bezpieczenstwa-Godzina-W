import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";

const CRISIS_PLAN_STORAGE_KEY = "poradnik_bezpieczenstwa_crisis_plan";

type CrisisPlan = {
  householdContacts: string;
  outsideContact: string;
  nearbyMeetingPlace: string;
  outsideTownMeetingPlace: string;
  medicalInfo: string;
  importantPhones: string;
  importantItems: string;
  notes: string;
};

type FieldConfig = {
  key: keyof CrisisPlan;
  label: string;
  placeholder: string;
};

const emptyPlan: CrisisPlan = {
  householdContacts: "",
  outsideContact: "",
  nearbyMeetingPlace: "",
  outsideTownMeetingPlace: "",
  medicalInfo: "",
  importantPhones: "",
  importantItems: "",
  notes: "",
};

const fields: FieldConfig[] = [
  {
    key: "householdContacts",
    label: "Dane kontaktowe domowników",
    placeholder: "Imiona, telefony, adresy e-mail",
  },
  {
    key: "outsideContact",
    label: "Osoba kontaktowa poza miejscem zamieszkania",
    placeholder: "Imię, telefon, miejscowość",
  },
  {
    key: "nearbyMeetingPlace",
    label: "Miejsce spotkania w najbliższej okolicy",
    placeholder: "Np. wejście do szkoły, sklep, przystanek",
  },
  {
    key: "outsideTownMeetingPlace",
    label: "Miejsce spotkania poza miejscowością",
    placeholder: "Adres lub opis miejsca",
  },
  {
    key: "medicalInfo",
    label: "Choroby, alergie i stale przyjmowane leki",
    placeholder: "Najważniejsze informacje medyczne",
  },
  {
    key: "importantPhones",
    label: "Ważne telefony",
    placeholder: "Lekarz, szkoła, praca, sąsiedzi",
  },
  {
    key: "importantItems",
    label: "Lista najważniejszych rzeczy i gdzie są przechowywane",
    placeholder: "Dokumenty, apteczka, zapasy, gotówka",
  },
  {
    key: "notes",
    label: "Dodatkowe notatki",
    placeholder: "Inne ustalenia rodzinne",
  },
];

export default function CrisisPlanScreen() {
  const [plan, setPlan] = useState<CrisisPlan>(emptyPlan);

  useEffect(() => {
    void AsyncStorage.getItem(CRISIS_PLAN_STORAGE_KEY)
      .then((savedPlan) => {
        if (savedPlan) {
          setPlan({ ...emptyPlan, ...(JSON.parse(savedPlan) as Partial<CrisisPlan>) });
        }
      })
      .catch(() => {
        Alert.alert("Błąd", "Nie udało się wczytać zapisanego planu.");
      });
  }, []);

  const updateField = (key: keyof CrisisPlan, value: string) => {
    setPlan((currentPlan) => ({ ...currentPlan, [key]: value }));
  };

  const savePlan = async () => {
    await AsyncStorage.setItem(CRISIS_PLAN_STORAGE_KEY, JSON.stringify(plan));
    Alert.alert("Zapisano", "Plan kryzysowy został zapisany.");
  };

  const clearPlan = () => {
    Alert.alert(
      "Wyczyścić plan?",
      "Zapisane dane planu kryzysowego zostaną usunięte.",
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Wyczyść",
          style: "destructive",
          onPress: () => {
            void AsyncStorage.removeItem(CRISIS_PLAN_STORAGE_KEY).then(() => {
              setPlan(emptyPlan);
            });
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plan kryzysowy</Text>

        <View style={styles.form}>
          {fields.map((field) => (
            <View key={field.key} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                multiline
                onChangeText={(value) => updateField(field.key, value)}
                placeholder={field.placeholder}
                placeholderTextColor="#6B7A90"
                style={styles.input}
                textAlignVertical="top"
                value={plan[field.key]}
              />
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => void savePlan()}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
        >
          <Text style={styles.saveButtonText}>Zapisz plan</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={clearPlan}
          style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
        >
          <Text style={styles.clearButtonText}>Wyczyść plan</Text>
        </Pressable>
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
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 92,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    marginTop: 22,
    minHeight: 54,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 12,
    minHeight: 54,
  },
  clearButtonText: {
    color: colors.danger,
    fontSize: 17,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
