// Service Worker para PWA Offline
const CACHE_NAME = 'webtv-player-v1';
const CACHE_SIZE = 100 * 1024 * 1024; // 100MB

// Arquivos para cache inicial
const CACHE_URLS = [
    '/',
    '/player.html',
    '/index.html',
    '/cinema.html',
    '/series.html',
    '/movies.html',
    'https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-stats@latest/dist/clappr-stats.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-playback-rate-plugin@latest/dist/clappr-playback-rate-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-level-selector-plugin@latest/dist/clappr-level-selector-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-pip-plugin@latest/dist/clappr-pip-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-chromecast-plugin@latest/dist/clappr-chromecast-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-ads-plugin@latest/dist/clappr-ads-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-thumbnail-plugin@latest/dist/clappr-thumbnail-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-dash-shaka-playback@latest/dist/clappr-dash-shaka-playback.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-hlsjs-playback@latest/dist/clappr-hlsjs-playback.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-youtube-playback@latest/dist/clappr-youtube-playback.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-ga-plugin@latest/dist/clappr-ga-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-watermark-plugin@latest/dist/clappr-watermark-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-poster-plugin@latest/dist/clappr-poster-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-quality-plugin@latest/dist/clappr-quality-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-volume-fade-plugin@latest/dist/clappr-volume-fade-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-cc-button-plugin@latest/dist/clappr-cc-button-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-seekbar-marker-plugin@latest/dist/clappr-seekbar-marker-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-media-control-plugin@latest/dist/clappr-media-control-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-analytics-plugin@latest/dist/clappr-analytics-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-error-screen-plugin@latest/dist/clappr-error-screen-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-persistent-playback-plugin@latest/dist/clappr-persistent-playback-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-multi-audio-plugin@latest/dist/clappr-multi-audio-plugin.min.js',
    'https://cdn.jsdelivr.net/npm/clappr-live-dvr-plugin@latest/dist/clappr-live-dvr-plugin.min.js',
    'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker instalado');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cache aberto:', CACHE_NAME);
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                self.skipWaiting();
                console.log('✅ Cache inicial completo');
            })
            .catch((error) => {
                console.error('❌ Erro no cache inicial:', error);
            })
    );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
    console.log('🔧 Service Worker ativado');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
            console.log('✅ Service Worker pronto');
        })
    );
});

// Interceptar requisições de rede
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Verificar se é uma requisição de vídeo
    if (isVideoRequest(url)) {
        event.respondWith(handleVideoRequest(request));
    } else {
        event.respondWith(handleNetworkRequest(request));
    }
});

// Verificar se é requisição de vídeo
function isVideoRequest(url) {
    const videoExtensions = ['.mp4', '.webm', '.m3u8', '.mpd', '.mov', '.avi'];
    return videoExtensions.some(ext => url.pathname.includes(ext));
}

// Lidar com requisições de vídeo
async function handleVideoRequest(request) {
    try {
        // Tentar cache primeiro
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📦 Vídeo do cache:', request.url);
            return cachedResponse;
        }
        
        // Se não está no cache, buscar da rede
        const networkResponse = await fetch(request);
        
        // Verificar se pode cachear (respeitar limites)
        if (networkResponse.ok && canCacheVideo(networkResponse)) {
            const responseClone = networkResponse.clone();
            
            // Adicionar ao cache
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, responseClone);
            
            console.log('💾 Vídeo cacheado:', request.url);
            
            // Notificar clientes sobre atualização do cache
            notifyClients('CACHE_UPDATED', { url: request.url });
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Erro na requisição de vídeo:', error);
        return new Response('Erro ao carregar vídeo', { status: 500 });
    }
}

// Lidar com requisições de rede
async function handleNetworkRequest(request) {
    try {
        // Tentar cache primeiro
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📦 Recurso do cache:', request.url);
            return cachedResponse;
        }
        
        // Se não está no cache, buscar da rede
        const networkResponse = await fetch(request);
        
        // Cache de recursos estáticos
        if (networkResponse.ok && isStaticResource(request.url)) {
            const responseClone = networkResponse.clone();
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, responseClone);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Erro na requisição de rede:', error);
        return new Response('Erro ao carregar recurso', { status: 500 });
    }
}

// Verificar se pode cachear vídeo
function canCacheVideo(response) {
    // Verificar tamanho do vídeo
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > CACHE_SIZE) {
        return false;
    }
    
    // Verificar tipo de conteúdo
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('video/')) {
        return false;
    }
    
    return true;
}

// Verificar se é recurso estático
function isStaticResource(url) {
    const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
    return staticExtensions.some(ext => url.includes(ext));
}

// Notificar clientes
function notifyClients(type, data) {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            if (client.readyState === 'activated') {
                client.postMessage({
                    type: type,
                    data: data,
                    timestamp: Date.now()
                });
            }
        });
    });
}

// Background Sync
self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(CACHE_URLS);
            }).then(() => {
                console.log('✅ Background sync completo');
            })
        );
    }
});

// Push notifications (opcional)
self.addEventListener('push', (event) => {
    console.log('📢 Push notification:', event.data);
    
    const options = {
        body: event.data.text || 'Nova atualização disponível',
        icon: '/icon.png',
        badge: '/badge.png',
        tag: 'webtv-update',
        renotify: true
    };
    
    event.waitUntil(
        self.registration.showNotification('WebTV', options)
    );
});

// Limpeza de cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        console.log('🗑️ Limpando cache...');
        
        caches.delete(CACHE_NAME).then(() => {
            console.log('✅ Cache limpo');
            
            // Notificar clientes
            notifyClients('CACHE_CLEARED', { timestamp: Date.now() });
        });
    }
});

// Verificar status do cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_STATUS') {
        caches.open(CACHE_NAME).then((cache) => {
            return cache.keys();
        }).then((keys) => {
            const cacheInfo = {
                name: CACHE_NAME,
                keys: keys.length,
                size: 'Calculando...',
                timestamp: Date.now()
            };
            
            // Calcular tamanho aproximado
            Promise.all(keys.map(key => cache.match(key))).then((responses) => {
                let totalSize = 0;
                responses.forEach(response => {
                    if (response) {
                        const contentLength = response.headers.get('content-length');
                        if (contentLength) {
                            totalSize += parseInt(contentLength);
                        }
                    }
                });
                
                cacheInfo.size = formatBytes(totalSize);
                
                // Notificar clientes
                notifyClients('CACHE_STATUS_RESPONSE', cacheInfo);
            });
        });
    }
});

// Formatar bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

console.log('🔧 Service Worker WebTV carregado');
