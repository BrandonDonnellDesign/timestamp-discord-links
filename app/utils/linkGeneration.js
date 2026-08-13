// Function to format timestamp to display format (HH:MM:SS)
function formatDisplayTimestamp(timestamp) {
  const parts = parseTimestamp(timestamp);
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to format timestamp for Twitch URL
function formatUrlTimestamp(timestamp) {
  const parts = parseTimestamp(timestamp);
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  }

  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
}

function parseTimestamp(timestamp) {
  if (!/^\d{1,3}:\d{1,2}:\d{2}$|^\d{1,3}:\d{2}$/.test(timestamp)) {
    throw new Error('Use MM:SS or HH:MM:SS');
  }
  const parts = timestamp.split(':').map(Number);
  if (parts.at(-2) > 59 || parts.at(-1) > 59) {
    throw new Error('Minutes and seconds must be between 00 and 59');
  }
  return parts;
}

function timestampToSeconds(timestamp) {
  const parts = parseTimestamp(timestamp);
  if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  if (parts.length === 2) return (parts[0] * 60) + parts[1];
  throw new Error('Use MM:SS or HH:MM:SS');
}

// Function to create a Twitch link
function createTimestampLink(baseUrl, timestamp, text, platform) {
  const displayTimestamp = formatDisplayTimestamp(timestamp);
  const timestampValue = platform === 'kick'
    ? timestampToSeconds(timestamp)
    : formatUrlTimestamp(timestamp);
  const separator = baseUrl.includes('?') ? '&' : '?';
  const timestampedUrl = `${baseUrl}${separator}t=${timestampValue}`;
  const cleanedText = text.replace(/^-\s*/, '').trim();

  return `${displayTimestamp} - [${cleanedText}](${timestampedUrl})`;
}

// Function to generate masked links from the list of timestamped texts
export async function generateMaskedLinks(baseUrl, inputList, platform = 'twitch') {
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
      createTimestampLink(baseUrl, timestamp, text, platform)
    );
    return links;
  } catch (error) {
    console.error('Error generating links:', error);
    return [];
  }
}
