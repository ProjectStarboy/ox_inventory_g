import React from 'react';

function Line() {
  return (
    <div className="w-full flex items-center">
      <div style={{ height: '4px', width: '4px' }} className="bg-white"></div>
      <div className="w-full bg-white bg-opacity-20" style={{ height: '2px' }}></div>
      <div style={{ height: '4px', width: '4px' }} className="bg-white"></div>
    </div>
  );
}

export default Line;
