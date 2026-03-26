import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Ionicons name="cart-outline" size={28} color="#7856FF" />
          <Text style={styles.brandText}>shop<Text style={styles.brandTextAlt}>ly</Text></Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#A1A1AA" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color="#A1A1AA" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1E1E1E',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  brandTextAlt: {
    color: '#3E82FF',
  },
  right: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});
