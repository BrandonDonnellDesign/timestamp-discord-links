// utils/linkGeneration.js

// Function to format timestamp to "hh'h'mm'm'ss's'" format
function formatTimestamp(timestamp) {
    const timeComponents = timestamp.split(':');
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2]);
    return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
  }
  
  // Function to create a Twitch link
  function createTwitchLink(baseUrl, timestamp, text) {
    const timestampFormatted = formatTimestamp(timestamp);
    const videoId = baseUrl.split('/').pop(); // Extract the video ID from the base URL

    // Remove hyphen if it exists
    text = text.trim().startsWith('-') ? text.trim().substring(1).trim() : text.trim();
    
    const twitchUrl = `https://www.twitch.tv/videos/${videoId}?t=${timestampFormatted}`;
    return { timestamp, text, url: twitchUrl };
  }
  
  // Function to generate masked links from the list of timestamped texts
  export async function generateMaskedLinks(baseUrl, inputList) {
    const lines = inputList.trim().split('\n');
    const timestampedTextList = [];
  
    // Iterate over lines skipping the first line (date)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const [timestamp, ...textArray] = line.split(' ');
      const text = textArray.join(' '); // Reconstruct text if it contains spaces
      timestampedTextList.push({ timestamp, text });
    }
  
    const links = timestampedTextList.map(({ timestamp, text }) => createTwitchLink(baseUrl, timestamp, text));
    return links;
  }