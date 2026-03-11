import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StudentMenuScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const menus = useQuery(api.menus.getMenusByDate, { date: today }) ?? [];

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Menu Hari Ini</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Lihat menu yang tersedia hari ini.
        </Text>
      </View>

      <Link href="/(student)/meal-card" asChild>
        <TouchableOpacity style={[styles.primaryAction, { backgroundColor: colors.primary }]}>
          <Ionicons name="id-card-outline" size={20} color="#fff" />
          <Text style={styles.primaryActionText}>Input Kartu Makan</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.section}>
        {menus.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada menu hari ini.</Text>
        ) : (
          menus.map((item) => (
            <View
              key={item._id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrap, { backgroundColor: colors.primary + "1A" }]}>
                  <Ionicons name="restaurant" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>{item.name}</Text>
                  <Text style={[styles.statusText, { color: colors.primary }]}>Tersedia</Text>
                </View>
              </View>
              <Text style={[styles.itemMeta, { color: colors.textMuted }]}>{item.description}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default StudentMenuScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 110,
    gap: 20,
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
  primaryAction: {
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  primaryActionText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  section: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  itemMeta: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
