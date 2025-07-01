import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import InfoRow from './InfoRow';
import StarRating from './StarRating';
import FavouriteToggle from './FavouriteToggle';

export default function DetailsScreen({ route, getIsFavourite, getRating, setRating, toggleFavourite }) {
  const { item } = route.params;
  const isArtistType = item.type === 'musicArtist';
  const favStatus = getIsFavourite(item);
  const ratingValue = getRating(item);

  const renderDate = (isoString) => {
    if (!isoString) return null;
    const dateObj = new Date(isoString);
    return dateObj.toLocaleDateString('fr-FR', { // Permet l'affichage de la date en français (=> DD Month AAAA)
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderDuration = (milliseconds) => { // durée au format mm:ss
    if (!milliseconds) return null;
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.round((milliseconds % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFavouriteToggle = (e) => {
    e.stopPropagation();
    toggleFavourite?.(item);
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        {!isArtistType && item.artworkUrl100 && (
          <Image
            source={{ uri: item.artworkUrl100.replace('100x100', '600x600') }}
            style={styles.image}
          />
        )}

        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>
            {isArtistType ? item.artistName : item.trackName}
          </Text>

          {!isArtistType && (
            <Text style={styles.subText}>{item.artistName}</Text>
          )}

          <View style={styles.interactionRow}>
            <FavouriteToggle isFavourite={favStatus} onPress={handleFavouriteToggle} />
            {favStatus && (
              <StarRating rating={ratingValue} onRate={(val) => setRating(item, val)} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <InfoRow label="Album" value={item.collectionName} />
        <InfoRow label="Genre" value={item.primaryGenreName} />
        <InfoRow label="Date de sortie" value={renderDate(item.releaseDate)} />
        <InfoRow label="Durée" value={renderDuration(item.trackTimeMillis)} />
        <InfoRow label="Prix" value={item.trackPrice ? `${item.trackPrice} €` : null} />
        <InfoRow label="Pays" value={item.country} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#77006a',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9c2a90',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 12,
  },
  interactionRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  detailsSection: {
    padding: 16,
  },
});
