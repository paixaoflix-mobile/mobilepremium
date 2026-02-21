import React, { useState } from 'react';
import { getImageUrl } from '../services/tmdb';

const MovieCard = ({ movie, onMouseEnter, onMouseLeave }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterPath = getImageUrl(movie.poster_path, 'w500');
  const title = movie.title || movie.name || 'Título não disponível';
  const year = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : movie.first_air_date 
      ? new Date(movie.first_air_date).getFullYear() 
      : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  const handleSyncClick = (e) => {
    e.stopPropagation();
    window.location.href = `/player.html?content=${encodeURIComponent(title)}&id=${movie.id}&type=${movie.title ? 'movie' : 'tv'}`;
    document.title = 'WebTV Prime - Streaming Premium';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => onMouseEnter(movie)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={posterPath}
        alt={title}
        onLoad={handleImageLoad}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: imageLoaded ? 'block' : 'none'
        }}
      />
      
      {imageLoaded && (
        <div className="movie-overlay">
          <div className="movie-title">{title}</div>
          <div className="movie-info">⭐ {rating} • {year}</div>
        </div>
      )}
      
      <div className="sync-icon" title={movie.first_air_date ? "Ver Episódios" : "Sincronizar"} onClick={handleSyncClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </div>
      
      {!imageLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30px',
          height: '30px',
          border: '3px solid #e50914',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
    </div>
  );
};

export default MovieCard;
