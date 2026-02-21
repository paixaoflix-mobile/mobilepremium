import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EpisodeModal = ({ isOpen, onClose, serie }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    if (isOpen && serie) {
      loadEpisodes();
    }
  }, [isOpen, serie]);

  const loadEpisodes = async () => {
    setLoading(true);
    try {
      // Carregar episódios do JSON local
      const response = await fetch('/episodes.json');
      const allEpisodes = await response.json();
      
      // Filtrar episódios da série atual
      const serieEpisodes = allEpisodes.filter(
        episode => episode.serie_id === serie.id.toString()
      );
      
      setEpisodes(serieEpisodes);
    } catch (error) {
      console.error('Erro ao carregar episódios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    // Abrir player com o episódio específico
    window.location.href = `/player.html?content=${encodeURIComponent(episode.titulo_episodio)}&id=${episode.serie_id}&type=tv&episode=${episode.episodio}&season=${episode.temporada}`;
    // Atualiza o título para o nome do sistema
    document.title = 'WebTV Prime - Streaming Premium';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${serie.name || serie.title} - Episódios`}>
      <div style={{ minHeight: '400px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px', color: '#e50914' }}>Carregando episódios...</div>
          </div>
        ) : (
          <div>
            {episodes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '16px', color: '#ccc' }}>Nenhum episódio encontrado.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {episodes.map((episode) => (
                  <div
                    key={`${episode.temporada}-${episode.episodio}`}
                    onClick={() => handleEpisodeClick(episode)}
                    style={{
                      display: 'flex',
                      gap: '15px',
                      padding: '15px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedEpisode?.episodio === episode.episodio ? '2px solid #e50914' : 'none'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <img
                      src={episode.thumbnail}
                      alt={episode.titulo_episodio}
                      style={{
                        width: '120px',
                        height: '68px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '5px'
                      }}>
                        T{episode.temporada}:E{episode.episodio} - {episode.titulo_episodio}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#ccc',
                        marginBottom: '5px'
                      }}>
                        {episode.descricao}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#e50914'
                      }}>
                        {episode.duracao} • {episode.data_lancamento}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EpisodeModal;
