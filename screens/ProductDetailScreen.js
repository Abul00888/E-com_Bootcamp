import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { theme } from '../styles/theme';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // description, specifications, reviews
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.images?.[0] || data.thumbnail);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error || 'Something went wrong'}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchProduct}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backBtn, { marginTop: theme.spacing.lg }]} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    );
  }

  const currentPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const savings = (product.price - currentPrice).toFixed(2);
  const inStock = product.stock > 0;

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Gallery */}
        <View style={styles.gallery}>
          <Image source={{ uri: selectedImage }} style={styles.mainImage} resizeMode="contain" />
          {product.images && product.images.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.strip}>
              {product.images.map((img, idx) => (
                <TouchableOpacity key={idx} onPress={() => setSelectedImage(img)} style={[styles.thumbWrap, selectedImage === img && styles.thumbWrapActive]}>
                  <Image source={{ uri: img }} style={styles.thumbImage} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.content}>
          {/* Top Info */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}><Text style={styles.pillText}>{product.category}</Text></View>
            <View style={styles.pillBrand}><Text style={styles.pillText}>{product.brand}</Text></View>
            <View style={[styles.statusBadge, { backgroundColor: inStock ? 'rgba(74, 222, 128, 0.2)' : 'rgba(250, 80, 80, 0.2)' }]}>
              <Text style={[styles.statusText, { color: inStock ? theme.colors.success : theme.colors.error }]}>
                {product.availabilityStatus}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>
          
          <View style={styles.ratingRow}>
            <StarRating rating={product.rating} size={16} />
            <Text style={styles.reviewCount}>({product.reviews?.length || 0} reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${currentPrice}</Text>
            <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>Save ${savings}</Text>
            </View>
          </View>

          {/* Quick Info Chips */}
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Ionicons name="cube-outline" size={16} color={theme.colors.secondary} />
              <Text style={styles.chipText}>{product.shippingInformation || 'Standard Shipping'}</Text>
            </View>
            <View style={styles.chip}>
              <Ionicons name="shield-checkmark-outline" size={16} color={theme.colors.secondary} />
              <Text style={styles.chipText}>{product.warrantyInformation || 'No Warranty'}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {['description', 'specifications', 'reviews'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'description' && (
              <View>
                <Text style={styles.description}>{product.description}</Text>
                
                <Text style={styles.sectionHeading}>Dimensions</Text>
                <View style={styles.specCard}>
                  <Text style={styles.specVal}>W: {product.dimensions?.width} / H: {product.dimensions?.height} / D: {product.dimensions?.depth}</Text>
                </View>
              </View>
            )}

            {activeTab === 'specifications' && (
              <View style={styles.specsList}>
                <View style={styles.specRow}><Text style={styles.specLabel}>SKU</Text><Text style={styles.specValue}>{product.sku}</Text></View>
                <View style={styles.specRow}><Text style={styles.specLabel}>Weight</Text><Text style={styles.specValue}>{product.weight}g</Text></View>
                <View style={styles.specRow}><Text style={styles.specLabel}>Return Policy</Text><Text style={styles.specValue}>{product.returnPolicy}</Text></View>
                <View style={styles.specRow}><Text style={styles.specLabel}>Min Order</Text><Text style={styles.specValue}>{product.minimumOrderQuantity}</Text></View>
                <View style={[styles.specRow, { borderBottomWidth: 0 }]}><Text style={styles.specLabel}>Barcode</Text><Text style={styles.specValue}>{product.meta?.barcode}</Text></View>
              </View>
            )}

            {activeTab === 'reviews' && (
              <View>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r, i) => <ReviewCard key={i} review={r} />)
                ) : (
                  <Text style={styles.textMuted}>No reviews yet.</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}>
            <Ionicons name="add" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buyBtn} disabled={!inStock}>
          <Text style={styles.buyBtnText}>{inStock ? 'Add to Cart' : 'Out of Stock'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  retryBtn: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  retryText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  wishlistBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  scrollContent: {
    paddingBottom: 100, // accommodate bottom bar
  },
  gallery: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    paddingBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#FFF',
  },
  strip: {
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  thumbWrap: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    marginRight: theme.spacing.sm,
  },
  thumbWrapActive: {
    borderColor: theme.colors.secondary,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: theme.spacing.lg,
  },
  pillsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillBrand: {
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  pillText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    lineHeight: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  reviewCount: {
    color: theme.colors.textMuted,
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
  },
  currentPrice: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.xxl,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  originalPrice: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.md,
    textDecorationLine: 'line-through',
    marginRight: theme.spacing.md,
  },
  savingsBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  savingsText: {
    color: theme.colors.success,
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xs,
    marginLeft: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: theme.colors.secondary,
  },
  tabText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
  },
  tabTextActive: {
    color: theme.colors.secondary,
  },
  tabContent: {
    minHeight: 200,
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.sm,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  sectionHeading: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  specCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  specVal: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.sm,
  },
  specsList: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  specLabel: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
  },
  specValue: {
    flex: 2,
    color: theme.colors.text,
    fontSize: theme.fontSizes.sm,
  },
  textMuted: {
    color: theme.colors.textMuted,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.lg,
    paddingtop: theme.spacing.md,
    paddingBottom: 34, // safe area approx
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  qtyBtn: {
    padding: theme.spacing.sm,
  },
  qtyText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  buyBtn: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    color: '#FFF',
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
  },
});
