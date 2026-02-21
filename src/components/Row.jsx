import React from 'react';
import MovieCard from './MovieCard';

const Row = ({ title, movies, loading, error, onMovieHover, onMovieLeave }) => {
  if (loading) {
    return (
      <div className="row">
        <h2 className="row-title">{title}</h2>
        <div className="row-loading">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <h2 className="row-title">{title}</h2>
        <div className="row-error">Erro ao carregar conteúdo</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="movie-carousel">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMouseEnter={onMovieHover}
            onMouseLeave={onMovieLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
