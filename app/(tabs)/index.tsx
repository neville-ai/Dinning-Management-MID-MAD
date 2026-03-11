import useTheme from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IndexScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Dinning Dashboard</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Ringkasan fitur admin dan mahasiswa.
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Admin</Text>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/menu">
          Kelola Menu
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/stock">
          Input Stok
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/stats">
          Statistik Makan & Rating
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/feedback-admin">
          Lihat Feedback Harian
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/suggestions-admin">
          Lihat Kotak Saran
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mahasiswa</Text>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/menu">
          Menu Hari Ini
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/ratings">
          Rating Makanan
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/feedback">
          Kirim Feedback
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/suggestions">
          Kirim Saran
        </Link>
        <Link style={[styles.link, { color: colors.primary }]} href="/(tabs)/meal-card">
          Input Kartu Makan
        </Link>
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  section: {
    marginTop: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    fontSize: 14,
  },
});
