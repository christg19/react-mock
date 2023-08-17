import React from 'react';
import '../styles/animatedBackground.css'

function AnimatedBackground({ children }) {
  return <div className="animated-background">{children}</div>;
}

export default AnimatedBackground;
