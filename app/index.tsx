import useTheme from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Dining Management</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Pilih role untuk masuk ke sistem.
        </Text>
      </View>

      <View style={styles.cardList}>
        <Link href="/(admin)" asChild>
          <TouchableOpacity
            style={[styles.roleCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Text style={[styles.roleTitle, { color: colors.text }]}>Admin</Text>
            <Text style={[styles.roleMeta, { color: colors.textMuted }]}>
              Kelola menu, stok, statistik, feedback, dan saran.
            </Text>
            <View style={[styles.roleButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.roleButtonText}>Masuk sebagai Admin</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/(student)" asChild>
          <TouchableOpacity
            style={[styles.roleCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Text style={[styles.roleTitle, { color: colors.text }]}>Mahasiswa</Text>
            <Text style={[styles.roleMeta, { color: colors.textMuted }]}>
              Lihat menu, rating makanan, feedback, dan saran.
            </Text>
            <View style={[styles.roleButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.roleButtonText}>Masuk sebagai Mahasiswa</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 60,
    gap: 20,
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
  cardList: {
    gap: 14,
  },
  roleCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  roleMeta: {
    fontSize: 13,
  },
  roleButton: {
    marginTop: 6,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  roleButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },
});
