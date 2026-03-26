import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <Text style={styles.pillText}>🔥 FLASH SALE — LIMITED TIME</Text>
      </View>
      <Text style={styles.title}>Discover Amazing Products Today</Text>
      <Text style={styles.subtitle}>Up to 19% off across all categories</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Shop Now</Text>
        <Ionicons name="arrow-forward-outline" size={18} color="#7856FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7856FF',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#7856FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  pillText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: '#7856FF',
    fontWeight: 'bold',
    marginRight: 8,
  },
});
