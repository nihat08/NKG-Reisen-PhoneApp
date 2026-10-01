import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { NKGButton } from '@/components/ui/nkg-button';
import { NKGCard } from '@/components/ui/nkg-card';
import { NKGHeader } from '@/components/ui/nkg-header';
import {
  BottomTabInset,
  MaxContentWidth,
  NKGColors,
  Radii,
  Spacing,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ScannerPlaceholder() {
  const theme = useTheme();
  const [permissionState, setPermissionState] = useState<'idle' | 'granted' | 'denied'>('idle');

  const requestPermission = () => {
    setTimeout(() => {
      setPermissionState('granted');
    }, 600);
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundSoft }]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 0 }}>
        <NKGHeader
          variant="navy"
          title="Formular-Scanner"
          subtitle="Gewinnspiel digitalisieren"
          logo
        />
      </SafeAreaView>

      <View
        style={[
          styles.content,
          { paddingBottom: BottomTabInset + Spacing.five, backgroundColor: theme.backgroundSoft },
        ]}>
        <View style={[styles.wrap, { maxWidth: MaxContentWidth }]}>
          <View style={[styles.viewfinder, { backgroundColor: NKGColors.navyDark }]}>
            <View style={styles.viewfinderFrame}>
              {['tl', 'tr', 'bl', 'br'].map((c) => (
                <View
                  key={c}
                  style={[
                    styles.corner,
                    { borderColor: NKGColors.gold },
                    c === 'tl' ? styles.cornerTL : null,
                    c === 'tr' ? styles.cornerTR : null,
                    c === 'bl' ? styles.cornerBL : null,
                    c === 'br' ? styles.cornerBR : null,
                  ]}
                />
              ))}
              <View style={styles.vfContent}>
                <SymbolView
                  name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
                  size={56}
                  tintColor={NKGColors.gold}
                />
                <Text style={styles.vfTitle}>Kamera-Bereich</Text>
                <Text style={styles.vfSub}>
                  Phase 2 · echte Kamera-Integration via expo-camera
                </Text>
              </View>
            </View>
            <View style={[styles.vfHintBar, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <SymbolView
                name={{ ios: 'lightbulb.fill', android: 'tips_and_updates', web: 'tips_and_updates' }}
                size={16}
                tintColor={NKGColors.gold}
              />
              <Text style={styles.vfHintText}>
                Formular gut ausleuchten · Ränder parallel halten
              </Text>
            </View>
          </View>

          {permissionState === 'idle' && (
            <NKGCard variant="elevated" padding="md">
              <View style={styles.permRow}>
                <View
                  style={[
                    styles.permIcon,
                    { backgroundColor: 'rgba(161,154,151,0.12)' },
                  ]}>
                  <SymbolView
                    name={{ ios: 'lock.shield', android: 'security', web: 'security' }}
                    size={22}
                    tintColor={NKGColors.gold}
                  />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={[styles.permTitle, { color: theme.text }]}>
                    Kamera-Berechtigung
                  </Text>
                  <Text style={[styles.permSub, { color: theme.textSecondary }]}>
                    Zum Fotografieren der Gewinnspiel-Formulare wird Zugriff auf die Kamera benötigt.
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: Spacing.four }}>
                <NKGButton
                  title="Berechtigung erteilen"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={requestPermission}
                />
              </View>
            </NKGCard>
          )}

          {permissionState === 'granted' && (
            <View style={{ gap: Spacing.three, width: '100%' }}>
              <View style={styles.shutterRow}>
                <View style={[styles.shutterAlt, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <SymbolView
                    name={{ ios: 'photo.on.rectangle', android: 'photo_library', web: 'photo_library' }}
                    size={22}
                    tintColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.shutterOuter, { borderColor: NKGColors.gold }]}>
                  <View style={[styles.shutterInner, { backgroundColor: NKGColors.white }]} />
                </View>
                <View style={[styles.shutterAlt, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <SymbolView
                    name={{ ios: 'flashlight.off.fill', android: 'flash_off', web: 'flash_off' }}
                    size={22}
                    tintColor={theme.textSecondary}
                  />
                </View>
              </View>
              <NKGButton
                title="Foto aufnehmen"
                variant="accent"
                size="lg"
                fullWidth
                onPress={() => {}}
              />
              <Text style={[styles.phaseNote, { color: theme.textSecondary }]}>
                ⚙ Hinweis: Echte Kamera + Fotoaufnahme wird in Phase 2 mit expo-camera implementiert.
                Dies ist die funktionsfähige UI-Struktur.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    alignItems: 'center',
  },
  wrap: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.four,
  },
  viewfinder: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: Radii.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  viewfinderFrame: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderWidth: 3,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  vfContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  vfTitle: {
    color: NKGColors.white,
    fontSize: 17,
    fontWeight: 700,
    marginTop: Spacing.two,
    letterSpacing: 0.3,
  },
  vfSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    fontWeight: 500,
  },
  vfHintBar: {
    position: 'absolute',
    bottom: Spacing.four,
    left: Spacing.four,
    right: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radii.md,
  },
  vfHintText: {
    color: NKGColors.white,
    fontSize: 12,
    fontWeight: 500,
    flex: 1,
  },
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  permIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  permSub: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 400,
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.three,
  },
  shutterAlt: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  phaseNote: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    paddingHorizontal: Spacing.two,
  },
});
