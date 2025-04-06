import React from 'react';
import CourseGrid from '@components/course/CourseGrid';
import { CartItem } from '@utils/index';
import { translationValue } from '@locales/i18n';
import { Course } from '@/utils/courseType';

interface RelatedCoursesProps {
  allCourse: Course[];
  handleAddToCart: (course: CartItem) => void;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ allCourse, handleAddToCart }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold text-cyber-blue mb-8'>
        {translationValue('relatedCourses')}
      </h2>
      <CourseGrid
        courses={allCourse}
        displayCount={3}
        randomize={true}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default RelatedCourses;
