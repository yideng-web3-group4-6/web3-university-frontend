import React from 'react';
import CourseCard from './CourseCard';
import { CartItem } from '@utils/index';
import { Course, iconMap } from '@/utils/courseType';

interface CourseGridProps {
  courses: Course[];
  displayCount?: number;
  onAddToCart: (course: CartItem) => void;
  randomize?: boolean;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  displayCount = courses.length,
  onAddToCart,
  randomize = false,
}) => {
  const getDisplayCourses = () => {
    console.log('getDisplayCourses: ', courses);
    let displayCourses = [...courses];

    if (randomize) {
      for (let i = displayCourses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [displayCourses[i], displayCourses[j]] = [displayCourses[j], displayCourses[i]];
      }
    }

    return displayCourses.slice(0, Math.min(displayCount, displayCourses.length));
  };

  const displayCourses = getDisplayCourses();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {displayCourses.map(course => {
        const IconComponent = iconMap[course.icon as keyof typeof iconMap];
        return (
          <CourseCard
            key={course.id}
            id={course.id}
            icon={IconComponent ? <IconComponent /> : ''}
            title={course.title}
            description={course.description}
            level={course.level}
            duration={course.duration}
            price={course.price}
            tags={course.tags}
            children={course.children}
            onAddToCart={({ title, price }) =>
              onAddToCart({ id: course.id, title, price, image: course.coverImage })
            }
          />
        );
      })}
    </div>
  );
};

export default CourseGrid;
