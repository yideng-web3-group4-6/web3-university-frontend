import React, { useState, useEffect } from 'react';
import CourseGrid from './CourseGrid';
import { Course } from '@/utils/courseType';
import { CartItem } from '@utils/index';
import { fetchCourse } from '@/apis/courseApi';
import { translationValue } from '@locales/i18n';

interface CourseListProps {
  onAddToCart: (course: CartItem) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onAddToCart }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourse();
        setCourses(fetchedCourses?.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <p className='text-cyber-blue'>{translationValue('loading')}</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-cyber-blue'>{translationValue('allCourses')}</h2>
        <div className='flex gap-4'>
          <select className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'>
            <option>{translationValue('allLevels')}</option>
            <option>{translationValue('beginner')}</option>
            <option>{translationValue('intermediate')}</option>
            <option>{translationValue('advanced')}</option>
          </select>
          <select className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'>
            <option>{translationValue('newest')}</option>
            <option>{translationValue('priceLowToHigh')}</option>
          </select>
        </div>
      </div>

      <CourseGrid courses={courses} onAddToCart={onAddToCart} />

      {/* <div className='mt-12 text-center'>
        <button className='bg-dark-card text-cyber-blue px-8 py-3 rounded-lg font-medium hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'>
          {translationValue('loadMore')}
        </button>
      </div> */}
    </div>
  );
};

export default CourseList;
