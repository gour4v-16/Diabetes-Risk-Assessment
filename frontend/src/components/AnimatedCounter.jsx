import React, { useState, useEffect } from 'react';

export default function AnimatedCounter({ value, duration = 1500, suffix = '', prefix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const numericValue = parseFloat(value.toString().replace(/,/g, ''));
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * numericValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const displayValue = typeof count === 'number' 
    ? count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) 
    : count;

  return <span>{prefix}{displayValue}{suffix}</span>;
}
