'use client';
import React, { useState, useEffect } from 'react';
import { fetchFromTwitch } from '../utils/twitchAuth';
import { useAuth, signInWithTwitch } from '../utils/auth';
import { saveGeneratedLinks } from '../utils/database';

function InputForm({ onSubmit }) {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [inputList, setInputList] = useState([{ timestamp: '', text: '' }]);
  const [textareaValue, setTextareaValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamerInput, setStreamerInput] = useState('');
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generatedLinks, setGeneratedLinks] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ loading: false, error: null, success: false });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const selectedVideoData = videos.find(
        (video) => video.id === selectedVideo
      );
      if (!selectedVideoData) {
        throw new Error('No video selected');
      }
      if (!inputList || inputList.length === 0 || !inputList[0].timestamp) {
        throw new Error('Please enter at least one timestamp and text');
      }

      console.log('Submitting with video data:', selectedVideoData);
      console.log('Input list:', inputList);

      if (!onSubmit || typeof onSubmit !== 'function') {
        throw new Error('Link generation function is not properly configured');
      }

      // Ensure we have the correct URL format
      const videoUrl = `https://www.twitch.tv/videos/${selectedVideoData.id}`;
      const links = await onSubmit(videoUrl, inputList);
      console.log('Generated links:', links);

      if (!links || !Array.isArray(links) || links.length === 0) {
        throw new Error('No links were generated. Please check your input format and try again.');
      }

      setGeneratedLinks({
        videoData: {
          id: selectedVideoData.id,
          title: selectedVideoData.title,
          url: videoUrl
        },
        links: links
      });
      setSaveStatus({ loading: false, error: null, success: false });
    } catch (error) {
      console.error('Error generating links:', error);
      setError(error.message || 'Failed to generate links. Please try again.');
      setGeneratedLinks(null); // Reset generated links on error
    }
  };

  const handleSave = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSaveStatus({ loading: true, error: null, success: false });
    try {
      console.log('Attempting to save with generated links:', generatedLinks);

      if (!generatedLinks?.videoData || !generatedLinks?.links) {
        console.error('Missing data:', { 
          hasVideoData: !!generatedLinks?.videoData, 
          hasLinks: !!generatedLinks?.links,
          generatedLinks
        });
        throw new Error('Please generate links before saving');
      }

      if (!Array.isArray(generatedLinks.links) || generatedLinks.links.length === 0) {
        throw new Error('No valid links to save. Please generate links first.');
      }

      await saveGeneratedLinks(
        user.id,
        generatedLinks.videoData,
        generatedLinks.links
      );
      setSaveStatus({ loading: false, error: null, success: true });
      
      // Reset form fields after saving
      setSelectedVideo('');
      setInputList([{ timestamp: '', text: '' }]);
      setTextareaValue('');
      setGeneratedLinks(null);

      // Show success message
      const successTimeout = setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, success: false }));
      }, 3000);

      return () => clearTimeout(successTimeout);
    } catch (error) {
      console.error('Error saving links:', error);
      setSaveStatus({ 
        loading: false, 
        error: error.message || 'Failed to save links. Please try again.', 
        success: false 
      });
    }
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
                placeholder="Enter timestamps and text, like this: 1:23 - description"
                value={textareaValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setTextareaValue(newValue);
                  const lines = newValue.split('\n').filter(line => line.trim());
                  const parsedInput = lines.map(line => {
                    const [timestamp, ...textParts] = line.split(' ');
                    return {
                      timestamp: timestamp.trim(),
                      text: textParts.join(' ').trim()
                    };
                  }).filter(item => item.timestamp && item.text);
                  setInputList(parsedInput.length > 0 ? parsedInput : [{ timestamp: '', text: '' }]);
                }}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedVideo}
              >
                Generate Links
              </button>
              {generatedLinks && (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveStatus.loading}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveStatus.loading ? (
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Save Links'
                  )}
                </button>
              )}
            </div>
            
            {/* Generated Links Display */}
            {generatedLinks && generatedLinks.links && (
              <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Generated Links</h3>
                <div className="space-y-2">
                  {generatedLinks.links.map((link, index) => (
                    <div key={index} className="relative p-3 bg-zinc-700 rounded group">
                      <pre className="text-white whitespace-pre-wrap font-mono text-sm overflow-x-auto">{link}</pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(link);
                          // You could add a toast notification here
                        }}
                        className="absolute right-2 top-2 px-2 py-1 bg-violet-600 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-violet-700"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Status Messages */}
            {saveStatus.error && (
              <p className="mt-2 text-red-400 text-sm">
                {saveStatus.error}
              </p>
            )}
            {saveStatus.success && (
              <p className="mt-2 text-emerald-400 text-sm">
                Links saved successfully!
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Sign in to Save Links</h2>
            <p className="text-zinc-400 mb-6">
              Please sign in with your Twitch account to save and manage your generated links.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signInWithTwitch();
                  setShowAuthModal(false);
                }}
                className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200"
              >
                Sign in with Twitch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputForm;