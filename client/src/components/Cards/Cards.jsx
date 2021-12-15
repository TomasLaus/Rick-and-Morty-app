import React from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css'

const Cards = ({ characters }) => {
  
  return (
    <section className={style.cardWrapper}>
     {characters?.map(character => <Card name={character.name} image={character.image} id={character.id} key={character.id} />)}
    </section>
  );
};

export default Cards;