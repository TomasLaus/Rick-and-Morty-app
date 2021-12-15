import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

const Card = ({ name, image, id }) => {
  return (
    <div className={style.cardContainer}>

    <Link className={style.link} to={`/characters/${id}`}>
        <h2>{name}</h2>
        <img src={image} alt={name} className={style.imgCard} />
    </Link>
    </div>
  );
};

export default Card;