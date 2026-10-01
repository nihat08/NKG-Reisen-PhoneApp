import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NKGButton } from "@/components/ui/nkg-button";
import { NKGCard } from "@/components/ui/nkg-card";
import { NKGHeader } from "@/components/ui/nkg-header";
import {
    BottomTabInset,
    MaxContentWidth,
    NKGColors,
    Radii,
    Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

const PROFILE = {
  firstName: "Stefan",
  lastName: "Mair",
  email: "stefan.mair@nkg-reisen.at",
  role: "Busfahrer",
  bus: "42",
  id: "EMP-00218",
  joined: "01.03.2022",
  scans: 1204,
  route: "Wien – Salzburg",
};

type IconObj = { ios: string; android: string; web: string };
type SectionRow = {
  icon: IconObj;
  label: string;
  value?: string;
  action?: "nav" | "toggle";
};

const SETTINGS_ROWS: SectionRow[] = [
  {
    icon: { ios: "person.fill", android: "person", web: "person" },
    label: "Persönliche Daten",
    value: "Bearbeiten",
    action: "nav",
  },
  {
    icon: { ios: "bus.fill", android: "directions_bus", web: "directions_bus" },
    label: "Zugewiesener Bus",
    value: `Bus ${PROFILE.bus}`,
    action: "nav",
  },
  {
    icon: { ios: "bell.fill", android: "notifications", web: "notifications" },
    label: "Benachrichtigungen",
    value: "An",
    action: "toggle",
  },
  {
    icon: {
      ios: "hand.raised.fill",
      android: "privacy_tip",
      web: "privacy_tip",
    },
    label: "Datenschutz",
    value: "",
    action: "nav",
  },
  {
    icon: { ios: "info.circle.fill", android: "info", web: "info" },
    label: "App-Informationen",
    value: "v1.0.0",
    action: "nav",
  },
];

export default function ProfileScreen() {
  const theme = useTheme();

  const initials = `${PROFILE.firstName[0]}${PROFILE.lastName[0]}`;

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundSoft }]}>
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 0 }}>
        <NKGHeader
          variant="navy"
          title="Profil"
          subtitle="Dein Mitarbeiterkonto"
          logo
        />
      </SafeAreaView>

      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.backgroundSoft }]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: BottomTabInset + Spacing.five },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.wrap, { maxWidth: MaxContentWidth }]}>
          <View
            style={[styles.profileCard, { backgroundColor: NKGColors.navy }]}
          >
            <View
              style={[styles.avatarCircle, { borderColor: NKGColors.gold }]}
            >
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.profileName}>
              {PROFILE.firstName} {PROFILE.lastName}
            </Text>
            <Text style={styles.profileRole}>{PROFILE.role}</Text>
            <View
              style={[
                styles.profileChips,
                { borderTopColor: "rgba(255,255,255,0.08)" },
              ]}
            >
              <View style={styles.chip}>
                <Text style={[styles.chipLabel, { color: NKGColors.gold }]}>
                  MITARBEITER-ID
                </Text>
                <Text style={styles.chipValue}>{PROFILE.id}</Text>
              </View>
              <View
                style={[
                  styles.chipDivider,
                  { backgroundColor: "rgba(255,255,255,0.08)" },
                ]}
              />
              <View style={styles.chip}>
                <Text style={[styles.chipLabel, { color: NKGColors.gold }]}>
                  BUS
                </Text>
                <Text style={styles.chipValue}>
                  {PROFILE.bus} · {PROFILE.route}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statRow}>
            <NKGCard
              variant="elevated"
              padding="md"
              containerStyle={{ flex: 1 }}
            >
              <View style={{ alignItems: "center", gap: 2 }}>
                <Text style={[styles.statBig, { color: theme.primary }]}>
                  {PROFILE.scans}
                </Text>
                <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                  Scans gesamt
                </Text>
              </View>
            </NKGCard>
            <View style={{ width: Spacing.three }} />
            <NKGCard
              variant="elevated"
              padding="md"
              containerStyle={{ flex: 1 }}
            >
              <View style={{ alignItems: "center", gap: 2 }}>
                <Text style={[styles.statBig, { color: NKGColors.success }]}>
                  99,4%
                </Text>
                <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                  Erfolgsrate
                </Text>
              </View>
            </NKGCard>
            <View style={{ width: Spacing.three }} />
            <NKGCard
              variant="elevated"
              padding="md"
              containerStyle={{ flex: 1 }}
            >
              <View style={{ alignItems: "center", gap: 2 }}>
                <Text style={[styles.statBig, { color: NKGColors.gold }]}>
                  3½
                </Text>
                <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                  Jahre dabei
                </Text>
              </View>
            </NKGCard>
          </View>

          <NKGCard variant="elevated" padding="none">
            <View
              style={[
                styles.sectionHeader,
                { borderBottomColor: theme.borderLight },
              ]}
            >
              <Text style={[styles.sectionHeaderText, { color: theme.text }]}>
                Einstellungen
              </Text>
            </View>
            {SETTINGS_ROWS.map((row, i) => (
              <View
                key={row.label}
                style={[
                  styles.settingRow,
                  i !== SETTINGS_ROWS.length - 1
                    ? {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.borderLight,
                      }
                    : null,
                ]}
              >
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: "rgba(161,154,151,0.12)" },
                  ]}
                >
                  <SymbolView
                    name={row.icon as any}
                    size={18}
                    tintColor={NKGColors.gold}
                  />
                </View>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  {row.label}
                </Text>
                <View style={{ flex: 1 }} />
                {row.value ? (
                  <Text
                    style={[
                      styles.settingValue,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {row.value}
                  </Text>
                ) : null}
                {row.action === "nav" ? (
                  <SymbolView
                    name={{
                      ios: "chevron.right",
                      android: "chevron_right",
                      web: "chevron_right",
                    }}
                    size={16}
                    tintColor={theme.textSecondary}
                  />
                ) : (
                  <View
                    style={[styles.toggle, { backgroundColor: NKGColors.gold }]}
                  >
                    <View style={styles.toggleKnob} />
                  </View>
                )}
              </View>
            ))}
          </NKGCard>

          <View style={{ gap: Spacing.three, width: "100%" }}>
            <NKGButton
              title="Abmelden"
              variant="outline"
              size="lg"
              fullWidth
              onPress={() => router.replace("/login" as any)}
              leftIcon={
                <SymbolView
                  name={
                    {
                      ios: "rectangle.portrait.and.arrow.right",
                      android: "logout",
                      web: "logout",
                    } as any
                  }
                  size={18}
                  tintColor={theme.primary}
                />
              }
            />
            <Text style={[styles.legal, { color: theme.textSecondary }]}>
              © 2026 NKG-Reisen · Version 1.0.0 · Build 421
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
  },
  wrap: { width: "100%", alignItems: "center", gap: Spacing.four },
  profileCard: {
    width: "100%",
    borderRadius: Radii.xl,
    padding: Spacing.five,
    alignItems: "center",
    gap: Spacing.two,
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 2.5,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.two,
  },
  avatarText: {
    color: NKGColors.white,
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 1,
  },
  profileName: {
    color: NKGColors.white,
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  profileRole: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  profileChips: {
    flexDirection: "row",
    marginTop: Spacing.four,
    paddingTop: Spacing.four,
    borderTopWidth: 1,
    width: "100%",
  },
  chip: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  chipLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
  },
  chipValue: {
    color: NKGColors.white,
    fontSize: 13,
    fontWeight: 600,
  },
  chipDivider: {
    width: 1,
    height: 28,
  },
  statRow: {
    flexDirection: "row",
    width: "100%",
  },
  statBig: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: -0.2,
  },
  statLbl: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: 500,
  },
  settingValue: {
    fontSize: 13,
    fontWeight: 500,
    marginRight: Spacing.two,
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    alignItems: "flex-end",
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: NKGColors.white,
  },
  legal: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.3,
  },
});
