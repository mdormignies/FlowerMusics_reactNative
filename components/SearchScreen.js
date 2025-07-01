import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import SingleElement from './SingleElement';

const SearchScreen = ({ navigation, getIsFavourite, getRating, toggleFavourite }) => {
  const [query, setQuery] = useState('');
  const [entityType, setEntityType] = useState('song');
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);

  const LIMIT = 30;

  const fetchItunesResults = async () => {
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=${entityType}&limit=${LIMIT}`
      );
      const json = await res.json();
      const parsed = json.results.map(item => ({ ...item, type: entityType }));
      setData(parsed);
      setSearched(true);
    } catch (err) {
      console.error('Erreur lors de la récupération:', err);
      setData([]);
    }
  };

  const handleEntityChange = (type) => {
    setEntityType(type);
    setQuery('');
    setData([]);
    setSearched(false);
  };

  const renderEmpty = () => {
    if (!searched) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>
          Aucun résultat pour "{query}"
        </Text>
        <Text style={styles.emptySubtitle}>
          Essayez avec un autre mot-clé.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchBox}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher..."
          />
          <TouchableOpacity style={styles.button} onPress={fetchItunesResults}>
            <Text style={styles.buttonLabel}>Chercher</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switch}>
          <TouchableOpacity
            style={[styles.tab, entityType === 'song' && styles.activeTab]}
            onPress={() => handleEntityChange('song')}
          >
            <Text style={[styles.tabText, entityType === 'song' && styles.activeText]}>
              Par titres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, entityType === 'musicArtist' && styles.activeTab]}
            onPress={() => handleEntityChange('musicArtist')}
          >
            <Text style={[styles.tabText, entityType === 'musicArtist' && styles.activeText]}>
              Par artistes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <SingleElement
            item={item}
            navigation={navigation}
            getRating={getRating}
            isFavourite={getIsFavourite(item)}
            onToggleFavourite={() => toggleFavourite(item)}
          />
        )}
        style={styles.list}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#77006a',
  },
  searchBox: {
    padding: 16,
    backgroundColor: '#9c2a90',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#77006a',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#77006a',
  },
  tabText: {
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
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
