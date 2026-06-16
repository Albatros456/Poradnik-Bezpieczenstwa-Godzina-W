import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

const baseItems = [
  "Woda butelkowana",
  "Filtr lub tabletki do uzdatniania wody",
  "Żywność gotowa do spożycia",
  "Apteczka",
  "Leki osobiste",
  "Dokumenty",
  "Kopie dokumentów na pendrivie",
  "Gotówka w różnych nominałach",
  "Latarka",
  "Radio na baterie lub na korbkę",
  "Naładowany telefon",
  "Powerbank",
  "Ładowarka i kable",
  "Zapasowe baterie",
  "Odzież przeciwdeszczowa",
  "Ciepła odzież",
  "Śpiwór",
  "Karimata",
  "Folia termiczna",
  "Środki higieniczne",
  "Środki do dezynfekcji",
  "Worki na śmieci",
  "Scyzoryk lub multitool",
  "Zapalniczka",
  "Papierowa mapa",
];

const childItems = [
  "Dane kontaktowe opiekunów",
  "Mała przekąska dla dziecka",
  "Lekki koc lub bluza",
  "Mała zabawka albo przedmiot dający poczucie bezpieczeństwa",
  "Leki dziecka, jeśli są potrzebne",
];

const petItems = [
  "Karma dla zwierzęcia",
  "Woda dla zwierzęcia",
  "Miska",
  "Smycz, szelki lub transporter",
  "Dokumentacja zdrowotna zwierzęcia",
  "Leki zwierzęcia, jeśli są potrzebne",
];

const medicineItems = [
  "Zapas stale przyjmowanych leków",
  "Lista leków z dawkowaniem",
  "Informacja o chorobach i alergiach",
  "Dokumentacja medyczna",
];

function createChecklistItem(label: string): ChecklistItem {
  return {
    id: label.toLowerCase().replaceAll(" ", "-"),
    label,
    checked: false,
  };
}

export default function PackBackpackScreen() {
  const [peopleCount, setPeopleCount] = useState(1);
  const [hasChildren, setHasChildren] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [hasMedicines, setHasMedicines] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const packedCount = useMemo(
    () => checklist.filter((item) => item.checked).length,
    [checklist],
  );

  const generateChecklist = () => {
    const labels = [
      `Woda butelkowana dla ${peopleCount} os.`,
      ...baseItems.filter((item) => item !== "Woda butelkowana"),
      ...(hasChildren ? childItems : []),
      ...(hasPets ? petItems : []),
      ...(hasMedicines ? medicineItems : []),
    ];

    setChecklist(labels.map(createChecklistItem));
  };

  const toggleItem = (id: string) => {
    setChecklist((currentChecklist) =>
      currentChecklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Spakuj plecak</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Liczba osób</Text>
          <View style={styles.counterRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setPeopleCount((value) => Math.max(1, value - 1))}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <Ionicons name="remove" size={24} color={colors.primary} />
            </Pressable>
            <Text style={styles.counterValue}>{peopleCount}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setPeopleCount((value) => Math.min(12, value + 1))}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.options}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>W rodzinie są dzieci</Text>
            <Switch onValueChange={setHasChildren} value={hasChildren} />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Są zwierzęta</Text>
            <Switch onValueChange={setHasPets} value={hasPets} />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Ktoś stale przyjmuje leki</Text>
            <Switch onValueChange={setHasMedicines} value={hasMedicines} />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={generateChecklist}
          style={({ pressed }) => [styles.generateButton, pressed && styles.pressed]}
        >
          <Text style={styles.generateButtonText}>Wygeneruj listę</Text>
        </Pressable>

        {checklist.length > 0 ? (
          <View style={styles.list}>
            <Text style={styles.progress}>
              Spakowano {packedCount} z {checklist.length}
            </Text>
            {checklist.map((item) => (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.checked }}
                key={item.id}
                onPress={() => toggleItem(item.id)}
                style={({ pressed }) => [
                  styles.checklistRow,
                  item.checked && styles.checklistRowChecked,
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                  {item.checked ? (
                    <Ionicons name="checkmark" size={18} color={colors.white} />
                  ) : null}
                </View>
                <Text
                  style={[
                    styles.checklistText,
                    item.checked && styles.checklistTextChecked,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
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
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  counterRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.surfaceAccent,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  counterValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    minWidth: 74,
    textAlign: "center",
  },
  options: {
    gap: 12,
    marginBottom: 16,
  },
  optionRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionText: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginRight: 12,
  },
  generateButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    minHeight: 54,
  },
  generateButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  list: {
    gap: 10,
    marginTop: 22,
  },
  progress: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  checklistRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  checklistRowChecked: {
    backgroundColor: colors.surfaceAccent,
    borderColor: colors.primary,
  },
  checkbox: {
    alignItems: "center",
    borderColor: colors.primary,
    borderRadius: 7,
    borderWidth: 2,
    height: 26,
    justifyContent: "center",
    marginRight: 12,
    width: 26,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checklistText: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
  },
  checklistTextChecked: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  pressed: {
    opacity: 0.82,
  },
});
