// 天气服务API配置和工具函数
import { defaultCache, cacheUtils } from './cache'

interface WeatherData {
  temperature: number
  condition: string
  conditionCode: string
  humidity: number
  windSpeed: number
  windDirection: string
  visibility: number
  pressure: number
  uvIndex: number
  feelLike: number
  city: string
  updateTime: string
  forecast: WeatherForecast[]
}

interface WeatherForecast {
  date: string
  dayOfWeek: string
  high: number
  low: number
  condition: string
  conditionCode: string
  rainfall: number
  windSpeed: number
}

// 天气状况映射（中英文）
const WEATHER_CONDITIONS = {
  'sunny': { zh: '晴天', icon: '☀️', color: 'text-yellow-500' },
  'cloudy': { zh: '多云', icon: '☁️', color: 'text-gray-500' },
  'overcast': { zh: '阴天', icon: '☁️', color: 'text-gray-600' },
  'light-rain': { zh: '小雨', icon: '🌦️', color: 'text-blue-500' },
  'moderate-rain': { zh: '中雨', icon: '🌧️', color: 'text-blue-600' },
  'heavy-rain': { zh: '大雨', icon: '⛈️', color: 'text-blue-800' },
  'thunderstorm': { zh: '雷阵雨', icon: '⛈️', color: 'text-purple-600' },
  'snow': { zh: '雪', icon: '❄️', color: 'text-blue-300' },
  'fog': { zh: '雾', icon: '🌫️', color: 'text-gray-400' },
  'haze': { zh: '霾', icon: '😶‍🌫️', color: 'text-yellow-600' },
  'sandstorm': { zh: '沙尘暴', icon: '🌪️', color: 'text-yellow-800' }
}

// 风向映射
const WIND_DIRECTIONS = {
  'N': '北风', 'NE': '东北风', 'E': '东风', 'SE': '东南风',
  'S': '南风', 'SW': '西南风', 'W': '西风', 'NW': '西北风'
}

// UV指数描述
const UV_INDEX_LEVELS = {
  0: { level: '无', color: 'text-green-500', description: '无需防护' },
  1: { level: '低', color: 'text-green-500', description: '可以正常外出' },
  2: { level: '低', color: 'text-green-500', description: '可以正常外出' },
  3: { level: '中等', color: 'text-yellow-500', description: '适当防护' },
  4: { level: '中等', color: 'text-yellow-500', description: '适当防护' },
  5: { level: '中等', color: 'text-yellow-500', description: '适当防护' },
  6: { level: '高', color: 'text-orange-500', description: '需要防护' },
  7: { level: '高', color: 'text-orange-500', description: '需要防护' },
  8: { level: '很高', color: 'text-red-500', description: '严格防护' },
  9: { level: '很高', color: 'text-red-500', description: '严格防护' },
  10: { level: '极高', color: 'text-purple-500', description: '避免外出' }
}

/**
 * 获取天气数据（使用和风天气API，带缓存）
 * @param city 城市名称
 * @param coordinates 经纬度坐标
 */
async function _getWeatherData(city: string, coordinates?: { lat: number; lng: number }): Promise<WeatherData | null> {
  try {
    // 这里使用和风天气API作为示例
    // 在实际部署时需要替换为真实的API密钥
    const apiKey = process.env.NEXT_PUBLIC_QWEATHER_API_KEY || 'demo-key'
    
    // 如果没有提供坐标，使用城市名称查询
    let location = city
    if (coordinates) {
      location = `${coordinates.lng},${coordinates.lat}`
    }

    // 获取当前天气
    const currentWeatherResponse = await fetch(
      `https://devapi.qweather.com/v7/weather/now?location=${encodeURIComponent(location)}&key=${apiKey}&lang=zh`
    )

    // 获取未来7天预报
    const forecastResponse = await fetch(
      `https://devapi.qweather.com/v7/weather/7d?location=${encodeURIComponent(location)}&key=${apiKey}&lang=zh`
    )

    if (!currentWeatherResponse.ok || !forecastResponse.ok) {
      console.error('天气API请求失败')
      return getMockWeatherData(city)
    }

    const currentData = await currentWeatherResponse.json()
    const forecastData = await forecastResponse.json()

    if (currentData.code !== '200' || forecastData.code !== '200') {
      console.error('天气API返回错误代码')
      return getMockWeatherData(city)
    }

    const current = currentData.now
    const forecast = forecastData.daily

    return {
      temperature: parseInt(current.temp),
      condition: getWeatherCondition(current.text),
      conditionCode: current.icon,
      humidity: parseInt(current.humidity),
      windSpeed: parseInt(current.windSpeed),
      windDirection: getWindDirection(current.windDir),
      visibility: parseInt(current.vis),
      pressure: parseInt(current.pressure),
      uvIndex: parseInt(current.uv || '0'),
      feelLike: parseInt(current.feelsLike),
      city: city,
      updateTime: current.obsTime,
      forecast: forecast.slice(0, 7).map((day: any) => ({
        date: day.fxDate,
        dayOfWeek: formatDayOfWeek(day.fxDate),
        high: parseInt(day.tempMax),
        low: parseInt(day.tempMin),
        condition: getWeatherCondition(day.textDay),
        conditionCode: day.iconDay,
        rainfall: parseFloat(day.precip || '0'),
        windSpeed: parseInt(day.windSpeedDay)
      }))
    }
  } catch (error) {
    console.error('获取天气数据失败:', error)
    return getMockWeatherData(city)
  }
}

