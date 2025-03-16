import { supabase } from './auth';

export const saveGeneratedLinks = async (userId, videoData, links) => {
  try {
    console.log('Attempting to save links with data:', {
      userId,
      videoData,
      links
    });

    // Validate input data
    if (!userId) throw new Error('User ID is required');
    if (!videoData) throw new Error('Video data is required');
    if (!links || !Array.isArray(links)) throw new Error('Links must be an array');

    const { data, error } = await supabase
      .from('generated_links')
      .insert([
        {
          user_id: userId,
          video_id: videoData.id,
          video_title: videoData.title,
          video_url: videoData.url,
          timestamps: links,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Successfully saved links:', data);
    return data;
  } catch (error) {
    console.error('Detailed error saving links:', {
      error,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    throw error;
  }
};

export const getUserLinks = async (userId) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const { data, error } = await supabase
      .from('generated_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user links:', error.message);
    throw error;
  }
};

export const deleteUserLink = async (linkId, userId) => {
  try {
    if (!linkId) throw new Error('Link ID is required');
    if (!userId) throw new Error('User ID is required');

    const { error } = await supabase
      .from('generated_links')
      .delete()
      .match({ id: linkId, user_id: userId });

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting link:', error.message);
    throw error;
  }
};

export async function updateUserLinks(linkId, userId, timestamps) {
  try {
    const response = await fetch(`/api/links/${linkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        timestamps
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update timestamps');
    }

    return await response.json();
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

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

    setSavedLinks(prevLinks => prevLinks.map(link => 
      link.id === selectedLink.id 
        ? { ...link, timestamps: newTimestamps }
        : link
    ));

    setIsModalOpen(false);
  } catch (error) {
    console.error('Dashboard error:', error);
    setUpdateError(error.message);
  }
};