import { NKGButton } from "@/components/ui/nkg-button";
import { NKGCard } from "@/components/ui/nkg-card";
import { NKGHeader } from "@/components/ui/nkg-header";
import {
  BottomTabInset,
  MaxContentWidth,
  NKGColors,
  Radii,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScanItem = {
  id: string;
  name: string;
  destination: string;
  time: string;
  status: "ok" | "pending" | "error";
};

const RECENT_SCANS: ScanItem[] = [
  {
    id: "1",
    name: "Max Mustermann",
    destination: "Salzburg",
    time: "08:42",
    status: "ok",
  },
  {
    id: "2",
    name: "Anna Berger",
    destination: "Wien",
    time: "08:15",
    status: "ok",
  },
  {
    id: "3",
    name: "Peter Klein",
    destination: "Graz",
    time: "07:58",
    status: "pending",
  },
];

const STAT = {
  today: 12,
  week: 87,
  total: 1204,
  bus: "Bus 42 · Wien – Salzburg",
};

export default function HomeDashboard() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundSoft }]}>
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 0 }}>
        <NKGHeader
          variant="navy"
          subtitle="Guten Morgen,"
          title="Stefan"
          logo
          rightAction={
            <View
              style={[
                styles.avatar,
                { backgroundColor: "rgba(255,255,255,0.1)" },
              ]}
            >
              <Text style={styles.avatarText}>SM</Text>
            </View>
          }
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
        <View style={[styles.contentWrap, { maxWidth: MaxContentWidth }]}>
          <View
            style={[
              styles.busCard,
              { backgroundColor: NKGColors.navy },
              Shadows.card,
            ]}
          >
            <View style={styles.busRow}>
              <View style={{ gap: 4, flex: 1 }}>
                <Text style={styles.busLabel}>Aktive Route</Text>
                <Text style={styles.busName}>{STAT.bus}</Text>
              </View>
              <View
                style={[
                  styles.busIcon,
                  { backgroundColor: "rgba(161,154,151,0.18)" },
                ]}
              >
                <SymbolView
                  name={{
                    ios: "bus.fill",
                    android: "directions_bus",
                    web: "directions_bus",
                  }}
                  size={22}
                  tintColor={NKGColors.gold}
                />
              </View>
            </View>
            <View style={styles.busDivider} />
            <View style={styles.busFooter}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.busSmallLabel}>Fahrer</Text>
                <Text style={styles.busSmallValue}>Stefan Mair</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.busSmallLabel}>Status</Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: NKGColors.success },
                    ]}
                  />
                  <Text style={styles.busSmallValue}>Aktiv</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.busSmallLabel}>Abfahrt</Text>
                <Text style={styles.busSmallValue}>06:30</Text>
              </View>
            </View>
          </View>

          <NKGButton
            title="Formular scannen"
            variant="primary"
            size="xl"
            fullWidth
            onPress={() => router.push("/(tabs)/scanner" as any)}
            style={styles.scanPressable}
            leftIcon={
              <SymbolView
                name={{
                  ios: "viewfinder",
                  android: "qr_code_scanner",
                  web: "photo_camera",
                }}
                size={24}
                tintColor={NKGColors.white}
              />
            }
          />

          <View style={styles.statGrid}>
            <NKGCard
              variant="elevated"
              padding="md"
              containerStyle={{ flex: 1 }}
            >
              <View style={styles.statRowTop}>
                <Text style={[styles.statNum, { color: theme.primary }]}>
                  {STAT.today}
                </Text>
                <View
                  style={[
                    styles.statBadge,
                    { backgroundColor: "rgba(22, 163, 74, 0.1)" },
                  ]}
                >
                  <Text
                    style={[styles.statBadgeText, { color: NKGColors.success }]}
                  >
                    +3
                  </Text>
                </View>
              </View>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Heute
              </Text>
            </NKGCard>
            <View style={{ width: Spacing.three }} />
            <NKGCard
              variant="elevated"
              padding="md"
              containerStyle={{ flex: 1 }}
            >
              <View style={styles.statRowTop}>
                <Text style={[styles.statNum, { color: theme.primary }]}>
                  {STAT.week}
                </Text>
              </View>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Diese Woche
              </Text>
            </NKGCard>
          </View>

          <NKGCard variant="elevated" padding="md">
            <View style={styles.sectionHead}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Letzte Scans
              </Text>
              <Text
                style={[styles.sectionLink, { color: NKGColors.gold }]}
                onPress={() => router.push("/(tabs)/history" as any)}
              >
                Alle ansehen
              </Text>
            </View>
            <View style={{ gap: Spacing.two }}>
              {RECENT_SCANS.map((s, i) => (
                <View
                  key={s.id}
                  style={[
                    styles.scanItem,
                    {
                      borderBottomWidth: i === RECENT_SCANS.length - 1 ? 0 : 1,
                      borderBottomColor: theme.borderLight,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.scanAvatar,
                      { backgroundColor: theme.backgroundSoft },
                    ]}
                  >
                    <Text
                      style={[
                        styles.scanAvatarText,
                        { color: theme.primary, fontWeight: 700 },
                      ]}
                    >
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Text>
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.scanName, { color: theme.text }]}>
                      {s.name}
                    </Text>
                    <Text
                      style={[styles.scanMeta, { color: theme.textSecondary }]}
                    >
                      {s.destination} · {s.time} Uhr
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor:
                          s.status === "ok"
                            ? "rgba(22, 163, 74, 0.1)"
                            : s.status === "pending"
                              ? "rgba(217, 119, 6, 0.1)"
                              : "rgba(220, 38, 38, 0.1)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusPillDot,
                        {
                          backgroundColor:
                            s.status === "ok"
                              ? NKGColors.success
                              : s.status === "pending"
                                ? NKGColors.warning
                                : NKGColors.danger,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusPillText,
                        {
                          color:
                            s.status === "ok"
                              ? NKGColors.success
                              : s.status === "pending"
                                ? NKGColors.warning
                                : NKGColors.danger,
                        },
                      ]}
                    >
                      {s.status === "ok"
                        ? "Übermittelt"
                        : s.status === "pending"
                          ? "Ausstehend"
                          : "Fehler"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </NKGCard>

          <View style={{ height: Spacing.two }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
  },
  contentWrap: {
    width: "100%",
    alignItems: "center",
    gap: Spacing.four,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: NKGColors.gold,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  busCard: {
    width: "100%",
    borderRadius: Radii.xl,
    padding: Spacing.five,
  },
  busRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  busIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  busLabel: {
    color: NKGColors.gold,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  busName: {
    color: NKGColors.white,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  busDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: Spacing.four,
  },
  busFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  busSmallLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  busSmallValue: {
    color: NKGColors.white,
    fontSize: 14,
    fontWeight: 600,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  scanPressable: {
    width: "100%",
  },
  statGrid: {
    width: "100%",
    flexDirection: "row",
  },
  statRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statNum: {
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 4,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: 700,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: 0.2,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: 600,
  },
  scanItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  scanAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  scanAvatarText: {
    fontSize: 14,
  },
  scanName: {
    fontSize: 15,
    fontWeight: 600,
  },
  scanMeta: {
    fontSize: 12,
    fontWeight: 400,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.2,
  },
});
