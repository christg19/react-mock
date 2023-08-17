import React from 'react';
import '../styles/iconMain.css';

function Icons(props) {
  return (
    <div className="icon-container">
      <img src={props.src} alt="" className='floating'/>
      <div className="icon-text">{props.text}</div>
    </div>
  );
}

export default Icons;
