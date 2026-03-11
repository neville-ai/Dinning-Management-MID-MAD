import useTheme from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MenuScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Menu Hari Ini</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Daftar menu untuk mahasiswa.
      </Text>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>Nasi Ayam</Text>
        <Text style={[styles.itemMeta, { color: colors.textMuted }]}>
          Protein utama • 1 porsi
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>Sayur Sop</Text>
        <Text style={[styles.itemMeta, { color: colors.textMuted }]}>
          Sayur harian • 1 porsi
        </Text>
      </View>
    </View>
  );
};

export default MenuScreen;

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
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemMeta: {
    fontSize: 13,
    marginTop: 4,
  },
});
