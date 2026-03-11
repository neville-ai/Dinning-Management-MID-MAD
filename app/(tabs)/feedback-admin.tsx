import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FeedbackAdminScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const feedbacks = useQuery(api.feedbacks.getFeedbacksByDate, { date: today }) ?? [];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Feedback Harian</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Hanya admin yang dapat melihat.
        </Text>
      </View>

      <View style={styles.list}>
        {feedbacks.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada feedback hari ini.</Text>
        ) : (
          feedbacks.map((item) => (
            <View
              key={item._id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {item.studentName || "Mahasiswa"}
              </Text>
              <Text style={[styles.cardMeta, { color: colors.textMuted }]}>{item.message}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default FeedbackAdminScreen;

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
  list: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardMeta: {
    fontSize: 13,
  },
  emptyText: {
    fontSize: 13,
  },
});
