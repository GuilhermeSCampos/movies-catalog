import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type MovieContextData = {
  favoriteMovies: number[];
  allFavoriteMovies: Movie[];
  addFavoriteMovies: (movieId: number) => void;
  removeFavoriteMovies: (movieId: number) => void;
}

export const MovieContext = createContext<MovieContextData>(
  {
    favoriteMovies: [],
    allFavoriteMovies: [],
    addFavoriteMovies: () => { },
    removeFavoriteMovies: () => { }
  }
)

type MovieProviderProps = {
  children: React.ReactNode
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMovies = await AsyncStorage.getItem("@FavoriteMovies")

      if (favoriteMovies) {
        setFavoriteMovies(JSON.parse(favoriteMovies));
        loadMoviesData(JSON.parse(favoriteMovies));
      }
    }
    loadFavoriteMovies();
  }, [])

  const addFavoriteMovies = async (movieId: number) => {
    if (!favoriteMovies.includes(movieId)) {
      const newFavoriteMovies = [...favoriteMovies, movieId];
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
      loadMoviesData(newFavoriteMovies);
    } else {
      removeFavoriteMovies(movieId)
      const newMoviesData = allFavoriteMovies.filter((e) => e.id !== movieId)
      setAllFavoriteMovies(newMoviesData)
    }
  }

  const removeFavoriteMovies = async (movieId: number) => {
    const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId)
    setFavoriteMovies(newFavoriteMovies);

    await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
  }


  const loadMoviesData = useCallback(
    async (ids: number[]) => {

        const moviesData = await Promise.all(
          ids.map(async (e) => {
            const response = await api.get(`/movie/${e}`);
            return response.data;
          })
        );
        setAllFavoriteMovies(moviesData);
      
    }, [])

  const contextData: MovieContextData = {
    favoriteMovies,
    allFavoriteMovies,
    addFavoriteMovies,
    removeFavoriteMovies
  }


  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  )
}