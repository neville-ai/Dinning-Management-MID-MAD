import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MealCardScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const mealCards = useQuery(api.mealCards.getMealCardsByDate, { date: today }) ?? [];
  const addMealCard = useMutation(api.mealCards.addMealCard);
  const [studentName, setStudentName] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async () => {
    if (!studentName.trim() || !studentId.trim() || !category.trim() || !status.trim()) return;
    await addMealCard({
      studentName: studentName.trim(),
      studentId: studentId.trim(),
      category: category.trim(),
      status: status.trim() || "Sudah Makan",
      date: today,
    });
    setStudentName("");
    setStudentId("");
    setCategory("");
    setStatus("");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kartu Makan</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Input data anak asrama dan outsider.
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Nama Mahasiswa</Text>
          <TextInput
            placeholder="Nama lengkap"
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
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>NIM</Text>
          <TextInput
            placeholder="Nomor induk mahasiswa"
            placeholderTextColor={colors.textMuted}
            value={studentId}
            onChangeText={setStudentId}
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
          <Text style={[styles.label, { color: colors.textMuted }]}>Kategori</Text>
          <TextInput
            placeholder="Asrama / Outsider"
            placeholderTextColor={colors.textMuted}
            value={category}
            onChangeText={setCategory}
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
          <Text style={[styles.label, { color: colors.textMuted }]}>Status Makan</Text>
          <TextInput
            placeholder="Sudah Makan / Belum Makan"
            placeholderTextColor={colors.textMuted}
            value={status}
            onChangeText={setStatus}
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
          <Text style={styles.buttonText}>Simpan Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Hari Ini</Text>
        <View style={styles.list}>
          {mealCards.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada data kartu makan.</Text>
          ) : (
            mealCards.map((item) => (
              <View
                key={item._id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
              >
                <View style={[styles.iconWrap, { backgroundColor: colors.primary + "1A" }]}>
                  <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{item.studentName}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                    <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
                      {item.studentId} • {item.category}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: item.status?.toLowerCase().includes("belum") ? colors.border : colors.success + "1A" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: item.status?.toLowerCase().includes("belum") ? colors.textMuted : colors.success },
                        ]}
                      >
                        {item.status || "Sudah Makan"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealCardScreen;

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
    fontSize: 15,
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
    gap: 14,
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
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
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
