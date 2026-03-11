import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuggestionsScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const suggestions = useQuery(api.suggestions.getSuggestionsByDate, { date: today }) ?? [];
  const addSuggestion = useMutation(api.suggestions.addSuggestion);
  const [message, setMessage] = React.useState("");
  const [studentName, setStudentName] = React.useState("");

  const handleSubmit = async () => {
    if (!message.trim()) return;
    await addSuggestion({
      message: message.trim(),
      date: today,
      studentName: studentName.trim() ? studentName.trim() : undefined,
    });
    setMessage("");
    setStudentName("");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kotak Saran</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Kirim saran untuk perbaikan dining.
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Nama (opsional)</Text>
          <TextInput
            placeholder="Nama mahasiswa"
            placeholderTextColor={colors.textMuted}
            value={studentName}
            onChangeText={setStudentName}
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
              styles.inputSmall,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Saran</Text>
          <TextInput
            placeholder="Tulis saran kamu..."
            placeholderTextColor={colors.textMuted}
            multiline
            value={message}
            onChangeText={setMessage}
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
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Saran</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Hari Ini</Text>
        <View style={styles.list}>
          {suggestions.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada saran hari ini.</Text>
          ) : (
            suggestions.map((item) => (
              <View
                key={item._id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.avatar, { backgroundColor: colors.primary + "1A" }]}>
                    <Text style={[styles.avatarText, { color: colors.primary }]}>
                      {(item.studentName || "M")[0].toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {item.studentName || "Mahasiswa"}
                  </Text>
                </View>
                <View style={[styles.bubble, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.cardMeta, { color: colors.text }]}>{item.message}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SuggestionsScreen;

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
    gap: 6,
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
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
  },
  inputSmall: {
    minHeight: 52,
    textAlignVertical: "center",
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
  listSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  list: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 14,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  bubble: {
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  cardMeta: {
    fontSize: 14,
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
