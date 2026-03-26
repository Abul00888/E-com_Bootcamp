import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';
import { theme } from '../styles/theme';

export default function ReviewCard({ review }) {
  // Get initials from reviewerName
  const initials = review.reviewerName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  const date = new Date(review.date).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{review.reviewerName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.ratingWrap}>
          <StarRating rating={review.rating} size={12} showText={false} />
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(129, 140, 248, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  avatarText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: theme.fontSizes.sm,
  },
  date: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  ratingWrap: {
    alignItems: 'flex-end',
  },
  comment: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: theme.fontSizes.sm,
    lineHeight: 20,
  },
});
