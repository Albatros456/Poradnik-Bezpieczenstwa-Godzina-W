import { createAudioPlayer } from "expo-audio";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SosMode = "latarka" | "ekran" | "dzwiek";
type SosStep = {
  type: "on" | "off";
  duration: number;
};

const sosPattern: SosStep[] = [
  { type: "on", duration: 250 },
  { type: "off", duration: 250 },
  { type: "on", duration: 250 },
  { type: "off", duration: 250 },
  { type: "on", duration: 250 },
  { type: "off", duration: 700 },

  { type: "on", duration: 750 },
  { type: "off", duration: 250 },
  { type: "on", duration: 750 },
  { type: "off", duration: 250 },
  { type: "on", duration: 750 },
  { type: "off", duration: 700 },

  { type: "on", duration: 250 },
  { type: "off", duration: 250 },
  { type: "on", duration: 250 },
  { type: "off", duration: 250 },
  { type: "on", duration: 250 },
  { type: "off", duration: 1500 },
];

export default function SosScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const audioPlayerRef = useRef<ReturnType<typeof createAudioPlayer> | null>(
    null,
  );
  const audioPlayerReleasedRef = useRef(false);

  if (!audioPlayerRef.current) {
    audioPlayerRef.current = createAudioPlayer(
      require("../../assets/sounds/beep.wav"),
      { downloadFirst: true },
    );
  }

  const [isRunning, setIsRunning] = useState(false);
  const [activeMode, setActiveMode] = useState<SosMode | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [screenFlashOn, setScreenFlashOn] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isRunningRef = useRef(false);
  const activeModeRef = useRef<SosMode | null>(null);

  const clearSosTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  const stopAudio = () => {
    if (audioPlayerReleasedRef.current || !audioPlayerRef.current) {
      return;
    }

    try {
      audioPlayerRef.current.pause();
      void audioPlayerRef.current.seekTo(0).catch(() => {});
    } catch {
      // Audio may already be released while the screen is closing.
    }
  };

  const stopSos = (updateScreen = true) => {
    isRunningRef.current = false;
    activeModeRef.current = null;
    clearSosTimeouts();
    stopAudio();

    if (updateScreen) {
      setIsRunning(false);
      setActiveMode(null);
      setTorchOn(false);
      setScreenFlashOn(false);
    }
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
  };

  const playAudioBeep = () => {
    if (audioPlayerReleasedRef.current || !audioPlayerRef.current) {
      return;
    }

    void audioPlayerRef.current
      .seekTo(0)
      .then(() => {
        if (
          isRunningRef.current &&
          activeModeRef.current === "dzwiek" &&
          audioPlayerRef.current &&
          !audioPlayerReleasedRef.current
        ) {
          audioPlayerRef.current.play();
        }
      })
      .catch(() => {});
  };

  const setSignalOn = () => {
    if (activeModeRef.current === "latarka") {
      setTorchOn(true);
    }

    if (activeModeRef.current === "ekran") {
      setScreenFlashOn(true);
    }

    if (activeModeRef.current === "dzwiek") {
      playAudioBeep();
    }
  };

  const setSignalOff = () => {
    setTorchOn(false);
    setScreenFlashOn(false);

    if (activeModeRef.current === "dzwiek") {
      stopAudio();
    }
  };

  const runSosSequence = () => {
    if (!isRunningRef.current) {
      return;
    }

    let delay = 0;

    sosPattern.forEach((step) => {
      addTimeout(() => {
        if (!isRunningRef.current) {
          return;
        }

        if (step.type === "on") {
          setSignalOn();
        } else {
          setSignalOff();
        }
      }, delay);

      delay += step.duration;
    });

    addTimeout(runSosSequence, delay);
  };

  const startSos = async (mode: SosMode) => {
    stopSos();

    if (mode === "latarka" && !permission?.granted) {
      const newPermission = await requestPermission();

      if (!newPermission.granted) {
        Alert.alert(
          "Brak uprawnień do kamery. Latarka nie może zostać użyta.",
        );
        return;
      }
    }

    activeModeRef.current = mode;
    isRunningRef.current = true;
    setActiveMode(mode);
    setIsRunning(true);
    runSosSequence();
  };

  useEffect(() => {
    return () => {
      stopSos(false);

      if (audioPlayerRef.current && !audioPlayerReleasedRef.current) {
        audioPlayerRef.current.remove();
        audioPlayerReleasedRef.current = true;
      }
    };
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[styles.safeArea, screenFlashOn && styles.safeAreaFlashing]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sygnał SOS</Text>
        <Text style={styles.description}>
          Nadaj sygnał SOS za pomocą latarki, ekranu lub dźwięku.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            SOS = trzy krótkie, trzy długie, trzy krótkie
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

        {isRunning ? (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>Sygnał SOS jest aktywny</Text>
            <Text style={styles.statusMode}>Aktywny tryb: {activeMode}</Text>
          </View>
        ) : null}

        <View style={styles.buttons}>
          <Pressable
            accessibilityRole="button"
            onPress={() => void startSos("latarka")}
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}
          >
            <Text style={styles.modeButtonText}>SOS latarką</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => void startSos("ekran")}
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}
          >
            <Text style={styles.modeButtonText}>SOS ekranem</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => void startSos("dzwiek")}
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}
          >
            <Text style={styles.modeButtonText}>SOS dźwiękiem</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => stopSos()}
            style={({ pressed }) => [styles.stopButton, pressed && styles.pressed]}
          >
            <Text style={styles.stopButtonText}>Zatrzymaj</Text>
          </Pressable>
        </View>

        <Text style={styles.warningText}>
          Sygnał SOS jest funkcją pomocniczą. W sytuacji bezpośredniego
          zagrożenia zadzwoń pod numer 112.
        </Text>
      </ScrollView>

      {permission?.granted ? (
        <CameraView
          active={isRunning && activeMode === "latarka"}
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
    paddingTop: 12,
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
  statusCard: {
    backgroundColor: "#E7F0FF",
    borderRadius: 16,
    marginTop: 18,
    padding: 16,
  },
  statusText: {
    color: "#0B1F3A",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  statusMode: {
    color: "#2563FF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
  },
  buttons: {
    gap: 12,
    marginTop: 22,
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: "#FF2D3D",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 58,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  modeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  stopButton: {
    alignItems: "center",
    backgroundColor: "#0B1F3A",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 58,
  },
  stopButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
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
