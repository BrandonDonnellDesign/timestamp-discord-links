// components/InputForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InputForm = ({ onSubmit }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [inputList, setInputList] = useState([{ timestamp: '', text: '' }]);

  useEffect(() => {
    fetchVideos();
  }, []);
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://api.twitch.tv/helix/videos', {
        headers: {
          'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          'Authorization': process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN,
        },
        params: {
          user_id: '44574567',
          first: 50, // Number of videos to fetch
        },
      });
      setVideos(response.data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
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
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  text-black'
        onSubmit={handleSubmit}>
        <div className='mb-4 overflow-hidden'>
          <label>
            Select Video:
            <select
              value={selectedVideo}
              onChange={(event) => setSelectedVideo(event.target.value)}>
              <option value=''>Select a Video</option>
              {videos.map((video) => (
                <option key={video.id} value={video.id}>{`${
                  video.title
                } - ${new Date(
                  video.created_at
                ).toLocaleDateString()}`}</option>
              ))}
            </select>
          </label>
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Paste the list of timestamps and text:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-96'
            id='list'
            type='text'
            onChange={(e) => setInputList(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button'>
            Generate Links
          </button>
          
        </div>
      </form>
  );
};

export default InputForm;
