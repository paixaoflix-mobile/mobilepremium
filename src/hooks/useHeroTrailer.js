import { useState, useCallback, useRef } from 'react';
import { getMovieVideos, getTVVideos, getBackdropUrl } from '../services/tmdb';

export const useHeroTrailer = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const trailerTimeoutRef = useRef(null);

  const clearTrailerTimeout = useCallback(() => {
    if (trailerTimeoutRef.current) {
      clearTimeout(trailerTimeoutRef.current);
      trailerTimeoutRef.current = null;
    }
  }, []);

  const loadTrailer = useCallback(async (movie) => {
    if (!movie) return;
    
    setIsLoading(true);
    clearTrailerTimeout();

    try {
      const videos = movie.title 
        ? await getMovieVideos(movie.id)
        : await getTVVideos(movie.id);

      const trailer = videos.find(video => 
        video.type === 'Trailer' && 
        video.site === 'YouTube'
      );

      if (trailer) {
        trailerTimeoutRef.current = setTimeout(() => {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0`);
          setIsLoading(false);
        }, 1500);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao carregar trailer:', error);
      setIsLoading(false);
    }
  }, []);

  const clearTrailer = useCallback(() => {
    clearTrailerTimeout();
    setTrailerUrl(null);
    setIsLoading(false);
  }, []);

  const selectMovieForHero = useCallback((movie) => {
    setHeroMovie(movie);
    setTrailerUrl(null);
    setIsLoading(false);
    clearTrailerTimeout();
  }, []);

  const handleMovieHover = useCallback((movie) => {
    selectMovieForHero(movie);
    loadTrailer(movie);
  }, [selectMovieForHero, loadTrailer]);

  const handleMovieLeave = useCallback(() => {
    clearTrailerTimeout();
    setIsLoading(false);
  }, [clearTrailerTimeout]);

  return {
    heroMovie,
    trailerUrl,
    isLoading,
    selectMovieForHero,
    handleMovieHover,
    handleMovieLeave,
    clearTrailer,
    getBackdropUrl
  };
};
