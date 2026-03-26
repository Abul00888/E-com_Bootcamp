import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        
        <Image 
          source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            <Ionicons name="star" size={14} color="#FFC83D" />
            <Ionicons name="star" size={14} color="#FFC83D" />
            <Ionicons name="star" size={14} color="#FFC83D" />
            <Ionicons name="star-outline" size={14} color="#A1A1AA" />
            <Ionicons name="star-outline" size={14} color="#A1A1AA" />
          </View>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.pricing}>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: 280,
    marginRight: 16,
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
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
    top: 12,
    left: 12,
    backgroundColor: '#FA5050',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    padding: 16,
  },
  brand: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  footer: {
    marginBottom: 16,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    color: '#7856FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    color: '#A1A1AA',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    backgroundColor: '#7856FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
