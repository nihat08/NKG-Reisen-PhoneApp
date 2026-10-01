import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import { NKGBrandLogo } from "@/components/ui/nkg-brand-logo";
import { NKGColors, Spacing } from "@/constants/theme";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"intro" | "hold" | "out">("intro");
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 900,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
    logoScale.value = withTiming(1, {
      duration: 1100,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });

    const t1 = setTimeout(() => {
      lineWidth.value = withTiming(1, {
        duration: 700,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      });
    }, 500);

    const t2 = setTimeout(() => setPhase("hold"), 1800);
    const t3 = setTimeout(() => setPhase("out"), 2400);
    const t4 = setTimeout(() => {
      router.replace("/login" as any);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const lineAnimatedStyle = useAnimatedStyle(() => ({
    width: `${lineWidth.value * 80}%`,
    opacity: lineWidth.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: phase === "out" ? 0 : logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(300)}
        style={[styles.content, logoAnimatedStyle]}
      >
        <NKGBrandLogo size="xl" variant="light" showTagline />
        <View style={styles.lineWrapper}>
          <Animated.View style={[styles.goldLine, lineAnimatedStyle]} />
        </View>
        <Text style={styles.taglineBottom}>Digitale Formularverarbeitung</Text>
      </Animated.View>
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.copy}>© NKG-Reisen · Alle Rechte vorbehalten</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NKGColors.navy,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  bgGradient1: {
    position: "absolute",
    top: -200,
    right: -150,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: NKGColors.navyLight,
    opacity: 0.5,
  },
  bgGradient2: {
    position: "absolute",
    bottom: -250,
    left: -180,
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: "#0d1e38",
    opacity: 0.7,
  },
  content: {
    alignItems: "center",
    gap: Spacing.five,
    zIndex: 10,
  },
  lineWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 2,
    width: "80%",
  },
  goldLine: {
    height: 2,
    backgroundColor: NKGColors.gold,
    borderRadius: 2,
  },
  taglineBottom: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 1,
    marginTop: Spacing.two,
  },
  footer: {
    position: "absolute",
    bottom: Spacing.seven,
    alignItems: "center",
    gap: Spacing.one,
  },
  version: {
    color: NKGColors.gold,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1.2,
  },
  copy: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: 0.4,
  },
});
