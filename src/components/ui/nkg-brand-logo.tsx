import { StyleSheet, Text, View } from "react-native";

import { NKGColors, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type NKGBrandLogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light" | "auto";
  showTagline?: boolean;
};

export function NKGBrandLogo({
  size = "md",
  variant = "auto",
  showTagline = true,
}: NKGBrandLogoProps) {
  const theme = useTheme();

  const sizes: Record<
    NonNullable<NKGBrandLogoProps["size"]>,
    {
      logoSize: number;
      fontSize: number;
      taglineSize: number;
      tagSpacing: number;
      gap: number;
      letterSpacing: number;
    }
  > = {
    sm: {
      logoSize: 44,
      fontSize: 18,
      taglineSize: 11,
      tagSpacing: Spacing.one,
      gap: 10,
      letterSpacing: 1.5,
    },
    md: {
      logoSize: 60,
      fontSize: 24,
      taglineSize: 12,
      tagSpacing: Spacing.two,
      gap: 14,
      letterSpacing: 2,
    },
    lg: {
      logoSize: 84,
      fontSize: 34,
      taglineSize: 14,
      tagSpacing: Spacing.three,
      gap: 18,
      letterSpacing: 2.5,
    },
    xl: {
      logoSize: 110,
      fontSize: 44,
      taglineSize: 16,
      tagSpacing: Spacing.four,
      gap: 24,
      letterSpacing: 3,
    },
  };

  const sz = sizes[size];

  const getText = () => {
    if (variant === "light") return NKGColors.white;
    if (variant === "dark") return NKGColors.navy;
    return theme.text;
  };

  const getSub = () => {
    if (variant === "light") return "rgba(255,255,255,0.7)";
    if (variant === "dark") return NKGColors.gray500;
    return theme.textSecondary;
  };

  const getAccent = () => {
    if (variant === "light") return NKGColors.white;
    return NKGColors.gold;
  };

  return (
    <View style={[styles.container, { gap: sz.gap }]}>
      <View
        style={[
          styles.logoMark,
          {
            width: sz.logoSize,
            height: sz.logoSize,
            borderRadius: sz.logoSize * 0.22,
            borderWidth: Math.max(2, sz.logoSize * 0.035),
            borderColor: getAccent(),
          },
        ]}
      >
        <Text
          style={[
            styles.logoMarkText,
            {
              color: getAccent(),
              fontSize: sz.logoSize * 0.38,
              letterSpacing: sz.letterSpacing * 0.55,
            },
          ]}
        >
          NKG
        </Text>
        <View
          style={[
            styles.goldLine,
            {
              backgroundColor: getAccent(),
              width: sz.logoSize * 0.4,
              height: 2,
            },
          ]}
        />
      </View>
      <View style={{ alignItems: "center", gap: sz.tagSpacing }}>
        <Text
          style={[
            styles.brandName,
            {
              color: getText(),
              fontSize: sz.fontSize,
              letterSpacing: sz.letterSpacing,
            },
          ]}
        >
          NKG-Reisen
        </Text>
        {showTagline && (
          <Text
            style={[
              styles.tagline,
              {
                color: getSub(),
                fontSize: sz.taglineSize,
                letterSpacing: 1.2,
              },
            ]}
          >
            MITARBEITER-APP
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoMark: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  logoMarkText: {
    fontWeight: "800",
  },
  goldLine: {
    borderRadius: 2,
  },
  brandName: {
    fontWeight: "700",
  },
  tagline: {
    fontWeight: "600",
  },
});