/**
 * 获取模拟天气数据（当API不可用时使用）
 */
function getMockWeatherData(city: string): WeatherData {
  const mockConditions = ['sunny', 'cloudy', 'light-rain', 'overcast']
  const randomCondition = mockConditions[Math.floor(Math.random() * mockConditions.length)]
  
  return {
    temperature: Math.floor(Math.random() * 30) + 5, // 5-35度
    condition: WEATHER_CONDITIONS[randomCondition as keyof typeof WEATHER_CONDITIONS].zh,
    conditionCode: randomCondition,
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20km/h
    windDirection: '东南风',
    visibility: Math.floor(Math.random() * 20) + 10, // 10-30km
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050hPa
    uvIndex: Math.floor(Math.random() * 11), // 0-10
    feelLike: Math.floor(Math.random() * 30) + 5,
    city: city,
    updateTime: new Date().toISOString(),
    forecast: generateMockForecast()
  }
}

/**
 * 生成模拟的7天预报数据
 */
function generateMockForecast(): WeatherForecast[] {
  const forecast: WeatherForecast[] = []
  const conditions = ['sunny', 'cloudy', 'light-rain', 'overcast']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      dayOfWeek: formatDayOfWeek(date.toISOString().split('T')[0]),
      high: Math.floor(Math.random() * 15) + 20, // 20-35度
      low: Math.floor(Math.random() * 15) + 5,   // 5-20度
      condition: WEATHER_CONDITIONS[condition as keyof typeof WEATHER_CONDITIONS].zh,
      conditionCode: condition,
      rainfall: Math.random() * 10, // 0-10mm
      windSpeed: Math.floor(Math.random() * 15) + 5
    })
  }
  
  return forecast
}

/**
 * 将英文天气状况转换为中文
 */
function getWeatherCondition(englishCondition: string): string {
  const condition = englishCondition.toLowerCase()
  
  for (const [key, value] of Object.entries(WEATHER_CONDITIONS)) {
    if (condition.includes(key.replace('-', ' '))) {
      return value.zh
    }
  }
  
  return englishCondition // 如果找不到匹配，返回原文
}

/**
 * 获取风向中文描述
 */
function getWindDirection(direction: string): string {
  return WIND_DIRECTIONS[direction as keyof typeof WIND_DIRECTIONS] || direction
}

/**
 * 格式化日期为星期几
 */
function formatDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr)
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[date.getDay()]
}

/**
 * 获取天气图标和颜色
 */
export function getWeatherDisplay(conditionCode: string) {
  const condition = WEATHER_CONDITIONS[conditionCode as keyof typeof WEATHER_CONDITIONS]
  return condition || { zh: '未知', icon: '❓', color: 'text-gray-500' }
}

/**
 * 获取UV指数信息
 */
export function getUVIndexInfo(uvIndex: number) {
  const level = Math.min(Math.max(0, Math.floor(uvIndex)), 10)
  return UV_INDEX_LEVELS[level as keyof typeof UV_INDEX_LEVELS] || UV_INDEX_LEVELS[0]
}

/**
 * 获取空气质量建议
 */
export function getAirQualityAdvice(visibility: number): string {
  if (visibility >= 20) return '空气质量优，适宜外出游览'
  if (visibility >= 10) return '空气质量良好，可正常活动'
  if (visibility >= 5) return '空气质量一般，敏感人群减少外出'
  return '空气质量较差，建议减少户外活动'
}

/**
 * 获取旅游建议
 */
export function getTravelAdvice(weather: WeatherData): string {
  const { condition, temperature, windSpeed, uvIndex } = weather
  
  if (condition.includes('雨')) {
    return '有降雨，建议携带雨具，室内景点更适宜'
  }
  
  if (temperature > 35) {
    return '气温较高，注意防暑降温，建议选择阴凉景点'
  }
  
  if (temperature < 0) {
    return '气温较低，注意保暖，建议选择室内景点'
  }
  
  if (uvIndex > 7) {
    return '紫外线强烈，注意防晒，建议避开中午时段'
  }
  
  if (windSpeed > 20) {
    return '风力较大，户外活动注意安全'
  }
  
  return '天气条件良好，适合外出旅游'
}

// 使用缓存包装的天气数据获取函数
export const getWeatherData = cacheUtils.withCache(
  _getWeatherData,
  (city: string, coordinates?: { lat: number; lng: number }) => {
    // 生成缓存键
    const locationKey = coordinates 
      ? `${coordinates.lat},${coordinates.lng}` 
      : city;
    return cacheUtils.generateKey('weather', locationKey);
  },
  10 * 60 * 1000 // 10分钟缓存
);

/**
 * 预加载常用城市的天气数据
 */
export async function preloadWeatherData(cities: string[]) {
  const promises = cities.map(async (city) => {
    try {
      await getWeatherData(city);
    } catch (error) {
      console.warn(`Failed to preload weather for ${city}:`, error);
    }
  });
  
  await Promise.allSettled(promises);
}

/**
 * 获取缓存统计信息
 */
export function getWeatherCacheStats() {
  return (defaultCache as any).getStats();
}

/**
 * 清理过期的天气缓存
 */
export function cleanWeatherCache() {
  (defaultCache as any).cleanup();
}