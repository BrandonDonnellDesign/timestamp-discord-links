'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth'; // Corrected import path
import { getUserLinks, deleteUserLink, updateUserLinks } from '../utils/database';
import TimestampModal from '../components/TimestampModal';

// Utility function to group timestamps into chunks of 2000 characters or less
const groupTimestamps = (timestamps, maxLength, date, vodLink) => {
  const groups = [];
  let currentGroup = `Date: ${date} Timestamps\n\n`;

  timestamps.forEach((timestamp) => {
    const newLinkText = `${timestamp}\n`;

    if (currentGroup.length + newLinkText.length > maxLength) {
      groups.push(currentGroup);
      currentGroup = newLinkText;
    } else {
      currentGroup += newLinkText;
    }
  });

  if (currentGroup) {
    currentGroup += `\n\nVOD: ${vodLink}`;
    groups.push(currentGroup);
  }

  return groups;
};

// Utility function to handle copying text to clipboard
const handleCopy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
};

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
      setUpdateError('');
      
      if (!selectedLink || !selectedLink.id) {
        throw new Error('No link selected');
      }

      console.log('Update request:', {
        linkId: selectedLink.id,
        userId: user.id,
        timestamps: newTimestamps
      });

      const updatedLink = await updateUserLinks(selectedLink.id, user.id, newTimestamps);
      console.log('Update response:', updatedLink);

      if (updatedLink) {
        setSavedLinks(prevLinks => prevLinks.map(link => 
          link.id === selectedLink.id 
            ? { ...link, timestamps: newTimestamps }
            : link
        ));
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Dashboard error:', error);
      setUpdateError(error.message);
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
              <div key={link.id} className="bg-zinc-900 rounded-lg p-6 shadow-xl">
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
                  {groupTimestamps(link.timestamps, 2000, link.formattedDate, link.video_url).map((group, index) => (
                    <div key={index} className="mb-4">
                      <pre className="text-zinc-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-32 overflow-y-auto">
                        {group}
                      </pre>
                      <button
                        onClick={() => handleCopy(group)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
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