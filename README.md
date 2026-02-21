# WebTV Prime - Streaming Premium

Uma aplicação de streaming completa inspirada no Prime Video, construída com React, Vite e a API do TMDB para dados reais de filmes e séries.

## 🚀 Funcionalidades

### 📱 Mobile & Casting Features
- **Chromecast SDK**: Suporte completo para Google Cast
- **AirPlay**: Streaming para dispositivos Apple
- **Fullscreen API**: Experiência de tela cheia nativa
- **Picture-in-Picture API**: Modo picture-in-picture
- **Media Session API**: Controle via notificações do sistema
- **Wake Lock API**: Mantém a tela ativa durante playback
- **Service Worker**: PWA com suporte offline

### 🎬 Advanced Custom Features
- **Continue Watching**: Retoma de onde parou
- **Autoplay Next Episode**: Reprodução automática do próximo episódio
- **Skip Intro Button**: Botão para pular introdução
- **Timeline Thumbnails**: Miniaturas na timeline do vídeo
- **Parental Control PIN**: Controle parental com PIN
- **Multi-user Profiles**: Perfis de usuário múltiplos
- **Dynamic Watermark**: Marca d'água dinâmica
- **Anti-screen Recording**: Proteção contra gravação de tela
- **Multi-screen Control**: Controle em múltiplas telas
- **Playback History**: Histórico de visualização
- **Smart Cache**: Cache inteligente de conteúdo
- **Cinema Mode**: Modo cinema com experiência otimizada
- **Intelligent Preload**: Pré-carregamento inteligente
- **Intro Detection**: Detecção automática de introduções
- **Behavior-based Recommendations**: Recomendações baseadas no comportamento
- **Live Chat**: Chat ao vivo durante conteúdo
- **Rating System**: Sistema de avaliação
- **Progress Sync API**: Sincronização de progresso
- **Favorites System**: Sistema de favoritos
- **Encrypted Offline Downloads**: Downloads offline criptografados
- **Geo-blocking**: Bloqueio geográfico
- **Floating Player**: Player flutuante ao rolar a página

### 🎨 Interface Principal
- **Dynamic Hero Banner**: Banner principal que atualiza com hover nos cards
- **Horizontal Carousels**: Carrosseis horizontais para diferentes categorias
- **Sticky Hero**: Banner fixo com efeito de scroll
- **Real TMDB Data**: Todos os dados são reais da API TMDB (sem mocks)
- **Responsive Design**: Design responsivo para todos os dispositivos

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite
- **Estilo**: CSS puro com variáveis CSS
- **API**: TMDB API (The Movie Database)
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Estrutura do Projeto

```
mobilepremium/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Componente do banner principal
│   │   ├── Row.jsx           # Componente de seção/carrossel
│   │   └── MovieCard.jsx     # Componente de card de filme/série
│   ├── services/
│   │   └── tmdb.js           # Serviço da API TMDB
│   ├── hooks/
│   │   └── useHeroTrailer.js # Hook para gerenciar hero trailers
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Ponto de entrada
│   └── index.css             # Estilos globais
├── public/
│   ├── index.html            # Página HTML principal
│   ├── cinema.html           # Página de cinema
│   ├── series.html           # Página de séries
│   ├── kids.html             # Página infantil
│   └── player.html           # Player avançado
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd mobilepremium

# Instalar dependências
npm install
```

### Execução em Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 🔧 Configuração

### API TMDB
O projeto usa a API do TMDB com a chave configurada no ambiente:

```javascript
// vite.config.js
define: {
  'process.env.VITE_API_KEY': '"b275ce8e1a6b3d5d879bb0907e4f56ad"',
  'process.env.VITE_BASE_URL': '"https://api.themoviedb.org/3"',
  'process.env.VITE_IMAGE_BASE_URL': '"https://image.tmdb.org/t/p/original"',
  'process.env.VITE_IMAGE_W500_URL': '"https://image.tmdb.org/t/p/w500"'
}
```

## 📱 Páginas Disponíveis

- **Home** (`/`): Página principal com filmes em alta
- **Cinema** (`/cinema.html`): Filmes em cartaz e lançamentos
- **Séries** (`/series.html`): Séries populares e em exibição
- **Kids** (`/kids.html`): Conteúdo infantil e educativo
- **Player** (`/player.html`): Player avançado com todas as features

## 🎯 Features Técnicas

### Performance
- **Lazy Loading**: Carregamento preguiçoso de imagens
- **Request Cancellation**: Cancelamento de requisições
- **Debounce on Hover**: Debounce em eventos de hover
- **Smart Caching**: Cache inteligente de dados

### UX/UI
- **Smooth Scrolling**: Scroll suave para o hero
- **Hover Effects**: Efeitos de hover nos cards
- **Loading States**: Estados de carregamento
- **Error Handling**: Tratamento de erros elegante
- **Empty States**: Estados vazios informativos

### Acessibilidade
- **Semantic HTML**: HTML semântico
- **ARIA Labels**: Labels ARIA para screen readers
- **Keyboard Navigation**: Navegação por teclado
- **Focus Management**: Gerenciamento de foco

## 🎨 Design System

### Cores
- **Primary**: #E50914 (Vermelho Netflix)
- **Background**: #0F171E (Fundo escuro)
- **Text**: #FFFFFF (Branco)
- **Secondary**: #B3B3B3 (Cinza claro)

### Fontes
- **Primary**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Animações
- **Fade In**: Animação de entrada suave
- **Scale**: Efeito de escala em hover
- **Pulse**: Animação de pulso para elementos importantes

## 🔄 Fluxo de Dados

1. **API Calls**: Requisições para a API TMDB via serviço `tmdb.js`
2. **State Management**: Estado gerenciado com hooks React
3. **Component Rendering**: Componentes reagem às mudanças de estado
4. **User Interactions**: Interações do usuário atualizam o estado
5. **Hero Updates**: Hero banner atualiza com base na seleção

## 🚀 Deploy

O projeto está pronto para deploy em qualquer plataforma estática:

- **Vercel**: `npm run build` e deploy da pasta `dist`
- **Netlify**: `npm run build` e upload da pasta `dist`
- **GitHub Pages**: Configurar para deploy da branch `gh-pages`

## 📝 Licença

Este projeto é para fins educacionais e demonstração.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Contato

Para dúvidas ou suporte, entre em contato.
