'use client';

import { useState, useEffect } from 'react';
import { defaultCache } from '@/lib/cache';
import { getWeatherCacheStats, cleanWeatherCache, preloadWeatherData } from '@/lib/weather';

interface CacheStats {
  memory: {
    size: number;
    maxSize: number;
    hitRate: number;
  };
  storage: {
    size: number;
    hitRate: number;
  };
}

export default function CacheManager() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshStats = () => {
    const cacheStats = (defaultCache as any).getStats();
    setStats(cacheStats as CacheStats);
  };

  useEffect(() => {
    refreshStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClearCache = async () => {
    setLoading(true);
    try {
      await defaultCache.clear();
      refreshStats();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanupCache = () => {
    setLoading(true);
    try {
      (defaultCache as any).cleanup();
      refreshStats();
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreloadWeather = async () => {
    setLoading(true);
    try {
      const popularCities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'];
      await preloadWeatherData(popularCities);
      refreshStats();
    } catch (error) {
      console.error('Failed to preload weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">缓存管理</h2>
        <button
          onClick={refreshStats}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          刷新
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">内存缓存</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">缓存项数:</span>
              <span className="font-medium">{stats.memory.size} / {stats.memory.maxSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">使用率:</span>
              <span className="font-medium">
                {((stats.memory.size / stats.memory.maxSize) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(stats.memory.size / stats.memory.maxSize) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">本地存储</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">状态:</span>
              <span className="font-medium text-green-600">活跃</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">自动清理:</span>
              <span className="font-medium text-blue-600">启用</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">缓存操作</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleCleanupCache}
            disabled={loading}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '处理中...' : '清理过期缓存'}
          </button>
          
          <button
            onClick={handlePreloadWeather}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '预加载中...' : '预加载天气'}
          </button>
          
          <button
            onClick={handleClearCache}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '清理中...' : '清空所有缓存'}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">缓存策略说明</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 天气数据缓存 10 分钟，减少 API 调用</li>
          <li>• 景点数据缓存 5 分钟，提升浏览体验</li>
          <li>• 内存缓存优先，本地存储作为备份</li>
          <li>• 自动清理过期数据，优化存储空间</li>
        </ul>
      </div>
    </div>
  );
}