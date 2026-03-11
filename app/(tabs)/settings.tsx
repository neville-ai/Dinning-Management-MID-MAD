import useTheme from "@/hooks/useTheme";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const { toggleDarkMode, colors, isDarkMode } = useTheme();
  const convex = useConvex();
  const createAdmin = useMutation(api.admins.createAdmin);
  const [username, setUsername] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);

  const handleCreateAdmin = async () => {
    if (!username.trim() || !pin.trim()) return;
    await createAdmin({ username: username.trim(), pin: pin.trim() });
    setStatus("Admin berhasil dibuat.");
  };

  const handleVerifyAdmin = async () => {
    if (!username.trim() || !pin.trim()) return;
    const ok = await convex.query(api.admins.verifyAdmin, {
      username: username.trim(),
      pin: pin.trim(),
    });
    setStatus(ok ? "Login admin berhasil." : "Login admin gagal.");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Pengaturan tampilan aplikasi.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tampilan</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={toggleDarkMode}
        >
          <Text style={styles.buttonText}>
            {isDarkMode ? "Switch to Light" : "Switch to Dark"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Admin Login</Text>
        <TextInput
          placeholder="Username admin"
          placeholderTextColor={colors.textMuted}
          value={username}
          onChangeText={setUsername}
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
        <TextInput
          placeholder="PIN admin"
          placeholderTextColor={colors.textMuted}
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          style={[
            styles.input,
            { backgroundColor: colors.backgrounds.input, color: colors.text, borderColor: colors.border },
          ]}
        />
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={handleCreateAdmin}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Buat Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={handleVerifyAdmin}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Login Admin</Text>
          </TouchableOpacity>
        </View>
        {status ? <Text style={[styles.statusText, { color: colors.textMuted }]}>{status}</Text> : null}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tentang</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Dinning Management</Text>
          <Text style={[styles.infoMeta, { color: colors.textMuted }]}>Versi 1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  infoMeta: {
    fontSize: 12,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
  },
});
