import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SingleElement from './SingleElement';

const FavouritesView = ({ navigation, favourites = [], getRating, toggleFavourite }) => {

  // Affichage si aucun résultat
  const renderEmptyMessage = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
      <Text style={styles.emptySubtitle}>
        Ajoutez des musiques ou artistes depuis la recherche
      </Text>
    </View>
  );

  // Affichage si résultat
  const renderItem = ({ item }) => (
    <SingleElement
      item={item}
      getRating={getRating}
      navigation={navigation}
      isFavourite
      onToggleFavourite={() => toggleFavourite(item)}
    />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={renderEmptyMessage}
        contentContainerStyle={favourites.length === 0 && styles.emptyListContainer}
      />
    </View>
  );
};

export default FavouritesView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#77006a',
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
