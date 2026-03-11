import useTheme from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FeedbackAdminScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Feedback Harian</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Hanya admin yang dapat melihat.
      </Text>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Hari ini</Text>
        <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
          Makanan enak, antrean cukup panjang.
        </Text>
      </View>
    </View>
  );
};

export default FeedbackAdminScreen;

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
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardMeta: {
    fontSize: 13,
    marginTop: 4,
  },
});
