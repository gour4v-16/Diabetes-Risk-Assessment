import React, { useState, useEffect } from 'react';

export default function AnimatedProgressBar({ percentage, colorClass = 'bg-primary dark:bg-accent', height = 'h-2' }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`w-full bg-track-bg rounded-full overflow-hidden ${height}`}>
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
