import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MenuScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const menus = useQuery(api.menus.getMenusByDate, { date: today }) ?? [];
  const addMenu = useMutation(api.menus.addMenu);
  const deleteMenu = useMutation(api.menus.deleteMenu);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [portions, setPortions] = React.useState("");

  const handleAddMenu = async () => {
    const portionValue = Number(portions);
    if (!name.trim() || !category.trim() || Number.isNaN(portionValue)) return;

    await addMenu({
      name: name.trim(),
      category: category.trim(),
      date: today,
      portions: portionValue,
      isAvailable: portionValue > 0,
    });
    setName("");
    setCategory("");
    setPortions("");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Menu Hari Ini</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Daftar menu untuk mahasiswa.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Kelola Menu</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Nama menu"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <TextInput
            placeholder="Kategori (Utama/Sayur/Minum)"
            placeholderTextColor={colors.textMuted}
            value={category}
            onChangeText={setCategory}
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <TextInput
            placeholder="Jumlah porsi"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            value={portions}
            onChangeText={setPortions}
            style={[
              styles.input,
              { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
            ]}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddMenu}>
            <Text style={styles.buttonText}>Tambah Menu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu Hari Ini</Text>
        {menus.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            Belum ada menu hari ini.
          </Text>
        ) : (
          menus.map((item) => (
            <View
              key={item._id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.itemTitle, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.itemMeta, { color: colors.textMuted }]}>
                {item.category} • {item.portions} porsi
              </Text>
              <View style={styles.badges}>
                <Text style={[styles.badge, { color: colors.primary, borderColor: colors.primary }]}>
                  {item.isAvailable ? "Tersedia" : "Habis"}
                </Text>
                <TouchableOpacity onPress={() => deleteMenu({ id: item._id })}>
                  <Text style={[styles.deleteText, { color: colors.danger }]}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default MenuScreen;

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
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
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
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemMeta: {
    fontSize: 13,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    alignItems: "center",
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 13,
  },
});
