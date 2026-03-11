import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MenuScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const menus = useQuery(api.menus.getMenusByDate, { date: today }) ?? [];
  const addMenu = useMutation(api.menus.addMenu);
  const deleteMenu = useMutation(api.menus.deleteMenu);
  const updateMenu = useMutation(api.menus.updateMenu);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [availableDate, setAvailableDate] = React.useState(today);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setAvailableDate(today);
    setEditingId(null);
  };

  const handleSaveMenu = async () => {
    if (!name.trim() || !description.trim()) return;

    if (editingId) {
      await updateMenu({
        id: editingId as any,
        name: name.trim(),
        description: description.trim(),
        date: availableDate,
      });
    } else {
      await addMenu({
        name: name.trim(),
        description: description.trim(),
        date: availableDate,
      });
    }
    resetForm();
  };

  const handleEditMenu = (item: (typeof menus)[number]) => {
    setEditingId(item._id as any);
    setName(item.name);
    setDescription(item.description);
    setAvailableDate(item.date);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Menu Hari Ini</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Daftar menu untuk mahasiswa.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Kelola Menu</Text>
        <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <TextInput
            placeholder="Nama menu"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            inputMode="text"
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <TextInput
            placeholder="Deskripsi menu"
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            inputMode="text"
            keyboardType="visible-password"
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            importantForAutofill="no"
            contextMenuHidden={true}
            caretHidden={true}
            selectTextOnFocus={false}
            multiline
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <TextInput
            placeholder="Tanggal tersedia (YYYY-MM-DD)"
            placeholderTextColor={colors.textMuted}
            value={availableDate}
            onChangeText={setAvailableDate}
            inputMode="text"
            keyboardType="visible-password"
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSaveMenu}>
              <Text style={styles.buttonText}>{editingId ? "Simpan Perbaikan" : "Tambah Menu"}</Text>
            </TouchableOpacity>
            {editingId ? (
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: colors.border }]}
                onPress={resetForm}
              >
                <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Batal</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Daftar Menu</Text>
        <View style={styles.list}>
          {menus.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Belum ada menu hari ini.
            </Text>
          ) : (
            menus.map((item) => (
              <View
                key={item._id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>{item.name}</Text>
                  <View style={[styles.dateBadge, { backgroundColor: colors.primary + "1A" }]}>
                    <Text style={[styles.dateBadgeText, { color: colors.primary }]}>{item.date}</Text>
                  </View>
                </View>
                <Text style={[styles.itemMeta, { color: colors.textMuted }]}>
                  {item.description}
                </Text>

                <View style={styles.badges}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => handleEditMenu(item)}>
                    <Ionicons name="pencil-outline" size={16} color={colors.text} />
                    <Text style={[styles.editText, { color: colors.text }]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => deleteMenu({ id: item._id })}>
                    <Ionicons name="trash-outline" size={16} color={colors.danger} />
                    <Text style={[styles.deleteText, { color: colors.danger }]}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

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
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 14,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  list: {
    gap: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  itemMeta: {
    fontSize: 14,
    lineHeight: 20,
  },
  badges: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  editText: {
    fontSize: 14,
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
