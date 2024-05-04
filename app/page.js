import Jumbotron from './components/Jumbotron';
import VideoGallery from './components/VideoGallery';

export default function Home() {
  return (
    <div className='rounded-lg bg-zinc-800 p-10 container-xl'>
      {/* Jumbotron */}
      <Jumbotron />
      {/* Jumbotron */}
      <VideoGallery />
    </div>
  );
}
