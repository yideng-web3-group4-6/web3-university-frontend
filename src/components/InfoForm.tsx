import React, { useState, FormEvent } from 'react';

interface InfoFormProps {
  onSubmit: (name: string, age: string) => void;
}

const InfoForm: React.FC<InfoFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && age) {
      onSubmit(name, age);
      setName('');
      setAge('');
    }
  };

  return (
    <div className='mb-8'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>设置信息</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
          <input
            type='text'
            placeholder='输入姓名'
            value={name}
            onChange={e => setName(e.target.value)}
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='number'
            placeholder='输入年龄'
            value={age}
            onChange={e => setAge(e.target.value)}
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          设置信息
        </button>
      </form>
    </div>
  );
};

export default InfoForm;
