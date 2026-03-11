import useTheme from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const MealCardScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Kartu Makan</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Input data anak asrama dan outsider.
      </Text>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Nama Mahasiswa</Text>
        <TextInput
          placeholder="Nama lengkap"
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />

        <Text style={[styles.label, { color: colors.textMuted }]}>Kategori</Text>
        <TextInput
          placeholder="Asrama / Outsider"
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
      </View>
    </View>
  );
};

export default MealCardScreen;

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
  form: {
    marginTop: 12,
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});
