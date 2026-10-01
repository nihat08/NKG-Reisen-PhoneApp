import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NKGBrandLogo } from "@/components/ui/nkg-brand-logo";
import { NKGButton } from "@/components/ui/nkg-button";
import { NKGInput } from "@/components/ui/nkg-input";
import { NKGColors, Radii, Spacing } from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.replace("/(tabs)" as any);
  };

  return (
    <View style={styles.root}>
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />
      <View style={styles.bgOverlay} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.brandSection}>
              <NKGBrandLogo size="lg" variant="light" showTagline />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Willkommen zurück</Text>
              <Text style={styles.cardSubtitle}>
                Melde dich mit deinen Mitarbeiter-Zugangsdaten an.
              </Text>

              <View style={{ gap: Spacing.three, marginTop: Spacing.five }}>
                <NKGInput
                  label="E-Mail-Adresse"
                  placeholder="name@nkg-reisen.at"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
                <NKGInput
                  label="Passwort"
                  placeholder="Dein Passwort"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPw}
                  secureToggle
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>

              <View style={styles.forgotRow}>
                <Pressable hitSlop={Spacing.three}>
                  {({ pressed }) => (
                    <Text
                      style={[
                        styles.forgotText,
                        { opacity: pressed ? 0.6 : 1 },
                      ]}
                    >
                      Passwort vergessen?
                    </Text>
                  )}
                </Pressable>
              </View>

              <View style={{ marginTop: Spacing.four, gap: Spacing.three }}>
                <NKGButton
                  title="Anmelden"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={!email || !password}
                  onPress={handleLogin}
                />
              </View>

              <View style={styles.separator}>
                <View style={styles.sepLine} />
                <Text style={styles.sepText}>
                  DEMO · Firebase Auth vorbereitet
                </Text>
                <View style={styles.sepLine} />
              </View>

              <View style={styles.demoHint}>
                <Text style={styles.demoHintText}>
                  Tipp: Gib beliebige E-Mail + Passwort (≥ 1 Zeichen) ein, um
                  die Demo zu starten.
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footerBar}>
          <Text style={styles.footerText}>
            © 2026 NKG-Reisen · Internes Mitarbeiterportal
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: NKGColors.navy,
    position: "relative",
  },
  bgGradient1: {
    position: "absolute",
    top: -180,
    left: -120,
    width: 460,
    height: 460,
    borderRadius: 230,
    backgroundColor: "#0f2647",
    opacity: 0.6,
  },
  bgGradient2: {
    position: "absolute",
    top: 120,
    right: -160,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: NKGColors.navyLight,
    opacity: 0.45,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(6, 14, 26, 0.35)",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.seven,
    justifyContent: "flex-start",
    gap: Spacing.five,
  },
  brandSection: {
    alignItems: "center",
    paddingTop: Spacing.three,
  },
  card: {
    backgroundColor: NKGColors.white,
    borderRadius: Radii.xl,
    padding: Spacing.five,
    shadowColor: NKGColors.navyDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: NKGColors.navy,
    letterSpacing: 0.3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: NKGColors.gray500,
    marginTop: Spacing.one,
    lineHeight: 20,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: Spacing.two,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: 600,
    color: NKGColors.navy,
    letterSpacing: 0.1,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    marginTop: Spacing.five,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: NKGColors.gray100,
  },
  sepText: {
    fontSize: 11,
    fontWeight: 600,
    color: NKGColors.gray400,
    letterSpacing: 0.8,
  },
  demoHint: {
    marginTop: Spacing.four,
    backgroundColor: NKGColors.offWhite,
    padding: Spacing.three,
    borderRadius: Radii.md,
    borderLeftWidth: 3,
    borderLeftColor: NKGColors.gold,
  },
  demoHintText: {
    fontSize: 12,
    color: NKGColors.gray500,
    lineHeight: 17,
    fontWeight: 500,
  },
  footerBar: {
    paddingVertical: Spacing.three,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.4,
  },
});
