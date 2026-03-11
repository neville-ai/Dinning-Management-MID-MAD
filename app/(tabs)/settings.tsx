import useTheme from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const { toggleDarkMode, colors, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Pengaturan tampilan aplikasi.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={toggleDarkMode}
      >
        <Text style={styles.buttonText}>
          {isDarkMode ? "Switch to Light" : "Switch to Dark"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
