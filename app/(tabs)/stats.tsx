import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatsScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const stats = useQuery(api.stats.getDailyStats, { date: today });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Statistik Makan</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Jumlah mahasiswa makan dan rating per hari.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Mahasiswa</Text>
          <Text style={[styles.cardValue, { color: colors.text }]}>
            {stats?.dorm ?? 0}
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Outsider</Text>
          <Text style={[styles.cardValue, { color: colors.text }]}>
            {stats?.outsider ?? 0}
          </Text>
        </View>
      </View>

      <View style={[styles.cardWide, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Rating Rata-rata</Text>
        <Text style={[styles.cardValue, { color: colors.text }]}>
          {(stats?.ratingAvg ?? 0).toFixed(1)} / 5
        </Text>
        <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
          Feedback: {stats?.feedbackCount ?? 0} • Saran: {stats?.suggestionCount ?? 0}
        </Text>
      </View>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 50,
    gap: 16,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  cardWide: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  cardMeta: {
    fontSize: 13,
  },
});
