import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { MagnifyingGlass } from 'phosphor-react-native'
import { api } from '../../services/api'
import CardMovies from '../../components/CardMovies'
import { useNavigation } from '@react-navigation/native'
import CardFixed from '../../components/CardFixed'

interface Movie {
  id: number,
  title: string,
  poster_path: string,
  overview: string
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("now_playing");
  const [fixedDiscovered, setFixedDiscovered] = useState<Movie[]>([]);
  const [pageFixed, setPageFixed] = useState(1)

  const categories = [
    { id: '1', name: 'Cartaz', value: "now_playing" },
    { id: '2', name: 'Lançamentos', value: "upcoming" },
    { id: '3', name: 'Bem Avaliados', value: "top_rated" },
    { id: '4', name: 'Populares', value: "popular" },
  ];

  const loadMoreFixed = async () => {
    setLoading(true);
    const response = await api.get(`/movie/popular`, {
      params: {
        page
      }
    });
    setFixedDiscovered([...fixedDiscovered, ...response.data.results])
    setPageFixed(pageFixed + 1);
    setLoading(false);
  };

  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get(`/movie/${currentQuery}`, {
      params: {
        page
      }
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results])
    setPage(page + 1);
    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
      setNoResult(false);
    }

  }

  const navigation = useNavigation();

  const changeList = (value:string) => {
    setCurrentQuery(value);
    setPage(1);
    setDiscoveryMovies([]);
    loadMoreData();

  }

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies data={item} onPress={() => navigation.navigate("Details", { movieID: item.id })} />
  )

  const renderCategory = ({ item }) => (
    <Text  onPress={() => changeList(item.value)} style={styles.categoriesText && {color: item.value === currentQuery? "#0296e5":"#fff"}}>{item.name}</Text>
  );

  const renderMovieFixed = ({ item }: { item: Movie }) => (
    <CardFixed data={item} onPress={() => navigation.navigate("Details", { movieID: item.id })} />
  )

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies

  const searchMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
      }
    })

    if (response.data.results.length === 0) {
      setNoResult(true);
    } else {
      setSearchResultMovies(response.data.results)
      setNoResult(false)
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMoreData();
    loadMoreFixed();
  }, [])

  console.log()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MOVIES APP</Text>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor={"#fff"}
            placeholder='Buscar'
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color='#fff' size={25} weight='light' />
        </View>
        {noResult && (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para "{search}"
          </Text>
        )}
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={fixedDiscovered}
          keyExtractor={(item) => item.id + 'a'}
          renderItem={renderMovieFixed}
          horizontal={true} // Se deseja que a lista seja horizontal
        />
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          horizontal={true} // Se deseja que a lista seja horizontal
          contentContainerStyle={styles.categoriesContainer}
          onEndReached={() => loadMoreFixed()}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={50} color="#0296E5" />}
      </View>
    </View>
  )
}


