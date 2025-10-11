import React from 'react';

export const CodeSkeletonLoader: React.FC = () => {
  return (
    <div className="font-mono text-sm p-4 leading-6">
      <div className="w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex items-center h-6">
            <div className="pr-4 text-right text-gray-700 select-none w-12">{index + 1}</div>
            <div 
                className="h-4 bg-gray-800 rounded-sm skeleton-pulse" 
                style={{ 
                    width: `${Math.random() * 40 + 50}%`,
                    animationDelay: `${index * 50}ms`
                }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
