import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';
import Icons from './iconsmain';
import clientIcon from '../styles/account.svg';
import productIcon from '../styles/list.svg';
import profileIcon from '../styles/hand.svg';

function Home() {
  return (
    <div className="home-container">
      <div className="center-container">
        <Link to="/client">
          <Icons src={clientIcon} text="Clientes" />
        </Link>
        <Link to="/product">
          <Icons src={productIcon} text="Productos" />
        </Link>
        <Link to="/profile">
          <Icons src={profileIcon} text="Perfiles" />
        </Link>
      </div>
    </div>
  );
}

export default Home;

