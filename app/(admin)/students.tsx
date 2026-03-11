import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function StudentsScreen() {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const students = useQuery(api.students.getStudentsWithMealStatus, { date: today }) ?? [];
  const addStudent = useMutation(api.students.addStudent);
  const deleteStudent = useMutation(api.students.deleteStudent);

  const handleAddStudent = async () => {
    if (!name.trim() || !studentId.trim() || !category.trim()) {
      Alert.alert("Error", "Nama, NIM, dan kategori harus diisi!");
      return;
    }

    try {
      await addStudent({ name, studentId, category, status });
      setName("");
      setStudentId("");
      setCategory("");
      setStatus("");
      Alert.alert("Sukses", "Data mahasiswa berhasil ditambahkan.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal menambahkan data.");
    }
  };

  const handleDelete = (id: any) => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus mahasiswa ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => deleteStudent({ id }) },
    ]);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Data Mahasiswa</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Kelola data mahasiswa asrama dan outsider.
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Nama Lengkap</Text>
          <TextInput
            placeholder="Contoh: Budi Santoso"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
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
            placeholder="Nomor Induk Mahasiswa"
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

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddStudent}>
          <Text style={styles.buttonText}>Tambah Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Daftar Mahasiswa</Text>
        <View style={styles.list}>
          {students.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada data mahasiswa.</Text>
          ) : (
            students.map((item: any) => (
              <View
                key={item._id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.primary + "1A" }]}>
                    <Ionicons name="person" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
                      {item.studentId} • {item.category}
                    </Text>
                  </View>
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
                      {item.status || "Belum Makan"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#EF4444" + "1A" }]}
                    onPress={() => handleDelete(item._id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
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
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
