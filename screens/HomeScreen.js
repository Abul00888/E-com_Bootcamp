import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { theme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://dummyjson.com/products?limit=30');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(lowerQuery) || p.brand?.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  const handleProductPress = useCallback((productId) => {
    navigation.navigate('ProductDetail', { productId });
  }, [navigation]);

  const renderProduct = useCallback(({ item }) => (
    <ProductCard item={item} onPress={() => handleProductPress(item.id)} />
  ), [handleProductPress]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // Approximated item height for performance
  const getItemLayout = useCallback((data, index) => (
    { length: 380, offset: 380 * Math.ceil(index / 2), index }
  ), []);

  const ListHeaderComponent = useCallback(() => (
    <View>
      <Banner />
      <View style={styles.filterSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Showing</Text>
          <Text style={styles.sectionCount}>{filteredProducts.length}</Text>
          <Text style={styles.sectionTitle}>products</Text>
        </View>
      </View>
    </View>
  ), [searchQuery, filteredProducts.length]);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>Failed to load products</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchProducts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <FlatList
          style={{ flex: 1 }}
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={filteredProducts}
          numColumns={2}
          keyExtractor={keyExtractor}
          renderItem={renderProduct}
          ListHeaderComponent={ListHeaderComponent}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  filterSection: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    height: 44,
    fontSize: theme.fontSizes.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.md,
    marginRight: 6,
  },
  sectionCount: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginRight: 6,
  },
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
});
