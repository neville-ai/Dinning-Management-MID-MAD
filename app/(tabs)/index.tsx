import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IndexScreen = () => {
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
        <Text style={[styles.title, { color: colors.text }]}>Dinning Dashboard</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Ringkasan cepat untuk admin dan mahasiswa.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hari ini</Text>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Mahasiswa</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {stats?.dorm ?? 0}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Outsider</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {stats?.outsider ?? 0}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Rating</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {(stats?.ratingAvg ?? 0).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Aksi cepat</Text>
        <View style={styles.quickRow}>
          <Link href="/(tabs)/meal-card" asChild>
            <TouchableOpacity
              style={[styles.primaryAction, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.primaryActionText}>Input Kartu Makan</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/ratings" asChild>
            <TouchableOpacity
              style={[
                styles.secondaryAction,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.secondaryActionText, { color: colors.text }]}>Rating Makanan</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Admin</Text>
        <View style={styles.buttonGrid}>
          <Link href="/(tabs)/menu" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Kelola Menu</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Tambah & edit menu</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/stock" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Input Stok</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Bahan masuk</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/stats" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Statistik</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Makan & rating</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/feedback-admin" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Feedback</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Harian</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/suggestions-admin" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Kotak Saran</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Lihat saran</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mahasiswa</Text>
        <View style={styles.buttonGrid}>
          <Link href="/(tabs)/menu" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Menu Hari Ini</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Lihat menu</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/feedback" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Feedback</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Kirim harian</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/suggestions" asChild>
            <TouchableOpacity
              style={[styles.gridButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.gridTitle, { color: colors.text }]}>Kotak Saran</Text>
              <Text style={[styles.gridMeta, { color: colors.textMuted }]}>Kirim saran</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 40,
    gap: 18,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  quickRow: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryActionText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },
  secondaryAction: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryActionText: {
    fontWeight: "600",
    fontSize: 12,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridButton: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  gridMeta: {
    fontSize: 12,
  },
});
