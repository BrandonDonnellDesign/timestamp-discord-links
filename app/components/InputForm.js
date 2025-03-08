'use client';
import React, { useState, useEffect } from 'react';
import { fetchFromTwitch } from '../utils/twitchAuth';

function InputForm({ onSubmit }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [inputList, setInputList] = useState([{ timestamp: '', text: '' }]);
  const [loading, setLoading] = useState(false);
  const [streamerInput, setStreamerInput] = useState('');
  const [error, setError] = useState('');

  const fetchVideos = async (username) => {
    setLoading(true);
    setError('');
    try {
      // First, get the user ID from the username
      const userResponse = await fetchFromTwitch('users', {
        login: username
      });

      if (!userResponse.data || userResponse.data.length === 0) {
        setError('Streamer not found. Please check the username and try again.');
        setVideos([]);
        return;
      }

      const userId = userResponse.data[0].id;

      // Then fetch the videos for that user
      const videosResponse = await fetchFromTwitch('videos', {
        user_id: userId,
        first: 50,
      });

      if (!videosResponse.data || videosResponse.data.length === 0) {
        setError('No videos found for this streamer.');
        setVideos([]);
        return;
      }

      setVideos(videosResponse.data);
      setError('');
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to fetch videos. Please try again.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamerSubmit = (e) => {
    e.preventDefault();
    if (streamerInput.trim()) {
      fetchVideos(streamerInput.trim());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedVideoData = videos.find(
      (video) => video.id === selectedVideo
    );
    onSubmit(selectedVideoData.url, inputList);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Link Generator
      </h1>
      <div className="bg-zinc-900 shadow-xl rounded-xl p-8 space-y-6">
        {/* Streamer Input Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Enter Streamer Username
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={streamerInput}
              onChange={(e) => setStreamerInput(e.target.value)}
              placeholder="Enter Twitch username..."
              className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleStreamerSubmit}
              disabled={loading || !streamerInput.trim()}
              className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                'Load Videos'
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Select Video
              </label>
              <select
                value={selectedVideo}
                onChange={(event) => setSelectedVideo(event.target.value)}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200"
              >
                <option value=''>Choose a video...</option>
                {videos && videos.length > 0 && videos.map((video) => (
                  <option 
                    key={video.id} 
                    value={video.id}
                    className="py-2"
                  >
                    {`${video.title} - ${new Date(video.created_at).toLocaleDateString()}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Timestamps and Text
              </label>
              <textarea
                className="w-full h-96 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Paste your timestamps and text here..."
                onChange={(e) => setInputList(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedVideo}
            >
              Generate Links
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;