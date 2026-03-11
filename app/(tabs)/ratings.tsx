import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RatingsScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const ratings = useQuery(api.ratings.getRatingsByDate, { date: today }) ?? [];
  const addRating = useMutation(api.ratings.addRating);
  const [menuName, setMenuName] = React.useState("");
  const [score, setScore] = React.useState(0);

  const avg =
    ratings.length === 0 ? 0 : ratings.reduce((sum, item) => sum + item.score, 0) / ratings.length;

  const handleSubmit = async () => {
    if (!menuName.trim() || score === 0) return;
    await addRating({ menuName: menuName.trim(), score, date: today });
    setMenuName("");
    setScore(0);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Rating Makanan</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Beri penilaian untuk menu hari ini.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Input Rating</Text>
        <TextInput
          placeholder="Nama menu"
          placeholderTextColor={colors.textMuted}
          value={menuName}
          onChangeText={setMenuName}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
        <Text style={[styles.cardMeta, { color: colors.textMuted }]}>Pilih rating</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setScore(item)}
              style={[
                styles.ratingChip,
                {
                  borderColor: item === score ? colors.primary : colors.border,
                  backgroundColor: colors.backgrounds.input,
                },
              ]}
            >
              <Text
                style={[
                  styles.ratingText,
                  { color: item === score ? colors.primary : colors.text },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Rating</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Ringkasan Hari Ini</Text>
        <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
          Rata-rata: {avg.toFixed(1)} • Total: {ratings.length}
        </Text>
      </View>
    </View>
  );
};

export default RatingsScreen;

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
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardMeta: {
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  ratingChip: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
