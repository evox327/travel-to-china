'use client';

import { useState, useEffect } from 'react';
import { getWeatherData } from '@/lib/weather';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

interface WeatherWidgetProps {
  city?: string;
  className?: string;
}

export default function WeatherWidget({ city = 'Beijing', className = '' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherData(city);
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取天气信息失败');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className={`bg-blue-50 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-blue-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className={`bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{weather.city}</h3>
          <p className="text-2xl font-bold">{weather.temperature}°C</p>
          <p className="text-blue-100">{weather.condition}</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-blue-100">湿度: {weather.humidity}%</p>
          <p className="text-blue-100">风速: {weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}