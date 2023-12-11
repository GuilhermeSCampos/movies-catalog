import { Pressable, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface Movie {
  id: number;
  poster_path: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

export default function CardMovies({data, ...rest}: Props) {
  return (
    <Pressable {...rest} style={styles.cardMovies}>
      <Image 
      source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}
      style={styles.cardImage}
      />
      
    </Pressable>
  )
}