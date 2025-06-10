'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeatherWidget from '@/components/WeatherWidget';
import CacheManager from '@/components/CacheManager';

interface UserProfile {
  name: string;
  email: string;
  favoriteAttractions: string[];
  visitHistory: string[];
  preferences: {
    language: string;
    notifications: boolean;
    location: string;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    language: 'zh',
    notifications: true,
    location: 'Beijing'
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session?.user) {
      // 模拟获取用户配置文件数据
      const mockProfile: UserProfile = {
        name: session.user.name || '',
        email: session.user.email || '',
        favoriteAttractions: ['故宫', '天安门广场', '长城'],
        visitHistory: ['北京', '上海', '西安'],
        preferences: {
          language: 'zh',
          notifications: true,
          location: 'Beijing'
        }
      };
      setProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        language: mockProfile.preferences.language,
        notifications: mockProfile.preferences.notifications,
        location: mockProfile.preferences.location
      });
      setLoading(false);
    }
  }, [session, status, router]);

  const handleSave = async () => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      name: formData.name,
      preferences: {
        ...profile.preferences,
        language: formData.language,
        notifications: formData.notifications,
        location: formData.location
      }
    };
    
    setProfile(updatedProfile);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">无法加载用户信息</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editing ? '取消' : '编辑'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">基本信息</h2>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      语言偏好
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      所在城市
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={formData.notifications}
                      onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700">
                      接收通知
                    </label>
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    保存更改
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p><span className="font-medium">姓名:</span> {profile.name}</p>
                  <p><span className="font-medium">邮箱:</span> {profile.email}</p>
                  <p><span className="font-medium">语言:</span> {profile.preferences.language === 'zh' ? '中文' : 'English'}</p>
                  <p><span className="font-medium">所在城市:</span> {profile.preferences.location}</p>
                  <p><span className="font-medium">通知:</span> {profile.preferences.notifications ? '开启' : '关闭'}</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">当地天气</h2>
              <WeatherWidget city={profile.preferences.location} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">收藏的景点</h2>
            <div className="space-y-2">
              {profile.favoriteAttractions.map((attraction, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span>{attraction}</span>
                  <button className="text-red-600 hover:text-red-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">访问历史</h2>
            <div className="space-y-2">
              {profile.visitHistory.map((location, index) => (
                <div key={index} className="py-2 px-3 bg-gray-50 rounded">
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CacheManager />
      </div>
    </div>
  );
}