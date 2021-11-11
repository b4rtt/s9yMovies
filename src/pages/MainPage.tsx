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
  TouchableOpacity,
} from 'react-native';
import {ApplicationState, onLoading, loadMovies} from '../store';
import {useSelector, useDispatch} from 'react-redux';

interface Movie {
  title: string;
  episode_number: string;
  main_characters: string[];
  description: string;
  poster: string;
  hero_image: string;
}

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
  const dispatch = useDispatch();

  const {movies} = useSelector(
    (state: ApplicationState) => state.moviesReducer,
  );

  const {loading} = useSelector(
    (state: ApplicationState) => state.loadingReducer,
  );

  const [sort, setSort] = useState('ASC');
  const [moviesData, setMoviesData] = useState([]);

  const loadData = async () => {
    Promise.all([dispatch(onLoading(true)), dispatch(loadMovies())]);
    return dispatch(onLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setMoviesData(
      movies.sort(
        (a: Movie, b: Movie) =>
          Number(a.episode_number) - Number(b.episode_number),
      ),
    );
  }, [movies]);

  const toggleSort = () => {
    sort === 'ASC' ? setSort('DESC') : setSort('ASC');
  };

  const Loading = () => (
    <ActivityIndicator
      size={'large'}
      color={'#404040'}
      style={styles.loading}
    />
  );

  const renderItem = (data: Movie) => (
    <Item
      title={data.title}
      episode_number={data.episode_number}
      main_characters={data.main_characters}
      description={data.description}
      poster={data.poster}
      hero_image={data.hero_image}
    />
  );

  return (
    <View style={styles.page}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.nav}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </SafeAreaView>
      <FlatList
        style={styles.list}
        data={
          sort === 'ASC'
            ? moviesData.sort(
                (a: Movie, b: Movie) =>
                  Number(a.episode_number) - Number(b.episode_number),
              )
            : moviesData.sort(
                (a: Movie, b: Movie) =>
                  Number(b.episode_number) - Number(a.episode_number),
              )
        }
        renderItem={(item: any) => renderItem(item.item)}
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

      {loading && <Loading />}
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
