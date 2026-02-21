import axios from 'axios';

const API_KEY = 'b275ce8e1a6b3d5d879bb0907e4f56ad';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdb.get('/trending/movie/week');
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes em alta:', error);
    throw error;
  }
};

export const fetchDiscoverMovies = async () => {
  try {
    const response = await tmdb.get('/discover/movie');
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes discover:', error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await tmdb.get('/movie/popular', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes populares:', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await tmdb.get('/movie/top_rated', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes bem avaliados:', error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await tmdb.get('/movie/upcoming', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar lançamentos:', error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await tmdb.get('/movie/now_playing', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes em cartaz:', error);
    throw error;
  }
};

export const fetchTrendingSeries = async () => {
  try {
    const response = await tmdb.get('/trending/tv/week');
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar séries em alta:', error);
    throw error;
  }
};

export const fetchPopularSeries = async () => {
  try {
    const response = await tmdb.get('/tv/popular', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar séries populares:', error);
    throw error;
  }
};

export const fetchTopRatedSeries = async () => {
  try {
    const response = await tmdb.get('/tv/top_rated', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar séries bem avaliadas:', error);
    throw error;
  }
};

export const fetchAiringToday = async () => {
  try {
    const response = await tmdb.get('/tv/airing_today', {
      params: { page: 1 }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar séries em exibição:', error);
    throw error;
  }
};

export const fetchKidsMovies = async () => {
  try {
    const response = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 10751,
        sort_by: 'popularity.desc',
        page: 1
      }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar filmes infantis:', error);
    throw error;
  }
};

export const fetchKidsSeries = async () => {
  try {
    const response = await tmdb.get('/discover/tv', {
      params: {
        with_genres: 10762,
        sort_by: 'popularity.desc',
        page: 1
      }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar séries infantis:', error);
    throw error;
  }
};

export const fetchAnimation = async () => {
  try {
    const response = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 16,
        sort_by: 'popularity.desc',
        page: 1
      }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar animações:', error);
    throw error;
  }
};

export const fetchEducational = async () => {
  try {
    const response = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 99,
        sort_by: 'popularity.desc',
        page: 1
      }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Erro ao carregar conteúdo educativo:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error);
    throw error;
  }
};

export const getTVDetails = async (tvId) => {
  try {
    const response = await tmdb.get(`/tv/${tvId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar detalhes da série:', error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao carregar vídeos do filme:', error);
    throw error;
  }
};

export const getTVVideos = async (tvId) => {
  try {
    const response = await tmdb.get(`/tv/${tvId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao carregar vídeos da série:', error);
    throw error;
  }
};

export const getImageUrl = (path, size = 'original') => 
  path ? `${IMAGE_BASE_URL.replace('original', size)}${path}` : null;

export const getBackdropUrl = (path) => 
  path ? `${IMAGE_BASE_URL}${path}` : null;

export default tmdb;
