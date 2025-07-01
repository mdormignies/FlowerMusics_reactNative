import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating = 0, onRate, size = 24 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {stars.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => onRate(value)}
          style={styles.star}
        >
          <Ionicons
            name={value <= rating ? 'star' : 'star-outline'}
            size={size}
            color="#ffd700"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    padding: 2,
  },
});
