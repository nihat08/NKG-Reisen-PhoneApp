import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { NKGColors, Radii, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NKGButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
type NKGButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type NKGButtonProps = PressableProps & {
  title: string;
  variant?: NKGButtonVariant;
  size?: NKGButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function NKGButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  ...pressableProps
}: NKGButtonProps) {
  const theme = useTheme();

  const sizeStyles: Record<NKGButtonSize, { paddingV: number; paddingH: number; fontSize: number; height: number }> = {
    sm: { paddingV: Spacing.one, paddingH: Spacing.three, fontSize: 13, height: 36 },
    md: { paddingV: Spacing.two, paddingH: Spacing.four, fontSize: 15, height: 48 },
    lg: { paddingV: Spacing.three, paddingH: Spacing.five, fontSize: 17, height: 58 },
    xl: { paddingV: Spacing.four, paddingH: Spacing.five, fontSize: 19, height: 72 },
  };

  const sz = sizeStyles[size];

  const getBackground = () => {
    if (disabled || loading) return NKGColors.gray400;
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.inputBackground;
      case 'outline':
        return 'transparent';
      case 'ghost':
        return 'transparent';
      case 'accent':
        return theme.accent;
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'accent':
        return variant === 'accent' ? theme.textInverse : NKGColors.white;
      case 'secondary':
        return theme.text;
      case 'outline':
      case 'ghost':
        return theme.primary;
      default:
        return NKGColors.white;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'outline':
        return theme.border;
      case 'secondary':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled || loading}
      android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: false }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: getBackground(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1.5 : 0,
          height: sz.height,
          paddingHorizontal: sz.paddingH,
          borderRadius: variant === 'primary' && size === 'lg' ? Radii.xl : Radii.lg,
          width: fullWidth ? '100%' : undefined,
          opacity: pressed && !disabled && !loading ? 0.88 : 1,
          transform: [{ scale: pressed && !disabled && !loading ? 0.985 : 1 }],
        },
        variant === 'primary' && !disabled && !loading ? Shadows.button : null,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: sz.fontSize,
                fontWeight: variant === 'primary' || variant === 'accent' ? 600 : 500,
                letterSpacing: variant === 'primary' ? 0.3 : 0,
              },
            ]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: Spacing.one,
  },
  iconRight: {
    marginLeft: Spacing.one,
  },
});
