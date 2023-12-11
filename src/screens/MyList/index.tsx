import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MovieContext } from '../../contexts/MoviesContext';

import { CalendarBlank, CaretLeft, Clock, Star, Ticket } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import CardMovies from '../../components/CardMovies';


export function MyList() {
  // Use o hook useContext para obter os valores do contexto
  const { allFavoriteMovies } = useContext(MovieContext);

  const { goBack, navigate } = useNavigation();

  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  }
  const renderMovieItem = ({ item }: { item }) => (
    <View style={styles.card}>
      <CardMovies data={item} onPress={() => navigate("Details", { movieID: item.id })} />
      <View style={styles.description}>
        <Text style={styles.cardText}>{item.title}</Text>
        <View style={styles.descriptionGroup}>
          <Star
            color={
              item?.vote_average.toFixed(2) >= "7"
                ? "#FF8700"
                : "#92929D"
            }
            size={25}
            weight={
              item?.vote_average.toFixed(2) >= "7"
                ? "duotone"
                : "thin"
            }
          />
          <Text
            style={[
              item?.vote_average.toFixed(2) >= "7"
                ? styles.descriptionText1
                : styles.descriptionText,
            ]}
          >
            {item?.vote_average.toFixed(1)}
          </Text>
        </View>
        <View style={styles.descriptionGroup}>
          <CalendarBlank color="#92929D" size={25} weight="thin" />
          <Text style={styles.descriptionText}>
            {getYear(item?.release_date)}
          </Text>
        </View>
        <View style={styles.descriptionGroup}>
          <Ticket color="#92929D" size={25} weight="thin" />
          <Text style={styles.descriptionText}>
            {item?.genres[0].name}
          </Text>
        </View>
        <View style={styles.descriptionGroup}>
          <Clock color="#92929D" size={25} weight="thin" />
          <Text
            style={styles.descriptionText}
          >{`${item?.runtime} minutos`}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Assistidos</Text>
      </View>
      <FlatList
        data={allFavoriteMovies}
        renderItem={renderMovieItem}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 35,
          paddingBottom: 100
        }}

      />
    </View>
  );
}
