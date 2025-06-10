interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100;
    this.defaultTTL = options.ttl || 5 * 60 * 1000; // 5 minutes default
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired items first
    this.cleanExpired();
    return this.cache.size;
  }

  private cleanExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((item, key) => {
      if (now > item.expiry) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Get cache statistics
  getStats() {
    this.cleanExpired();
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // Would need to track hits/misses for real implementation
    };
  }
}

class LocalStorageCache {
  private prefix: string;
  private defaultTTL: number;

  constructor(prefix = 'app_cache_', ttl = 30 * 60 * 1000) { // 30 minutes default
    this.prefix = prefix;
    this.defaultTTL = ttl;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    try {
      const expiry = Date.now() + (ttl || this.defaultTTL);
      const item: CacheItem<T> = {
        data: value,
        timestamp: Date.now(),
        expiry
      };
      
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(this.prefix + key);
      if (!stored) return null;

      const item: CacheItem<T> = JSON.parse(stored);
      
      if (Date.now() > item.expiry) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error);
      return null;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.warn('Failed to delete localStorage cache:', error);
      return false;
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  // Clean expired items
  cleanup(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
      keys.forEach(key => {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const item = JSON.parse(stored);
            if (Date.now() > item.expiry) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key); // Remove invalid items
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup localStorage cache:', error);
    }
  }
}

// Multi-layer cache strategy
class MultiLayerCache {
  private memoryCache: MemoryCache;
  private storageCache: LocalStorageCache;

  constructor(options: CacheOptions = {}) {
    this.memoryCache = new MemoryCache({
      maxSize: options.maxSize || 50,
      ttl: options.ttl || 5 * 60 * 1000 // 5 minutes for memory
    });
    
    this.storageCache = new LocalStorageCache(
      'travel_cache_',
      options.ttl || 30 * 60 * 1000 // 30 minutes for storage
    );
  }

  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    let data = this.memoryCache.get<T>(key);
    if (data) {
      return data;
    }

    // Try localStorage cache
    data = this.storageCache.get<T>(key);
    if (data) {
      // Promote to memory cache
      this.memoryCache.set(key, data, 5 * 60 * 1000); // 5 minutes in memory
      return data;
    }

    return null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // Set in both caches
    this.memoryCache.set(key, value, Math.min(ttl || 5 * 60 * 1000, 5 * 60 * 1000));
    this.storageCache.set(key, value, ttl || 30 * 60 * 1000);
  }

  async has(key: string): Promise<boolean> {
    return this.memoryCache.has(key) || this.storageCache.has(key);
  }

  async delete(key: string): Promise<boolean> {
    const memoryDeleted = this.memoryCache.delete(key);
    const storageDeleted = this.storageCache.delete(key);
    return memoryDeleted || storageDeleted;
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    this.storageCache.clear();
  }

  cleanup(): void {
    this.storageCache.cleanup();
  }

  getStats() {
    return {
      memory: this.memoryCache.getStats(),
      storage: {
        // Would need to implement storage stats
        size: 0,
        hitRate: 0
      }
    };
  }
}

// Cache factory
export function createCache(type: 'memory' | 'storage' | 'multi' = 'multi', options: CacheOptions = {}) {
  switch (type) {
    case 'memory':
      return new MemoryCache(options);
    case 'storage':
      return new LocalStorageCache('travel_cache_', options.ttl);
    case 'multi':
      return new MultiLayerCache(options);
    default:
      return new MultiLayerCache(options);
  }
}

// Default cache instance
export const defaultCache = createCache('multi', {
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 100
});

// Cache utilities
export const cacheUtils = {
  // Generate cache key from multiple parameters
  generateKey: (...parts: (string | number)[]): string => {
    return parts.map(part => String(part)).join(':');
  },

  // Cached function wrapper
  withCache: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ) => {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      const key = keyGenerator(...args);
      
      // Try to get from cache
      const cached = await defaultCache.get(key);
      if (cached !== null) {
        return cached as Awaited<ReturnType<T>>;
      }

      // Execute function and cache result
      const result = await fn(...args);
      await defaultCache.set(key, result, ttl);
      
      return result;
    };
  }
};