import useTheme from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const SuggestionsScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Kotak Saran</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Kirim saran untuk perbaikan dining.
      </Text>

      <TextInput
        placeholder="Tulis saran kamu..."
        placeholderTextColor={colors.textMuted}
        multiline
        style={[
          styles.input,
          { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
        ]}
      />
    </View>
  );
};

export default SuggestionsScreen;

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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    marginTop: 12,
  },
});
