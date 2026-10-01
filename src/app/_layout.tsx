import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NKGColors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const NKG_LIGHT_THEME = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: NKGColors.navy,
    background: NKGColors.white,
    card: NKGColors.white,
    text: NKGColors.anthracite,
    border: NKGColors.gray200,
    notification: NKGColors.gold,
  },
};

const NKG_DARK_THEME = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: NKGColors.gold,
    background: NKGColors.navyDark,
    card: NKGColors.navy,
    text: NKGColors.white,
    border: NKGColors.navyLight,
    notification: NKGColors.gold,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? NKG_DARK_THEME : NKG_LIGHT_THEME}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            navigationBarColor: NKGColors.navyDark,
          }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="review"
            options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
