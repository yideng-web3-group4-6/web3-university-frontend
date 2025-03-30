import React from 'react';
import { Blocks, Users, Database, BookCheck, FileCode2 } from 'lucide-react';

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
  // {
  //   icon: <FileCode2 />,
  //   title: '智能合约',
  //   description: '以太坊智能合约开发和最佳实践',
  // },
  // {
  //   icon: <Users />,
  //   title: '用户管理',
  //   description: '完整的用户系统和个性化学习体验',
  // },
  {
    icon: <BookCheck />,
    title: '课程列表',
    description: '系统化的前端和Web3课程设计',
  },
  {
    icon: <Database />,
    title: '知识库',
    description: 'comprehensive Web3开发资源和文档',
  },
  {
    icon: <Blocks />,
    title: '挖矿',
    description: '通过学习和贡献获得奖励',
  },
];

const Home = () => {
  return (
    <>
      <div className='hero-gradient pt-24'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple'>
              前端 Web3 大学
            </h1>
            <p className='mt-6 max-w-2xl mx-auto text-xl'>
              探索前端开发与Web3技术的完美结合，开启您的区块链开发之旅
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
