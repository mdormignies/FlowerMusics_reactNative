import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoRow({ label, value }) {
  if (!value) return null;
  
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#9c2a90',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#fff',
  },
});