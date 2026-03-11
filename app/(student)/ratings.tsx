import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Rating Makanan</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Beri penilaian untuk menu hari ini.
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Menu yang dinilai</Text>
          <TextInput
            placeholder="Contoh: Ayam Bakar"
            placeholderTextColor={colors.textMuted}
            value={menuName}
            onChangeText={setMenuName}
            inputMode="text"
            keyboardType="visible-password"
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            importantForAutofill="no"
            contextMenuHidden={true}
            caretHidden={true}
            selectTextOnFocus={false}
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Pilih Rating (1-5)</Text>
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
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Penilaian</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={[styles.iconWrap, { backgroundColor: colors.warning + "1A" }]}>
          <Ionicons name="star" size={24} color={colors.warning} />
        </View>
        <View style={styles.summaryContent}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>Rata-rata Penilaian</Text>
          <Text style={[styles.summaryMeta, { color: colors.textMuted }]}>
            <Text style={{ fontWeight: "700", color: colors.text }}>{avg.toFixed(1)}</Text> dari {ratings.length} suara hari ini
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RatingsScreen;

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
  formCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  ratingChip: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  summaryCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    alignItems: "center",
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryContent: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  summaryMeta: {
    fontSize: 14,
  },
});
