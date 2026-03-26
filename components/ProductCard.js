import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from './StarRating';
import { theme } from '../styles/theme';

export default function ProductCard({ item, onPress }) {
  const currentPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
  const originalPrice = item.price.toFixed(2);
  const discount = `-${Math.round(item.discountPercentage)}%`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {item.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={[styles.statusBadge, {
          backgroundColor: item.availabilityStatus === 'In Stock' ? 'rgba(74, 222, 128, 0.9)' : 'rgba(250, 80, 80, 0.9)'
        }]}>
          <Text style={styles.statusText}>{item.availabilityStatus}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.brand} numberOfLines={1}>{item.brand || item.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.ratingContainer}>
          <StarRating rating={item.rating || 0} size={12} showText={false} />
        </View>
        
        <View style={styles.footer}>
          <View style={styles.pricing}>
            <Text style={styles.price}>${currentPrice}</Text>
            {item.discountPercentage > 0 && (
              <Text style={styles.originalPrice}>${originalPrice}</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  },
  imageContainer: {
    height: 180,
    backgroundColor: '#F8F9FA',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    zIndex: 10,
  },
  discountText: {
    color: '#FFF',
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    color: '#FFF',
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
  },
  details: {
    padding: theme.spacing.md,
    flex: 1,
  },
  brand: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 20,
    minHeight: 40,
  },
  ratingContainer: {
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  price: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginRight: 6,
  },
  originalPrice: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: theme.fontSizes.sm,
    fontWeight: 'bold',
  },
});
