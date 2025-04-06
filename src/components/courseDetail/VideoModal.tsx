import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isModalOpen: boolean;
  currentVideo: string | null;
  closeModal: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isModalOpen, currentVideo, closeModal }) => {
  if (!isModalOpen || !currentVideo) return null;

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div className='relative bg-dark-card rounded-lg p-6 w-full max-w-4xl'>
        <button
          onClick={closeModal}
          className='absolute top-2 right-2 text-cyber-blue hover:text-cyber-purple'
        >
          <X className='h-6 w-6' />
        </button>
        <video controls autoPlay src={currentVideo} className='w-full rounded-lg' />
      </div>
    </div>
  );
};

export default VideoModal;
