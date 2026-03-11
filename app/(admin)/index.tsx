import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AdminDashboard = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>Selamat Datang,</Text>
          <Text style={[styles.title, { color: colors.text }]}>Admin Dining</Text>
        </View>
        <TouchableOpacity style={[styles.avatar, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>AD</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.heroCard, { backgroundColor: colors.primary, shadowColor: colors.shadow }]}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <Text style={styles.badgeText}>Admin Active</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Dining Management</Text>
        <Text style={styles.heroMeta}>
          Kelola menu, stok, statistik, feedback, dan saran dengan cepat.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu Utama</Text>
        <View style={styles.grid}>
          <View style={[styles.gridCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={[styles.iconWrap, { backgroundColor: colors.primary + "1A" }]}>
              <Ionicons name="restaurant-outline" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.listTitle, { color: colors.text }]}>Kelola Menu</Text>
          </View>
          <View style={[styles.gridCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={[styles.iconWrap, { backgroundColor: colors.warning + "1A" }]}>
              <Ionicons name="cube-outline" size={24} color={colors.warning} />
            </View>
            <Text style={[styles.listTitle, { color: colors.text }]}>Input Stok</Text>
          </View>
        </View>

        <View style={styles.list}>
          <View style={[styles.listCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={[styles.listIconWrap, { backgroundColor: colors.success + "1A" }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.success} />
            </View>
            <View style={styles.listContent}>
              <Text style={[styles.listTitle, { color: colors.text }]}>Feedback</Text>
              <Text style={[styles.listMeta, { color: colors.textMuted }]}>Lihat ulasan hari ini</Text>
            </View>
          </View>
          <View style={[styles.listCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={[styles.listIconWrap, { backgroundColor: colors.primary + "1A" }]}>
              <Ionicons name="mail-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.listContent}>
              <Text style={[styles.listTitle, { color: colors.text }]}>Kotak Saran</Text>
              <Text style={[styles.listMeta, { color: colors.textMuted }]}>Masukan konstruktif mhs</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 110, // Account for floating tab bar
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatarText: {
    fontWeight: "800",
    fontSize: 18,
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    gap: 12,
    elevation: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  badgeRow: {
    flexDirection: "row",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
  },
  heroMeta: {
    color: "#e2e8f0",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  heroButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
  },
  heroButtonText: {
    color: "#1e293b",
    fontSize: 13,
    fontWeight: "700",
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  gridCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    gap: 12,
  },
  listCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  listIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    flex: 1,
    gap: 4,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  listMeta: {
    fontSize: 13,
  },
});
