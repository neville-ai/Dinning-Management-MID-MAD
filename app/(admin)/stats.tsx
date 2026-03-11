import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StatsScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const stats = useQuery(api.stats.getDailyStats, { date: today });

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Statistik Harian</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Ringkasan aktivitas makan dan rating hari ini.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.primary + "1A" }]}>
            <Ionicons name="people" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.cardValue, { color: colors.text }]}>
              {stats?.dorm ?? 0}
            </Text>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Penghuni Asrama</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.warning + "1A" }]}>
            <Ionicons name="walk" size={20} color={colors.warning} />
          </View>
          <View>
            <Text style={[styles.cardValue, { color: colors.text }]}>
              {stats?.outsider ?? 0}
            </Text>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Outsider</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.success + "1A" }]}>
            <Ionicons name="star" size={20} color={colors.success} />
          </View>
          <View>
            <Text style={[styles.cardValue, { color: colors.text }]}>
              {(stats?.ratingAvg ?? 0).toFixed(1)}
            </Text>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Rata-rata Rating</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.danger + "1A" }]}>
            <Ionicons name="chatbubbles" size={20} color={colors.danger} />
          </View>
          <View>
            <Text style={[styles.cardValue, { color: colors.text }]}>
              {stats?.feedbackCount ?? 0}
            </Text>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>Total Feedback</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 110,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
  },
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 26,
    fontWeight: "800",
  },
});
