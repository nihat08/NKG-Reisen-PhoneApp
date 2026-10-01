import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { NKGColors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NKGHeaderVariant = 'navy' | 'transparent' | 'default';

export type NKGHeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  variant?: NKGHeaderVariant;
  rightAction?: React.ReactNode;
  onBack?: () => void;
  logo?: boolean;
};

export function NKGHeader({
  title,
  subtitle,
  showBack = false,
  variant = 'default',
  rightAction,
  onBack,
  logo = false,
}: NKGHeaderProps) {
  const theme = useTheme();

  const getBackground = () => {
    switch (variant) {
      case 'navy':
        return theme.primary;
      case 'transparent':
        return 'transparent';
      default:
        return theme.background;
    }
  };

  const getTextColor = () => {
    return variant === 'navy' ? theme.textInverse : theme.text;
  };

  const getSubtitleColor = () => {
    return variant === 'navy' ? NKGColors.goldLight : theme.textSecondary;
  };

  const handleBack = () => {
    if (onBack) onBack();
    else if (router.canGoBack()) router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: getBackground() }}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack ? (
            <Pressable
              hitSlop={Spacing.three}
              onPress={handleBack}
              style={({ pressed }) => [
                styles.backButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}>
              <SymbolView
                name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
                size={24}
                tintColor={getTextColor()}
              />
            </Pressable>
          ) : logo ? (
            <View style={styles.logoMark}>
              <Text style={[styles.logoText, { color: getSubtitleColor() }]}>NKG</Text>
            </View>
          ) : null}
          <View style={styles.titleGroup}>
            {title && (
              <Text
                style={[
                  styles.title,
                  { color: getTextColor() },
                ]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  { color: getSubtitleColor() },
                ]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {rightAction && <View style={styles.rightSection}>{rightAction}</View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    minHeight: 64,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.three,
  },
  titleGroup: {
    gap: 2,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 500,
  },
  backButton: {
    padding: Spacing.one,
    marginLeft: -Spacing.one,
  },
  rightSection: {
    alignItems: 'center',
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: NKGColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.8,
  },
});
