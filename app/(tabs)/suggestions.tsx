import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kotak Saran</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Kirim saran untuk perbaikan dining.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Nama (opsional)</Text>
        <TextInput
          placeholder="Nama mahasiswa"
          placeholderTextColor={colors.textMuted}
          value={studentName}
          onChangeText={setStudentName}
          style={[
            styles.input,
            styles.inputSmall,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
        <Text style={[styles.label, { color: colors.textMuted }]}>Saran</Text>
        <TextInput
          placeholder="Tulis saran kamu..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={message}
          onChangeText={setMessage}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Saran</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Saran Hari Ini</Text>
        {suggestions.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada saran hari ini.</Text>
        ) : (
          suggestions.map((item) => (
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

export default SuggestionsScreen;

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
  form: {
    gap: 10,
  },
  list: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },
  inputSmall: {
    minHeight: 44,
    textAlignVertical: "center",
  },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
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
