import React from 'react';

const App = () => {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <a href="/" className="logo">🔥 WebTV Prime</a>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/cinema">Cinema</a>
          <a href="/series">Séries</a>
          <a href="/filmes">Filmes</a>
          <a href="/filmes-kids">Filmes Kids</a>
          <a href="/series-kids">Séries Kids</a>
          <a href="/mylist">Meus Favoritos</a>
          <a href="/tv-ao-vivo">TV ao Vivo</a>
          <a href="/player.html">Player</a>
        </nav>
        <div className="user-menu">
          <div className="user-avatar">👤</div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <section className="welcome">
          <h1>Bem-vindo ao WebTV Prime</h1>
          <p>Escolha uma opção no menu acima para começar a explorar nosso conteúdo.</p>
        </section>
      </main>
    </div>
  );
};

export default App;
