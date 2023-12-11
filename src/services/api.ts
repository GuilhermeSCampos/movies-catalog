import axios from 'axios';

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "457b5634d9f7bd85f10c4f8e5abf3017",
    language: "pt-BR",
    include_adult: false,
  }
})