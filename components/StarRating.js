import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function StarRating({ rating, size = 14, showText = true }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={size} color={theme.colors.star} />
        ))}
        {halfStar && (
          <Ionicons name="star-half" size={size} color={theme.colors.star} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={size} color={theme.colors.textMuted} />
        ))}
      </View>
      {showText && <Text style={[styles.text, { fontSize: size }]}>{rating.toFixed(2)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: theme.spacing.sm,
  },
  text: {
    color: theme.colors.textMuted,
  },
});
