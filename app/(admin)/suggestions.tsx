import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuggestionsAdminScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const suggestions = useQuery(api.suggestions.getSuggestionsByDate, { date: today }) ?? [];

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kotak Saran</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Pesan dan saran membangun dari mahasiswa.
        </Text>
      </View>

      <View style={styles.list}>
        {suggestions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-unread-outline" size={48} color={colors.textMuted} style={{ opacity: 0.5 }} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada saran hari ini.</Text>
          </View>
        ) : (
          suggestions.map((item) => (
            <View
              key={item._id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.avatar, { backgroundColor: colors.primary + "1A" }]}>
                  <Text style={[styles.avatarText, { color: colors.primary }]}>
                    {(item.studentName || "M")[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {item.studentName || "Mahasiswa"}
                  </Text>
                  <Text style={[styles.cardDate, { color: colors.textMuted }]}>{item.date}</Text>
                </View>
              </View>
              <View style={[styles.messageBubble, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                <Text style={[styles.cardMeta, { color: colors.text }]}>{item.message}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default SuggestionsAdminScreen;

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
  list: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
  userInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  cardDate: {
    fontSize: 12,
    marginTop: 2,
  },
  messageBubble: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  cardMeta: {
    fontSize: 14,
    lineHeight: 22,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 16,
  },
  emptyText: {
    fontSize: 15,
    fontStyle: "italic",
  },
});
