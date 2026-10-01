import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';

export type NKGInputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureToggle?: boolean;
  containerStyle?: ViewStyle;
};

export function NKGInput({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  secureToggle = false,
  containerStyle,
  style,
  secureTextEntry,
  ...inputProps
}: NKGInputProps) {
  const theme = useTheme();
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const showSecureToggle = secureToggle || secureTextEntry !== undefined;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error
              ? theme.danger
              : isFocused
                ? theme.accent
                : theme.borderLight,
            borderWidth: isFocused || error ? 1.5 : 1,
            borderRadius: Radii.lg,
          },
        ]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          {...inputProps}
          secureTextEntry={showSecureToggle ? isSecure : secureTextEntry}
          placeholderTextColor={theme.textSecondary}
          onFocus={(e) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            inputProps.onBlur?.(e);
          }}
          style={[
            styles.input,
            {
              color: theme.text,
              paddingLeft: leftIcon ? 0 : Spacing.three,
              paddingRight: showSecureToggle || rightIcon ? 0 : Spacing.three,
            },
            style,
          ]}
        />
        {showSecureToggle && (
          <Pressable
            hitSlop={Spacing.three}
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconRight}>
            <SymbolView
              name={{
                ios: isSecure ? 'eye' : 'eye.slash',
                android: isSecure ? 'visibility' : 'visibility_off',
                web: isSecure ? 'visibility' : 'visibility_off',
              }}
              size={18}
              tintColor={theme.textSecondary}
            />
          </Pressable>
        )}
        {rightIcon && !showSecureToggle && (
          <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
      )}
      {!error && hint && (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>{hint}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    marginLeft: Spacing.one,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 52,
    fontWeight: 500,
  },
  iconLeft: {
    paddingLeft: Spacing.three,
    paddingRight: Spacing.two,
  },
  iconRight: {
    paddingRight: Spacing.three,
    paddingLeft: Spacing.two,
  },
  error: {
    fontSize: 12,
    fontWeight: 500,
    marginLeft: Spacing.one,
    marginTop: 2,
  },
  hint: {
    fontSize: 12,
    fontWeight: 400,
    marginLeft: Spacing.one,
    marginTop: 2,
  },
});
