import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StockScreen = () => {
  const { colors } = useTheme();
  const today = new Date().toISOString().slice(0, 10);
  const stocks = useQuery(api.stocks.getStocksByDate, { date: today }) ?? [];
  const addStock = useMutation(api.stocks.addStock);
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [entryDate, setEntryDate] = React.useState(today);
  const [expiryDate, setExpiryDate] = React.useState("");
  const handleAddStock = async () => {
    if (!itemName.trim() || !quantity.trim() || !expiryDate.trim()) return;

    await addStock({
      itemName: itemName.trim(),
      quantity: quantity.trim(),
      expiryDate: expiryDate.trim(),
      date: entryDate,
    });
    setItemName("");
    setQuantity("");
    setEntryDate(today);
    setExpiryDate("");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Input Stok</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Tambahkan stok bahan dapur yang masuk.
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Nama Bahan</Text>
          <TextInput
            placeholder="Contoh: Beras Premium"
            placeholderTextColor={colors.textMuted}
            value={itemName}
            onChangeText={setItemName}
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
          <Text style={[styles.label, { color: colors.textMuted }]}>Jumlah / Kuantitas</Text>
          <TextInput
            placeholder="Contoh: 100 ton"
            placeholderTextColor={colors.textMuted}
            keyboardType="visible-password"
            inputMode="text"
            value={quantity}
            onChangeText={setQuantity}
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

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Tanggal Masuk</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textMuted}
              value={entryDate}
              onChangeText={setEntryDate}
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
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Kadaluarsa</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textMuted}
              value={expiryDate}
              onChangeText={setExpiryDate}
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
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddStock}>
          <Text style={styles.buttonText}>Simpan Stok</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Stok Baru Masuk</Text>
        <View style={styles.list}>
          {stocks.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Belum ada stok hari ini.</Text>
          ) : (
            stocks.map((item) => (
              <View
                key={item._id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.warning + "1A" }]}>
                    <Ionicons name="cube" size={20} color={colors.warning} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>{item.itemName}</Text>
                    <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
                      Masuk: {item.date}
                    </Text>
                  </View>
                  <View style={[styles.qtyBadge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                    <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
                  </View>
                </View>
                <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                  <Text style={[styles.cardFooterText, { color: item.expiryDate ? colors.danger : colors.textMuted }]}>
                    <Ionicons name="time-outline" size={14} /> Exp: {item.expiryDate || "-"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StockScreen;

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
  rowInputs: {
    flexDirection: "row",
    gap: 12,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  qtyBadge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 48,
    alignItems: "center",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "800",
  },
  cardFooter: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
