import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const StockScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const stocks = useQuery(api.stocks.getStocksByDate, { date: today }) ?? [];
  const addStock = useMutation(api.stocks.addStock);
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");

  const handleAddStock = async () => {
    const qty = Number(quantity);
    if (!itemName.trim() || !unit.trim() || Number.isNaN(qty)) return;

    await addStock({
      itemName: itemName.trim(),
      quantity: qty,
      unit: unit.trim(),
      date: today,
    });
    setItemName("");
    setQuantity("");
    setUnit("");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Input Stok</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Tambahkan stok bahan menu masuk.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Nama Bahan</Text>
        <TextInput
          placeholder="Contoh: Beras"
          placeholderTextColor={colors.textMuted}
          value={itemName}
          onChangeText={setItemName}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />

        <Text style={[styles.label, { color: colors.textMuted }]}>Jumlah</Text>
        <TextInput
          placeholder="Contoh: 50"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />

        <Text style={[styles.label, { color: colors.textMuted }]}>Satuan</Text>
        <TextInput
          placeholder="Kg / Liter / Porsi"
          placeholderTextColor={colors.textMuted}
          value={unit}
          onChangeText={setUnit}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddStock}>
          <Text style={styles.buttonText}>Simpan Stok</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Stok Hari Ini</Text>
        {stocks.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada stok hari ini.</Text>
        ) : (
          stocks.map((item) => (
            <View
              key={item._id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>{item.itemName}</Text>
              <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
                {item.quantity} {item.unit}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default StockScreen;

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
