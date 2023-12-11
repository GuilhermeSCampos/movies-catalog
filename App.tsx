import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Routes } from './src/routes';
import { MovieProvider } from './src/contexts/MoviesContext';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <MovieProvider>
        <Routes />
        <StatusBar style="auto" />
      </MovieProvider>
    </>
  );
}
