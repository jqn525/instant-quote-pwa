const CACHE_NAME = 'instant-quote-v2';
const STATIC_CACHE = 'instant-quote-static-v2';
const DYNAMIC_CACHE = 'instant-quote-dynamic-v2';

// Critical assets that must be cached for offline functionality
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/app.js',
  '/src/styles/main.css',
  '/src/data/products.js',
  '/src/data/paperStocks.js',
  '/src/services/PricingEngine.js',
  '/src/services/QuoteService.js',
  '/src/services/CartService.js',
  '/src/services/SettingsService.js',
  '/src/components/ProductSelector.js',
  '/src/components/SizeSelector.js',
  '/src/components/QuantitySelector.js',
  '/src/components/PriceDisplay.js',
  '/src/components/CartDisplay.js',
  '/src/components/HamburgerMenu.js',
  '/src/components/SettingsPanel.js',
  '/src/components/SvgIcons.js',
  '/public/manifest.json'
];

// Resources that can be cached dynamically
const CACHEABLE_PATTERNS = [
  /\.(js|css|html|json)$/,
  /\/src\//,
  /\/public\//
];

const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Install event - cache static assets with optimized strategy
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        // Pre-cache critical static assets for offline functionality
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Activate new service worker immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches with optimized strategy
self.addEventListener('activate', (event) => {
  const validCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!validCaches.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Service worker activation failed:', error);
      })
  );
});

// Fetch event - optimized caching strategy with stale-while-revalidate
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  const isStaticAsset = STATIC_ASSETS.some(asset => url.pathname === asset);
  const isCacheableResource = CACHEABLE_PATTERNS.some(pattern => pattern.test(url.pathname));

  event.respondWith(
    (async () => {
      try {
        // Check static cache first for critical assets
        if (isStaticAsset) {
          const staticCache = await caches.open(STATIC_CACHE);
          const cachedResponse = await staticCache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
        }

        // Check dynamic cache for other resources
        const dynamicCache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await dynamicCache.match(event.request);

        // Stale-while-revalidate: serve from cache and update in background
        if (cachedResponse && isCacheableResource) {
          // Return cached response immediately
          const responseToReturn = cachedResponse.clone();
          
          // Update cache in background for next request
          fetch(event.request)
            .then((freshResponse) => {
              if (freshResponse && freshResponse.status === 200 && freshResponse.type === 'basic') {
                dynamicCache.put(event.request, freshResponse.clone());
              }
            })
            .catch(() => {
              // Network update failed, but we already served from cache
            });

          return responseToReturn;
        }

        // No cache available, fetch from network
        const networkResponse = await fetch(event.request);

        // Cache successful responses for future use
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          if (isCacheableResource) {
            const responseToCache = networkResponse.clone();
            dynamicCache.put(event.request, responseToCache);
          }
        }

        return networkResponse;

      } catch (error) {
        // Network and cache both failed
        if (event.request.destination === 'document') {
          // Try to serve app shell for navigation requests
          const staticCache = await caches.open(STATIC_CACHE);
          return staticCache.match('/index.html') || new Response('Offline', { status: 503 });
        }
        
        // For other resources, return a basic error response
        return new Response('Resource unavailable offline', { status: 503 });
      }
    })()
  );
});

// Background sync for quote saving (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'save-quote') {
    event.waitUntil(
      // Could implement quote syncing to a server here
      Promise.resolve()
    );
  }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png'
      })
    );
  }
});