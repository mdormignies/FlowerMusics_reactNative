import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavouriteToggle = ({ isFavourite, onPress, size = 28 }) => {
  const iconName = isFavourite ? 'heart' : 'heart-outline';
  const iconColor = isFavourite ? '#ff3b30' : '#fff';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FavouriteToggle;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});