import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import FavouriteToggle from './FavouriteToggle';
import StarRating from './StarRating';

const SingleElement = ({ item, navigation, isFavourite, getRating, onToggleFavourite }) => {
  const isArtistType = item.type === 'musicArtist';
  const currentRating = getRating(item);

  const handlePress = () => {
    navigation.navigate('Details', { item });
  };

  const stopPressPropagation = (e) => {
    e.stopPropagation();
    onToggleFavourite?.();
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
      <View style={styles.row}>
        {!isArtistType && item.artworkUrl60 && (
          <Image
            source={{ uri: item.artworkUrl60 }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}

        <View style={styles.info}>
          <Text style={styles.title}>
            {isArtistType ? item.artistName : item.trackName}
          </Text>

          {!isArtistType && (
            <>
              <Text style={styles.subtitle}>{item.artistName}</Text>
              <Text style={styles.genre}>{item.primaryGenreName}</Text>
            </>
          )}

          {isFavourite && currentRating > 0 && (
            <StarRating rating={currentRating} size={12} onRate={() => {}} />
          )}
        </View>

        <FavouriteToggle
          isFavourite={isFavourite}
          onPress={stopPressPropagation}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SingleElement;

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#9c2a90',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#c3c3c3',
    marginTop: 4,
  },
  genre: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
