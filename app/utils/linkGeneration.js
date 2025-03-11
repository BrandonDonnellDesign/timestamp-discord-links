// Function to format timestamp to display format (HH:MM:SS)
function formatDisplayTimestamp(timestamp) {
  const parts = timestamp.split(':');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
    seconds = parseInt(parts[2]);
  } else if (parts.length === 2) {
    minutes = parseInt(parts[0]);
    seconds = parseInt(parts[1]);
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to format timestamp for Twitch URL
function formatUrlTimestamp(timestamp) {
  const parts = timestamp.split(':');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
    seconds = parseInt(parts[2]);
  } else if (parts.length === 2) {
    minutes = parseInt(parts[0]);
    seconds = parseInt(parts[1]);
  }

  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
}

// Function to create a Twitch link
function createTwitchLink(baseUrl, timestamp, text) {
  const displayTimestamp = formatDisplayTimestamp(timestamp);
  const urlTimestamp = formatUrlTimestamp(timestamp);
  
    // Remove leading "- " or unnecessary spaces in text
    const cleanedText = text.replace(/^-\s*/, '').trim();

    return `${displayTimestamp} - [${cleanedText}](${baseUrl}?t=${urlTimestamp})`;
}

// Function to generate masked links from the list of timestamped texts
export async function generateMaskedLinks(baseUrl, inputList) {
  // Check if inputList is an array of objects with timestamp and text
  if (!Array.isArray(inputList)) {
    console.error('Input must be an array');
    return [];
  }

  // Validate the input format
  if (!inputList.every(item => item.timestamp && item.text)) {
    console.error('Each input item must have timestamp and text');
    return [];
  }

  try {
    const links = inputList.map(({ timestamp, text }) =>
      createTwitchLink(baseUrl, timestamp, text)
    );
    return links;
  } catch (error) {
    console.error('Error generating links:', error);
    return [];
  }
}
