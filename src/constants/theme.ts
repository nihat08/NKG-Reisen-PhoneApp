import "@/global.css";

import { Platform } from "react-native";

export const NKGColors = {
  navy: "#0A1628",
  navyDark: "#060E1A",
  navyLight: "#142540",
  gold: "#a19a97",
  goldLight: "#c8c2be",
  white: "#FFFFFF",
  offWhite: "#F5F6FA",
  gray100: "#E8EAF0",
  gray200: "#D4D7E0",
  gray400: "#979BA8",
  gray500: "#6B7280",
  gray700: "#374151",
  anthracite: "#1A1D23",
  danger: "#DC2626",
  success: "#16A34A",
  warning: "#D97706",
} as const;

export const Colors = {
  light: {
    text: NKGColors.anthracite,
    textSecondary: NKGColors.gray500,
    textInverse: NKGColors.white,
    background: NKGColors.white,
    backgroundSoft: NKGColors.offWhite,
    surface: NKGColors.white,
    surfaceElevated: NKGColors.white,
    primary: NKGColors.navy,
    primaryDark: NKGColors.navyDark,
    primaryLight: NKGColors.navyLight,
    accent: NKGColors.gold,
    accentLight: NKGColors.goldLight,
    border: NKGColors.gray200,
    borderLight: NKGColors.gray100,
    inputBackground: NKGColors.offWhite,
    success: NKGColors.success,
    danger: NKGColors.danger,
    warning: NKGColors.warning,
    backgroundElement: NKGColors.offWhite,
    backgroundSelected: NKGColors.gray100,
  },
  dark: {
    text: NKGColors.white,
    textSecondary: NKGColors.gray400,
    textInverse: NKGColors.anthracite,
    background: NKGColors.navyDark,
    backgroundSoft: NKGColors.navy,
    surface: NKGColors.navy,
    surfaceElevated: NKGColors.navyLight,
    primary: NKGColors.white,
    primaryDark: NKGColors.offWhite,
    primaryLight: NKGColors.gray100,
    accent: NKGColors.gold,
    accentLight: NKGColors.goldLight,
    border: NKGColors.navyLight,
    borderLight: "rgba(255,255,255,0.08)",
    inputBackground: NKGColors.navyLight,
    success: NKGColors.success,
    danger: NKGColors.danger,
    warning: NKGColors.warning,
    backgroundElement: NKGColors.navyLight,
    backgroundSelected: "#2E3135",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
} as const;

export const Radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const Shadows = {
  card: {
    shadowColor: "#0A1628",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  button: {
    shadowColor: NKGColors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 88, android: 80 }) ?? 0;
export const TopBarInset = Platform.select({ ios: 50, android: 0 }) ?? 0;
export const MaxContentWidth = 800;
