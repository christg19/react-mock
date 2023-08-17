import React, { useState, useEffect } from 'react';
import '../styles/typing.css'

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100); 
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className='typing-text'>{displayText}</span>;
}

export default TypingEffect;