import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text } from 'react-native';

import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';
import FavouritesView from './components/FavouritesView';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Header avec une icône
const HeaderWithIcon = ({ title }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
    <Ionicons name="flower-sharp" size={20} color="violet" style={{ marginRight: 6 }} />
    <Text style={{ fontSize: 17, fontWeight: '500', color: "#fff" }}>{title}</Text>
  </View>
);

const SearchFlow = ({ isFav, getNote, updateNote, onToggleFav }) => (
  <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#77006a',
          color: '#fff'
        },
        headerTintColor: '#fff', // couleur de l'icone de retour
      }}
  >
    <Stack.Screen
      name="SearchScreen"
      options={{ headerTitle: () => <HeaderWithIcon title="FlowerMusics - Les musiques"/> }}
    >
      {props => (
        <SearchScreen
          {...props}
          getIsFavourite={isFav}
          getRating={getNote}
          setRating={updateNote}
          toggleFavourite={onToggleFav}
        />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="Details"
      options={{ headerTitle: () => <HeaderWithIcon title="FlowerMusics - Détails" /> }}
    >
      {props => (
        <DetailsScreen
          {...props}
          getIsFavourite={isFav}
          getRating={getNote}
          setRating={updateNote}
          toggleFavourite={onToggleFav}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const FavouritesFlow = ({ favList, isFav, getNote, updateNote, onToggleFav }) => (
  <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#77006a',
          color: '#fff'
        },
        headerTintColor: '#fff', // couleur de l'icone de retour
      }}
  >
    <Stack.Screen
      name="FavouritesView"
      options={{ headerTitle: () => <HeaderWithIcon title="FlowerMusics - Mes favoris" /> }}
    >
      {props => (
        <FavouritesView
          {...props}
          favourites={favList}
          getRating={getNote}
          toggleFavourite={onToggleFav}
        />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="Details"
      options={{ headerTitle: () => <HeaderWithIcon title="FlowerMusics - Détails" /> }}
    >
      {props => (
        <DetailsScreen
          {...props}
          getIsFavourite={isFav}
          getRating={getNote}
          setRating={updateNote}
          toggleFavourite={onToggleFav}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default function App() {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (item) => {
    const alreadyFav = isFavourite(item);
    if (alreadyFav) {
      setFavourites(prev =>
        prev.filter(fav =>
          item.type === 'musicArtist'
            ? fav.artistId !== item.artistId
            : fav.trackId !== item.trackId
        )
      );
    } else {
      setFavourites(prev => [...prev, item]);
    }
  };

  const isFavourite = (item) => {
    return favourites.some(fav =>
      item.type === 'musicArtist'
        ? fav.artistId === item.artistId
        : fav.trackId === item.trackId
    );
  };

  const getRating = (item) => {
    if (!isFavourite(item)) return 0;
    const found = favourites.find(fav =>
      item.type === 'musicArtist'
        ? fav.artistId === item.artistId
        : fav.trackId === item.trackId
    );
    return found?.rating || 0;
  };

  const setRating = (item, rating) => {
    if (!isFavourite(item)) {
      setFavourites(prev => [...prev, { ...item, rating }]);
    } else {
      setFavourites(prev =>
        prev.map(fav =>
          (item.type === 'musicArtist'
            ? fav.artistId === item.artistId
            : fav.trackId === item.trackId)
            ? { ...fav, rating }
            : fav
        )
      );
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'FavouritesTab') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#77006a',
          },
          tabBarActiveTintColor: '#fff',  // couleur icône active
          tabBarInactiveTintColor: '#888' // couleur icône inactive
        })}
      >
        <Tab.Screen
          name="SearchTab"
          options={{ headerShown: false, title: 'Rechercher' }}
        >
          {props => (
            <SearchFlow
              {...props}
              isFav={isFavourite}
              getNote={getRating}
              updateNote={setRating}
              onToggleFav={toggleFavourite}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="FavouritesTab"
          options={{ headerShown: false, title: 'Mes Favoris' }}
        >
          {props => (
            <FavouritesFlow
              {...props}
              favList={favourites}
              isFav={isFavourite}
              getNote={getRating}
              updateNote={setRating}
              onToggleFav={toggleFavourite}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
