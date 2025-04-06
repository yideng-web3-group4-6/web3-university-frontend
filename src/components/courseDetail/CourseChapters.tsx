import React from 'react';
import { Play, Lock } from 'lucide-react';
import { Course } from '@/utils/courseType';
import { translationValue } from '@locales/i18n';

interface CourseChaptersProps {
  course: Course;
  isPurchased: boolean;
  handlePlayVideo: (videoUrl: string, locked: boolean) => void;
}

const CourseChapters: React.FC<CourseChaptersProps> = ({
  course,
  isPurchased,
  handlePlayVideo,
}) => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold text-cyber-blue mb-8'>
        {translationValue('courseChapters')}
      </h2>
      {course.children.length === 0 ? (
        <p className='text-center text-gray-400 py-8'>{translationValue('courseEmpty')}</p>
      ) : (
        <div className='space-y-4'>
          {course.children.map((chapter: any) => (
            <div
              key={chapter.id}
              className='feature-card p-6 rounded-xl hover:shadow-neon transition-all duration-300 flex justify-between items-center'
            >
              <div>
                <h3 className='text-lg font-semibold text-cyber-blue'>{chapter?.title}</h3>
                <p className='text-sm text-gray-400'>
                  {chapter?.locked && !isPurchased
                    ? translationValue('chapterLocked')
                    : translationValue('chapterUnlocked')}
                </p>
              </div>
              <button
                onClick={() => handlePlayVideo(chapter.url, chapter?.locked)}
                className='bg-transparent border-2 border-cyber-blue text-cyber-blue p-2 rounded-lg flex items-center hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
              >
                {chapter?.locked && !isPurchased ? (
                  <Lock className='h-4 w-4 mr-2' />
                ) : (
                  <Play className='h-4 w-4 mr-2' />
                )}
                {chapter?.locked && !isPurchased
                  ? translationValue('unlockView')
                  : translationValue('play')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseChapters;
