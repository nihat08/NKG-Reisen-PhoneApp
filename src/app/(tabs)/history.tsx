import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

type HistoryItem = {
  id: string;
  name: string;
  destination: string;
  date: string;
  time: string;
  status: "submitted" | "processing" | "error" | "pending";
  bus: string;
};

const MOCK_HISTORY: HistoryItem[] = Array.from({ length: 12 }).map((_, i) => {
  const names = [
    "Max Mustermann",
    "Anna Berger",
    "Peter Klein",
    "Julia Wagner",
    "Markus Huber",
    "Sarah Maier",
  ];
  const dests = ["Salzburg", "Wien", "Graz", "Innsbruck", "Linz", "Klagenfurt"];
  const statuses: HistoryItem["status"][] = [
    "submitted",
    "submitted",
    "submitted",
    "processing",
    "error",
    "pending",
  ];
  return {
    id: `h-${i + 1}`,
    name: names[i % names.length],
    destination: dests[i % dests.length],
    date: `${String(20 - Math.floor(i / 3)).padStart(2, "0")}.09.`,
    time: `${String(8 - (i % 6)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    status: statuses[i % statuses.length],
    bus: ["42", "17", "33", "51"][i % 4],
  };
});

const FILTERS: { label: string; value: "all" | HistoryItem["status"] }[] = [
  { label: "Alle", value: "all" },
  { label: "Übermittelt", value: "submitted" },
  { label: "In Arbeit", value: "processing" },
  { label: "Ausstehend", value: "pending" },
  { label: "Fehler", value: "error" },
];

function statusConfig(
  s: HistoryItem["status"],
  theme: ReturnType<typeof useTheme>,
) {
  switch (s) {
    case "submitted":
      return {
        label: "Übermittelt",
        bg: "rgba(22, 163, 74, 0.10)",
        color: NKGColors.success,
        dot: NKGColors.success,
      };
    case "processing":
      return {
        label: "Verarbeitet",
        bg: "rgba(10, 22, 40, 0.08)",
        color: theme.primary,
        dot: theme.primary,
      };
    case "pending":
      return {
        label: "Ausstehend",
        bg: "rgba(217, 119, 6, 0.10)",
        color: NKGColors.warning,
        dot: NKGColors.warning,
      };
    case "error":
      return {
        label: "Fehler",
        bg: "rgba(220, 38, 38, 0.10)",
        color: NKGColors.danger,
        dot: NKGColors.danger,
      };
  }
}

export default function HistoryScreen() {
  const theme = useTheme();
  const [filter, setFilter] =
    useState<(typeof FILTERS)[number]["value"]>("all");

  const data = MOCK_HISTORY.filter(
    (h) => filter === "all" || h.status === filter,
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundSoft }]}>
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 0 }}>
        <NKGHeader
          variant="navy"
          title="Verlauf"
          subtitle="Gescannte Formulare"
          logo
        />
      </SafeAreaView>

      <View
        style={[
          styles.content,
          {
            backgroundColor: theme.backgroundSoft,
            paddingBottom: BottomTabInset,
          },
        ]}
      >
        <View style={[styles.wrap, { maxWidth: MaxContentWidth }]}>
          <View style={styles.filterWrap}>
            <FlatList
              data={FILTERS}
              horizontal
              keyExtractor={(f) => f.value}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: Spacing.two,
                paddingVertical: Spacing.three,
              }}
              renderItem={({ item }) => {
                const active = filter === item.value;
                return (
                  <Pressable
                    onPress={() => setFilter(item.value)}
                    style={({ pressed }) => [
                      styles.filterChip,
                      {
                        backgroundColor: active ? theme.primary : theme.surface,
                        borderWidth: active ? 0 : 1,
                        borderColor: theme.borderLight,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterLabel,
                        { color: active ? NKGColors.white : theme.text },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>

          <View style={styles.summaryRow}>
            <NKGCard
              variant="elevated"
              padding="sm"
              containerStyle={{ flex: 1 }}
            >
              <View style={styles.summaryInner}>
                <Text style={[styles.summaryNum, { color: theme.primary }]}>
                  {MOCK_HISTORY.length}
                </Text>
                <Text
                  style={[styles.summaryLbl, { color: theme.textSecondary }]}
                >
                  Gesamt
                </Text>
              </View>
            </NKGCard>
            <View style={{ width: Spacing.three }} />
            <NKGCard
              variant="elevated"
              padding="sm"
              containerStyle={{ flex: 1 }}
            >
              <View style={styles.summaryInner}>
                <Text style={[styles.summaryNum, { color: NKGColors.success }]}>
                  {MOCK_HISTORY.filter((h) => h.status === "submitted").length}
                </Text>
                <Text
                  style={[styles.summaryLbl, { color: theme.textSecondary }]}
                >
                  OK
                </Text>
              </View>
            </NKGCard>
            <View style={{ width: Spacing.three }} />
            <NKGCard
              variant="elevated"
              padding="sm"
              containerStyle={{ flex: 1 }}
            >
              <View style={styles.summaryInner}>
                <Text style={[styles.summaryNum, { color: NKGColors.warning }]}>
                  {
                    MOCK_HISTORY.filter(
                      (h) =>
                        h.status === "pending" || h.status === "processing",
                    ).length
                  }
                </Text>
                <Text
                  style={[styles.summaryLbl, { color: theme.textSecondary }]}
                >
                  Offen
                </Text>
              </View>
            </NKGCard>
          </View>

          <FlatList
            data={data}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{
              gap: Spacing.three,
              paddingTop: Spacing.two,
              paddingBottom: Spacing.five,
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
            renderItem={({ item }) => {
              const sc = statusConfig(item.status, theme);
              const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <Pressable
                  style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                >
                  <NKGCard variant="elevated" padding="md">
                    <View style={styles.row}>
                      <View
                        style={[
                          styles.initials,
                          { backgroundColor: theme.backgroundSoft },
                        ]}
                      >
                        <Text
                          style={[
                            styles.initialsText,
                            { color: theme.primary },
                          ]}
                        >
                          {initials}
                        </Text>
                      </View>
                      <View style={{ flex: 1, gap: 4 }}>
                        <View style={styles.rowTop}>
                          <Text style={[styles.name, { color: theme.text }]}>
                            {item.name}
                          </Text>
                          <View
                            style={[
                              styles.statusBox,
                              { backgroundColor: sc.bg },
                            ]}
                          >
                            <View
                              style={[
                                styles.statusDot,
                                { backgroundColor: sc.dot },
                              ]}
                            />
                            <Text
                              style={[styles.statusText, { color: sc.color }]}
                            >
                              {sc.label}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowMeta}>
                          <View style={styles.metaItem}>
                            <SymbolView
                              name={{
                                ios: "location.fill",
                                android: "place",
                                web: "place",
                              }}
                              size={13}
                              tintColor={theme.textSecondary}
                            />
                            <Text
                              style={[
                                styles.metaText,
                                { color: theme.textSecondary },
                              ]}
                            >
                              {item.destination}
                            </Text>
                          </View>
                          <View style={styles.metaItem}>
                            <SymbolView
                              name={{
                                ios: "bus.fill",
                                android: "directions_bus",
                                web: "directions_bus",
                              }}
                              size={13}
                              tintColor={theme.textSecondary}
                            />
                            <Text
                              style={[
                                styles.metaText,
                                { color: theme.textSecondary },
                              ]}
                            >
                              Bus {item.bus}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowMeta}>
                          <View style={styles.metaItem}>
                            <SymbolView
                              name={{
                                ios: "calendar",
                                android: "event",
                                web: "event",
                              }}
                              size={13}
                              tintColor={theme.textSecondary}
                            />
                            <Text
                              style={[
                                styles.metaText,
                                { color: theme.textSecondary },
                              ]}
                            >
                              {item.date} um {item.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <SymbolView
                        name={{
                          ios: "chevron.right",
                          android: "chevron_right",
                          web: "chevron_right",
                        }}
                        size={18}
                        tintColor={theme.textSecondary}
                      />
                    </View>
                  </NKGCard>
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <View style={styles.empty}>
                <SymbolView
                  name={{ ios: "tray.fill", android: "inbox", web: "inbox" }}
                  size={44}
                  tintColor={theme.textSecondary}
                />
                <Text style={[styles.emptyTitle, { color: theme.text }]}>
                  Keine Einträge
                </Text>
                <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
                  Für diesen Filter gibt es derzeit keine Scans.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.four },
  wrap: { width: "100%", alignSelf: "center", flex: 1 },
  filterWrap: {
    marginHorizontal: -Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  filterChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radii.full,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: 600,
  },
  summaryRow: {
    flexDirection: "row",
    width: "100%",
  },
  summaryInner: {
    alignItems: "center",
    gap: 2,
  },
  summaryNum: {
    fontSize: 22,
    fontWeight: 800,
  },
  summaryLbl: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
  },
  initials: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    fontSize: 15,
    fontWeight: 700,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.1,
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: Radii.full,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.2,
  },
  rowMeta: {
    flexDirection: "row",
    gap: Spacing.four,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    fontWeight: 500,
  },
  empty: {
    alignItems: "center",
    paddingVertical: Spacing.seven,
    gap: Spacing.three,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 700,
  },
  emptySub: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: Spacing.six,
    lineHeight: 18,
  },
});
