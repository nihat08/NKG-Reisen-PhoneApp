import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, useColorScheme } from "react-native";

import { Colors, NKGColors, Spacing } from "@/constants/theme";

type TabName = "index" | "scanner" | "history" | "profile";

const TAB_CONFIG: Record<
  TabName,
  {
    label: string;
    icon: { ios: string; android: string; web: string };
  }
> = {
  index: {
    label: "Start",
    icon: { ios: "house.fill", android: "home", web: "home" },
  },
  scanner: {
    label: "Scanner",
    icon: {
      ios: "viewfinder",
      android: "qr_code_scanner",
      web: "photo_camera",
    },
  },
  history: {
    label: "Verlauf",
    icon: { ios: "list.bullet", android: "list_alt", web: "list_alt" },
  },
  profile: {
    label: "Profil",
    icon: { ios: "person.fill", android: "person", web: "person" },
  },
};

function TabBarIcon({ name, focused }: { name: TabName; focused: boolean }) {
  const scheme = useColorScheme();
  const theme = Colors[scheme === "dark" ? "dark" : "light"];
  const color = focused ? NKGColors.gold : theme.textSecondary;
  return (
    <SymbolView
      name={TAB_CONFIG[name].icon as any}
      size={22}
      tintColor={color}
    />
  );
}

function TabBarLabel({ name, focused }: { name: TabName; focused: boolean }) {
  const scheme = useColorScheme();
  const theme = Colors[scheme === "dark" ? "dark" : "light"];
  const color = focused ? NKGColors.gold : theme.textSecondary;
  return (
    <Text
      style={StyleSheet.flatten([
        styles.labelBase,
        { color, fontWeight: focused ? "700" : "500" },
      ])}
    >
      {TAB_CONFIG[name].label}
    </Text>
  );
}

export default function TabsLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === "dark" ? "dark" : "light"];

  const tabBarStyle = StyleSheet.flatten([
    styles.tabBarBase,
    {
      backgroundColor: theme.surfaceElevated,
      borderTopColor: theme.borderLight,
    },
  ]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: NKGColors.gold,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      {(Object.keys(TAB_CONFIG) as TabName[]).map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: TAB_CONFIG[name].label,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={name} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel name={name} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBase: {
    borderTopWidth: 1,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  labelBase: {
    fontFamily: "system-ui",
    fontSize: 12,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
});
