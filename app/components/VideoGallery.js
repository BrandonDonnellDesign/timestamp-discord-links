'use client';
import React, { useState, useEffect } from 'react';
import { fetchFromTwitch } from '../utils/twitchAuth';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetchFromTwitch('videos', {
          user_id: '44574567',
          first: 4,
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Recent Videos
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos && videos.length > 0 && videos.map((video) => (
          <div 
            key={video.id} 
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              <iframe
                src={`https://player.twitch.tv/?video=${video.id}&parent=localhost&parent=theones.netlify.app&autoplay=false`}
                height={219}
                width="100%"
                className="w-full"
              />
            </div>
            <div className="p-5 space-y-3">
              <h5 className="text-lg font-semibold line-clamp-2 text-white">
                {video.title}
              </h5>
              <div className="flex justify-between items-center text-sm text-zinc-400">
                <p>{new Date(video.created_at).toLocaleDateString()}</p>
                <div className="flex items-center gap-1">
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>{video.view_count.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <div className="text-center py-10 text-zinc-500">
          No videos found
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
