import React from 'react';

const RightBar: React.FC = () => {
  return (
    <div className='fixed top-0 right-0 flex flex-col items-center justify-center h-screen'>
      <button className='w-12 h-12 rounded-full bg-pink-500 text-white mb-4'>Click</button>
    </div>
  );
};

export default RightBar;
