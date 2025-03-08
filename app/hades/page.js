'use client'
import React, { useEffect, useState } from 'react';
import { fetchFromTwitch } from '../utils/twitchAuth';

function TwitchVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('latest');
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos(userId) {
      try {
        const response = await fetchFromTwitch('videos', {
          user_id: userId,
          first: 20, // Increased to get more videos for better filtering
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
      }
    }

    async function displayVideos() {
      try {
        const streamers = [
          { name: 'Streamer1', userId: '44574567' },
          { name: 'Streamer2', userId: '52959392' },
          // Add more streamers as needed
        ];

        const allVideos = [];

        for (const streamer of streamers) {
          const videos = await fetchVideos(streamer.userId);
          if (videos && videos.length > 0) {
            // Tag videos that might be highlights based on title or duration
            const taggedVideos = videos.map(video => ({
              ...video,
              isHighlight: video.title.toLowerCase().includes('highlight') || 
                          video.duration.toLowerCase().includes('m') // Assumes highlights are typically shorter
            }));
            allVideos.push(...taggedVideos);
          }
        }

        setVideos(allVideos);
      } catch (error) {
        console.error('Error displaying videos:', error);
      } finally {
        setLoading(false);
      }
    }

    displayVideos();
  }, []);

  // Filter and sort videos whenever the filter changes or videos update
  useEffect(() => {
    if (!videos.length) {
      setFilteredVideos([]);
      return;
    }

    let sorted = [...videos];

    switch (activeFilter) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'mostViewed':
        sorted.sort((a, b) => b.view_count - a.view_count);
        break;
      case 'highlights':
        sorted = sorted.filter(video => video.isHighlight);
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    setFilteredVideos(sorted);
  }, [videos, activeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            Hades VODs
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Explore the latest Hades gameplay videos and epic moments from our featured streamers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Filter Section */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button 
            onClick={() => setActiveFilter('latest')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'latest'
                ? 'bg-violet-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Latest Videos
          </button>
          <button 
            onClick={() => setActiveFilter('mostViewed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'mostViewed'
                ? 'bg-violet-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Most Viewed
          </button>
          <button 
            onClick={() => setActiveFilter('highlights')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'highlights'
                ? 'bg-violet-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Highlights
          </button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVideos && filteredVideos.length > 0 && filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="group bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://player.twitch.tv/?video=${video.id}&parent=localhost&parent=theones.netlify.app&autoplay=false`}
                  height="100%"
                  width="100%"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-6 space-y-4">
                <h5 className="text-lg font-semibold line-clamp-2 text-white group-hover:text-violet-400 transition-colors">
                  {video.title}
                </h5>
                <div className="flex justify-between items-center text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{new Date(video.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
          <div className="text-center py-20 bg-zinc-900/50 backdrop-blur-sm rounded-xl">
            <svg
              className="mx-auto h-12 w-12 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <p className="mt-4 text-zinc-500 text-lg">No videos available at the moment</p>
            <p className="mt-2 text-zinc-600">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwitchVideos;

