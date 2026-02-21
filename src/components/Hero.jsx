import React from 'react';
import { useHeroTrailer } from '../hooks/useHeroTrailer';
import { getImageUrl, getBackdropUrl } from '../services/tmdb';

const Hero = () => {
  const {
    heroMovie,
    trailerUrl,
    isLoading,
    selectMovieForHero,
    handleMovieHover,
    handleMovieLeave,
    clearTrailer
  } = useHeroTrailer();

  const handlePlay = () => {
    if (heroMovie) {
      const title = heroMovie.title || heroMovie.name || 'Conteúdo';
      window.location.href = `/player.html?content=${encodeURIComponent(title)}&id=${heroMovie.id}&type=${heroMovie.title ? 'movie' : 'tv'}`;
      document.title = 'WebTV Prime - Streaming Premium';
    }
  };

  const handleInfo = () => {
    if (heroMovie) {
      alert(`Informações sobre: ${heroMovie.title || heroMovie.name}\n\nSinopse: ${heroMovie.overview || 'Não disponível'}\n\nAvaliação: ${heroMovie.vote_average || 'N/A'}\n\nLançamento: ${heroMovie.release_date || heroMovie.first_air_date || 'N/A'}`);
    }
  };

  if (!heroMovie) {
    return (
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Carregando...</h1>
        </div>
      </section>
    );
  }

  const title = heroMovie.title || heroMovie.name || 'Título não disponível';
  const year = heroMovie.release_date 
    ? new Date(heroMovie.release_date).getFullYear() 
    : heroMovie.first_air_date 
      ? new Date(heroMovie.first_air_date).getFullYear() 
      : 'N/A';
  const rating = heroMovie.vote_average ? heroMovie.vote_average.toFixed(1) : 'N/A';
  const runtime = heroMovie.runtime || 45;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const duration = `${hours}h ${minutes}min`;

  return (
    <section className="hero">
      {trailerUrl ? (
        <iframe
          src={trailerUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 1
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: heroMovie.backdrop_path 
              ? `url(${getBackdropUrl(heroMovie.backdrop_path)})` 
              : 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }}
        />
      )}
      
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          <span className="match">98% Correspondente</span>
          <span>{year}</span>
          <span className="rating">{rating}</span>
          <span>{duration}</span>
        </div>
        <p className="hero-description">
          {heroMovie.overview || 'Sinopse não disponível'}
        </p>
        <div className="hero-buttons">
          <button className="btn btn-play" onClick={handlePlay}>
            <span>▶</span>
            Assistir Agora
          </button>
          <button className="btn btn-info" onClick={handleInfo}>
            <span>ℹ</span>
            Mais Informações
          </button>
        </div>
        {isLoading && (
          <div className="loading-trailer">
            <div className="spinner"></div>
            <span>Carregando trailer...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
