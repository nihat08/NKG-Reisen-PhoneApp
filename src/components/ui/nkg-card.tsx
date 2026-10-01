import { StyleSheet, Text, View, type ViewProps, type ViewStyle } from 'react-native';

import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NKGCardVariant = 'default' | 'elevated' | 'outlined' | 'navy' | 'accent';

export type NKGCardProps = ViewProps & {
  variant?: NKGCardVariant;
  title?: string;
  subtitle?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
  pressed?: boolean;
};

export function NKGCard({
  variant = 'default',
  title,
  subtitle,
  padding = 'md',
  containerStyle,
  pressed = false,
  style,
  children,
  ...viewProps
}: NKGCardProps) {
  const theme = useTheme();

  const paddingMap: Record<string, number> = {
    none: 0,
    sm: Spacing.three,
    md: Spacing.four,
    lg: Spacing.five,
  };

  const getBackground = () => {
    switch (variant) {
      case 'navy':
        return theme.primary;
      case 'accent':
        return theme.accent;
      case 'outlined':
        return theme.surface;
      default:
        return theme.surface;
    }
  };

  const getBorder = () => {
    if (variant === 'outlined') return { borderWidth: 1, borderColor: theme.border };
    return null;
  };

  const getShadow = () => {
    switch (variant) {
      case 'elevated':
        return Shadows.card;
      case 'default':
        return {
          ...Shadows.card,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        };
      default:
        return null;
    }
  };

  return (
    <View
      {...viewProps}
      style={[
        styles.base,
        {
          backgroundColor: getBackground(),
          borderRadius: variant === 'navy' || variant === 'accent' ? Radii.xl : Radii.lg,
          padding: paddingMap[padding],
          transform: [{ scale: pressed ? 0.985 : 1 }],
          opacity: pressed ? 0.92 : 1,
        },
        getShadow(),
        getBorder(),
        containerStyle,
        style,
      ]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text
              style={[
                styles.title,
                {
                  color: variant === 'navy' || variant === 'accent' ? theme.textInverse : theme.text,
                },
              ]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color:
                    variant === 'navy' || variant === 'accent'
                      ? 'rgba(255,255,255,0.7)'
                      : theme.textSecondary,
                },
              ]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    marginBottom: Spacing.three,
    gap: Spacing.half,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 400,
  },
});
