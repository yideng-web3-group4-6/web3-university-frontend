import React from 'react';
import { Blocks, Users, Database, BookCheck, FileCode2 } from 'lucide-react';
import { translationValue } from '@locales/i18n';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className='feature-card p-6 rounded-xl'>
    <div className='flex items-center justify-center w-12 h-12 mb-4 bg-dark-card rounded-full float-animation'>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 text-cyber-blue' })}
    </div>
    <h3 className='text-xl font-semibold mb-2 text-cyber-blue'>{title}</h3>
    <p>{description}</p>
  </div>
);

const features = [
  {
    icon: <FileCode2 />,
    title: 'Smart Contracts',
    description: 'Ethereum smart contract development and best practices',
  },
  {
    icon: <Users />,
    title: 'User Management',
    description: 'Complete user system and personalized learning experience',
  },
  {
    icon: <BookCheck />,
    title: 'Course List',
    description: 'Systematic front-end and Web3 course design',
  },
  {
    icon: <Database />,
    title: 'Knowledge Base',
    description: 'Comprehensive Web3 development resources and documentation',
  },
  {
    icon: <Blocks />,
    title: 'Mining',
    description: 'Earn rewards through learning and contribution',
  },
];

const Home = () => {
  return (
    <>
      <div className='hero-gradient pt-24'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple'>
              {translationValue('web3University')}
            </h1>
            <p className='mt-6 max-w-2xl mx-auto text-xl'>
              {translationValue('web3UniversityDesc')}
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
