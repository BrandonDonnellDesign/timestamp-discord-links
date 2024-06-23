// Function to format timestamp to "hh'h'mm'm'ss's'" format
function formatTimestamp(timestamp) {
  const timeComponents = timestamp.split(':');
  const hours = parseInt(timeComponents[0]);
  const minutes = parseInt(timeComponents[1]);
  const seconds = parseInt(timeComponents[2]);
  return `${hours.toString().padStart(2, '0')}h${minutes
    .toString()
    .padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
}

// Function to create a Twitch link
function createTwitchLink(baseUrl, timestamp, text) {
  const timestampFormatted = formatTimestamp(timestamp);
  const videoId = baseUrl.split('/').pop(); // Extract the video ID from the base URL

  // Remove hyphen if it exists
  text = text.trim().startsWith('-')
    ? text.trim().substring(1).trim()
    : text.trim();

  const twitchUrl = `https://www.twitch.tv/videos/${videoId}?t=${timestampFormatted}`;
  return { timestamp, text, url: twitchUrl };
}

// Function to generate masked links from the list of timestamped texts
export async function generateMaskedLinks(baseUrl, inputList) {
  // Check if inputList is a string
  if (typeof inputList !== 'string') {
    return [];
  }
  // Trim whitespace and check if the string is empty
  if (!inputList.trim()) {
    return [];
  }
  const lines = inputList.trim().split('\n');
  const timestampedTextList = [];

  for (const line of lines) {
    const [timestamp, ...textArray] = line.trim().split(' ');
    const text = textArray.join(' ');
    timestampedTextList.push({ timestamp, text });
  }

  const links = timestampedTextList.map(({ timestamp, text }) =>
    createTwitchLink(baseUrl, timestamp, text)
  );
  return links;
}
