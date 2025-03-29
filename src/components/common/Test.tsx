import { useImmer } from '@/hooks/useImer';
// import { todoCountAtom } from "@/states";
// import { useAtom } from "jotai";
import { useEffect } from 'react';

// 组件定义
const UserProfileEditor: React.FC = () => {
  // const [count, setCount] = useAtom(todoCountAtom);
  useEffect(() => {
    // 使用jotai，当没有useEffect时，这里会渲染两次
    console.log('🍎我被渲染了！！！');
  }, []);
  // 使用对象作为state
  const [userData, setUserData] = useImmer({
    name: '张三',
    age: 30,
    skills: ['React', 'TypeScript'],
  });

  // 错误的更新方式 - 直接修改同一对象
  const handleIncorrectUpdate = () => {
    console.log('错误更新');
    setUserData({
      name: '张三',
      age: 30,
      skills: ['React', 'TypeScript'],
    });
  };

  // 正确的更新方式 - 创建新对象
  const handleCorrectUpdate = () => {
    console.log('正确更新');
    setUserData(userInfo => {
      userInfo.name = '李四';
      userInfo.age = 25;
      // why-did-you-render 更新数组就不行了
      // userInfo.skills = ["Vue", "JavaScript"];
    });
  };

  return (
    <div>
      <h2>用户信息</h2>
      <p data-testid='user-info'>
        姓名：{userData.name}
        <br />
        年龄：{userData.age}
        <br />
        技能：{userData.skills.join(', ')}
      </p>
      <div className='space-y-4'>
        <button
          className={'w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600'}
          data-testid='incorrect-update-btn'
          onClick={handleIncorrectUpdate}
        >
          错误更新方式
        </button>
        <button
          className={'w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600'}
          data-testid='correct-update-btn'
          onClick={handleCorrectUpdate}
        >
          正确更新方式
        </button>
      </div>
    </div>
  );
};
UserProfileEditor.whyDidYouRender = true;
export default UserProfileEditor;
