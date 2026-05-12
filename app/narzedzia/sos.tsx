import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const sosPattern = [250, 250, 250, 750, 750, 750, 250, 250, 250];

export default function SosScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isRunning, setIsRunning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [screenFlashOn, setScreenFlashOn] = useState(false);
  const [useTorch, setUseTorch] = useState(true);
  const [useScreen, setUseScreen] = useState(true);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isRunningRef = useRef(false);
  const activeTorchRef = useRef(false);
  const activeScreenRef = useRef(false);

  const clearSosTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  const stopSos = () => {
    isRunningRef.current = false;
    clearSosTimeouts();
    setIsRunning(false);
    setTorchOn(false);
    setScreenFlashOn(false);
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
  };

  const setSignalState = (enabled: boolean) => {
    if (activeTorchRef.current) {
      setTorchOn(enabled);
    }

    if (activeScreenRef.current) {
      setScreenFlashOn(enabled);
    }
  };

  const runSosSequence = () => {
    if (!isRunningRef.current) {
      return;
    }

    let delay = 0;

    sosPattern.forEach((signalDuration) => {
      addTimeout(() => setSignalState(true), delay);
      delay += signalDuration;
      addTimeout(() => setSignalState(false), delay);
      delay += 250;
    });

    addTimeout(runSosSequence, delay + 1200);
  };

  const startSos = async () => {
    let canUseTorch = useTorch;

    if (useTorch && !permission?.granted) {
      const newPermission = await requestPermission();
      canUseTorch = newPermission.granted;

      if (!newPermission.granted) {
        Alert.alert(
          "Brak uprawnień do kamery. Latarka nie może zostać użyta.",
        );
      }
    }

    if (!canUseTorch && !useScreen) {
      Alert.alert("Włącz ekran albo latarkę, aby uruchomić sygnał SOS.");
      return;
    }

    activeTorchRef.current = canUseTorch;
    activeScreenRef.current = useScreen;
    isRunningRef.current = true;
    setIsRunning(true);
    runSosSequence();
  };

  useEffect(() => {
    return () => {
      isRunningRef.current = false;
      clearSosTimeouts();
      setTorchOn(false);
      setScreenFlashOn(false);
    };
  }, []);

  const handleMainButtonPress = () => {
    if (isRunning) {
      stopSos();
      return;
    }

    void startSos();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, screenFlashOn && styles.safeAreaFlashing]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sygnał SOS</Text>
        <Text style={styles.description}>
          Nadaj sygnał SOS za pomocą latarki, ekranu lub dźwięku.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            SOS w alfabecie Morse’a: 3 krótkie, 3 długie, 3 krótkie
          </Text>
        </View>

        <View
          style={[
            styles.flashCard,
            screenFlashOn ? styles.flashCardOn : styles.flashCardOff,
          ]}
        >
          <Text
            style={[
              styles.flashText,
              screenFlashOn ? styles.flashTextOn : styles.flashTextOff,
            ]}
          >
            SOS
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleMainButtonPress}
          style={({ pressed }) => [
            styles.mainButton,
            isRunning && styles.stopButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.mainButtonText}>
            {isRunning ? "Zatrzymaj SOS" : "Uruchom SOS"}
          </Text>
        </Pressable>

        <View style={styles.modeButtons}>
          <Pressable
            accessibilityRole="button"
            disabled={isRunning}
            onPress={() => setUseTorch((currentValue) => !currentValue)}
            style={[
              styles.modeButton,
              useTorch && styles.modeButtonActive,
              isRunning && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.modeButtonText,
                useTorch && styles.modeButtonTextActive,
              ]}
            >
              Latarka
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={isRunning}
            onPress={() => setUseScreen((currentValue) => !currentValue)}
            style={[
              styles.modeButton,
              useScreen && styles.modeButtonActive,
              isRunning && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.modeButtonText,
                useScreen && styles.modeButtonTextActive,
              ]}
            >
              Ekran
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              Alert.alert("Dźwięk SOS zostanie dodany w kolejnym etapie.")
            }
            style={[styles.modeButton, styles.disabledButton]}
          >
            <Text style={styles.modeButtonText}>Dźwięk</Text>
          </Pressable>
        </View>

        <Text style={styles.warningText}>
          Sygnał SOS jest funkcją pomocniczą. W sytuacji bezpośredniego
          zagrożenia zadzwoń pod numer 112.
        </Text>
      </ScrollView>

      {permission?.granted ? (
        <CameraView
          active={isRunning}
          enableTorch={torchOn}
          facing="back"
          style={styles.hiddenCamera}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  safeAreaFlashing: {
    backgroundColor: "#FFE5E8",
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
  infoCard: {
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
  infoText: {
    color: "#0B1F3A",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 26,
    textAlign: "center",
  },
  flashCard: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 130,
  },
  flashCardOff: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
  },
  flashCardOn: {
    backgroundColor: "#FF2D3D",
    borderColor: "#FF2D3D",
  },
  flashText: {
    fontSize: 44,
    fontWeight: "800",
  },
  flashTextOff: {
    color: "#0B1F3A",
  },
  flashTextOn: {
    color: "#FFFFFF",
  },
  mainButton: {
    alignItems: "center",
    backgroundColor: "#FF2D3D",
    borderRadius: 18,
    justifyContent: "center",
    marginTop: 22,
    minHeight: 66,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  stopButton: {
    backgroundColor: "#0B1F3A",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  modeButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 8,
  },
  modeButtonActive: {
    backgroundColor: "#E7F0FF",
    borderColor: "#2563FF",
  },
  modeButtonText: {
    color: "#0B1F3A",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  modeButtonTextActive: {
    color: "#2563FF",
  },
  disabledButton: {
    opacity: 0.65,
  },
  warningText: {
    color: "#35465F",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 24,
    textAlign: "center",
  },
  hiddenCamera: {
    height: 1,
    opacity: 0,
    position: "absolute",
    width: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
