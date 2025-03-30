import React from 'react';
import CourseCard from './CourseCard';
import { courses } from '@utils/courseData';
import { CartItem } from '@utils/index';
import { BookOpen, Code, Layers, Shield, Cpu, Database, Zap, Workflow } from 'lucide-react';

interface CourseListProps {
  onAddToCart: (course: CartItem) => void;
}

const iconMap = {
  BookOpen: BookOpen,
  Code: Code,
  Layers: Layers,
  Shield: Shield,
  Cpu: Cpu,
  Database: Database,
  Zap: Zap,
  Workflow: Workflow,
};

const CourseList: React.FC<CourseListProps> = ({ onAddToCart }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-cyber-blue'>全部课程</h2>
        <div className='flex gap-4'>
          <select className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'>
            <option>全部难度</option>
            <option>初级</option>
            <option>中级</option>
            <option>高级</option>
          </select>
          <select className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'>
            <option>最新课程</option>
            <option>最受欢迎</option>
            <option>价格从低到高</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((course, index) => {
          const IconComponent = iconMap[course.icon as keyof typeof iconMap];
          return (
            <CourseCard
              key={index}
              icon={IconComponent ? <IconComponent /> : null}
              title={course.title}
              description={course.description}
              level={course.level}
              duration={course.duration}
              price={course.price}
              tags={course.tags}
              onAddToCart={onAddToCart}
            />
          );
        })}
      </div>

      <div className='mt-12 text-center'>
        <button className='bg-dark-card text-cyber-blue px-8 py-3 rounded-lg font-medium hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'>
          加载更多课程
        </button>
      </div>
    </div>
  );
};

export default CourseList;
