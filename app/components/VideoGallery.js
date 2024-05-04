'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.twitch.tv/helix/videos', {
          params: {
            user_id: '44574567',
            first: 4,
          },
          headers: {
            'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            Authorization: process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN,
          },
        });
        setVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1 className='text-3xl pb-10'>Most Recent Videos</h1>
      <div className='grid grid-cols-4 gap-4'>
        {videos.map((video) => (
          <div key={video.id} className='max-w-sm bg-white shadow-lg'>
            <iframe
              src={`https://player.twitch.tv/?video=${video.id}&parent=localhost&parent=theones.netlify.app&autoplay=false`}
              height={219}
              width={355}
            />
            <div className='p-6'>
              <h5 className='mb-2 text-xl font-medium text-black'>
                {video.title}
              </h5>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <p className=' text-base text-black'>
                    {new Date(video.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className=' text-base text-black'>
                    {video.view_count} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
