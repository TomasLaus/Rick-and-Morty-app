import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
  return (
    <div className={style.background}>
      <div className={style.backgroundFilter}></div>

      <div className={style.text}>
        <h1 className={style.h1}>Rick & Morty</h1>
        <Link to='/home'>
          <button className={style.button}>Take me home</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;