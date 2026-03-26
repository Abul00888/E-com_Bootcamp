import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.details}>
        <View style={styles.textShimmer} />
        <View style={[styles.textShimmer, { width: '80%', marginTop: theme.spacing.sm }]} />
        <View style={[styles.textShimmer, { width: '40%', marginTop: theme.spacing.md }]} />
        <View style={styles.footer}>
          <View style={[styles.textShimmer, { width: 80, height: 28 }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    flex: 1,
    margin: theme.spacing.sm,
    height: 380,
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  details: {
    padding: theme.spacing.md,
    flex: 1,
  },
  textShimmer: {
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.sm,
  },
  footer: {
    marginTop: 'auto',
  },
});
