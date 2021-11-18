import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

interface Movie {
  title: string;
  episode_number: string;
  main_characters: string[];
  description: string;
  poster: string;
  hero_image: string;
}

interface Movies extends Array<Movie> {}
type Sort = 'ASC' | 'DESC';

const Item = ({title, episode_number, poster}: Movie) => (
  <View style={styles.movieBox}>
    <View style={styles.movieBoxInner}>
      <View>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/${poster}`,
          }}
          style={styles.posterImage}
        />
      </View>
      <View style={styles.movieDescBox}>
        <Text style={styles.movieTitle}>{title}</Text>
        <Text style={styles.movieEpisode}>Episode: {episode_number}</Text>
      </View>
    </View>
  </View>
);

const MainPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movies>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(
        'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json',
      );

      if (!response) {
      } else {
        setMovies(response.data.movies);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSort = () => {
    sort === 'ASC' ? setSort('DESC') : setSort('ASC');
    const moviesSorted = [...movies].sort((a: Movie, b: Movie) => {
      let sortedASC: boolean = a.episode_number > b.episode_number;

      if (!sortedASC) {
        return sort === 'DESC' ? -1 : 1;
      } else if (sortedASC) {
        return sort === 'ASC' ? -1 : 1;
      }
      return 0;
    });

    setMovies(moviesSorted);
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.nav}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </SafeAreaView>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'#fff'}
          style={styles.loading}
        />
      ) : (
        <FlatList
          style={styles.list}
          data={movies}
          renderItem={({item}: ListRenderItemInfo<Movie>) => (
            <Item
              title={item.title}
              episode_number={item.episode_number}
              main_characters={item.main_characters}
              description={item.description}
              poster={item.poster}
              hero_image={item.hero_image}
            />
          )}
          keyExtractor={(item: Movie) => item.title}
          ListFooterComponent={
            <View style={styles.footerBtnBox}>
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => toggleSort()}>
                <Text style={styles.footerBtnText}>
                  Sort {sort === 'ASC' ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#404040',
    flex: 1,
  },
  nav: {
    backgroundColor: '#404040',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  list: {backgroundColor: '#2e2c2c', flex: 1, paddingTop: 12},
  movieBox: {
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  movieBoxInner: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  movieDescBox: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 12,
    paddingRight: 6,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieEpisode: {
    fontSize: 14,
    marginBottom: 12,
  },
  posterImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  footerBtnBox: {
    alignItems: 'center',
    marginBottom: 54,
    paddingTop: 16,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  footerBtn: {
    backgroundColor: '#fff',
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    shadowColor: '#ff1f3d',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    justifyContent: 'center',
  },
  footerBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default MainPage;
