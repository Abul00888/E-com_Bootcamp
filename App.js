import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductCard from './components/ProductCard';

export default function App() {
  const productInfo = {
    id: '1',
    brand: 'ESSENCE',
    name: 'Essence Mascara Lash Princess',
    discount: '-10%',
    category: 'Beauty',
    rating: '2.56',
    price: '8.94',
    originalPrice: '9.99',
    imageUrl: require('./assets/mascara.png'), // Use the required path for local assets
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Showing</Text>
          <Text style={styles.sectionCount}>194</Text>
          <Text style={styles.sectionTitle}>products</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        >
          {/* We'll just duplicate the card for demonstration purposes */}
          <ProductCard item={productInfo} />
          <ProductCard item={{...productInfo, id: '2'}} />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#A1A1AA',
    fontSize: 16,
    marginRight: 6,
  },
  sectionCount: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
  },
  productList: {
    paddingLeft: 16,
    paddingBottom: 40,
  },
});
