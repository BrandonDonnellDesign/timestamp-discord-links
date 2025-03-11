'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import { getUserLinks, deleteUserLink, updateUserLinks } from '../utils/database';
import TimestampModal from '../components/TimestampModal';

export default function Dashboard() {
  const { user } = useAuth();
  const [savedLinks, setSavedLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (user) {
      fetchSavedLinks();
    }
  }, [user]);

  const fetchSavedLinks = async () => {
    try {
      const links = await getUserLinks(user.id);
      // Add formatted date to each link
      const linksWithDates = links.map(link => ({
        ...link,
        formattedDate: new Date(link.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }));
      setSavedLinks(linksWithDates);
    } catch (error) {
      console.error('Error fetching saved links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (linkId) => {
    try {
      await deleteUserLink(linkId, user.id);
      setSavedLinks(savedLinks.filter(link => link.id !== linkId));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const handleEdit = (link) => {
    setSelectedLink(link);
    setIsModalOpen(true);
    setUpdateError('');
  };

  const handleSaveChanges = async (newTimestamps) => {
    try {
      console.log('Attempting to save changes:', {
        linkId: selectedLink.id,
        userId: user.id,
        timestampCount: newTimestamps.length
      });

      const updatedLink = await updateUserLinks(selectedLink.id, user.id, newTimestamps);
      console.log('Update response:', updatedLink);

      // Update the local state with the new timestamps
      setSavedLinks(savedLinks.map(link => 
        link.id === selectedLink.id 
          ? { ...link, timestamps: newTimestamps }
          : link
      ));

      // Reset selectedLink to ensure the modal closes correctly
      setSelectedLink(null);
      setUpdateError('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating timestamps:', error);
      setUpdateError('Failed to update timestamps. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Please sign in to view your dashboard</h2>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-violet-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Your Saved Timestamps
        </h1>

        {updateError && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-400">
            {updateError}
          </div>
        )}

        {savedLinks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">No saved timestamps yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedLinks.map((link) => (
              <div
                key={link.id}
                className="bg-zinc-900 rounded-lg p-6 shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">{link.video_title}</h2>
                    <p className="text-zinc-400 text-sm mb-1">Date: {link.formattedDate}</p>
                    <a
                      href={link.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
                    >
                      View on Twitch
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(link)}
                      className="px-3 py-1 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-all duration-200"
                    >
                      View & Edit
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <pre className="text-zinc-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-32 overflow-y-auto">
                    {link.timestamps.slice(0, 3).map((timestamp, index) => (
                      <div key={index} className="mb-1">{timestamp}</div>
                    ))}
                    {link.timestamps.length > 3 && (
                      <div className="text-zinc-500 mt-2">
                        + {link.timestamps.length - 3} more timestamps...
                      </div>
                    )}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        <TimestampModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          timestamps={selectedLink?.timestamps}
          videoData={{
            title: selectedLink?.video_title,
            url: selectedLink?.video_url,
            date: selectedLink?.formattedDate
          }}
          onSave={handleSaveChanges}
        />
      </div>
    </div>
  );
} 