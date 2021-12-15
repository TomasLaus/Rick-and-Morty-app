import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getCharacterDetail, clearPage } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import style from './Details.module.css';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const character = useSelector((state) => state.characterDetails);

  useEffect(() => {
    dispatch(getCharacterDetail(id));
    dispatch(clearPage())
  }, [dispatch, id]);

  console.log(id);
  return (
    <>
    <NavBar/>
    {
        character ? (
          <div>
      <Link to="/home" className={style.backDetail}>Back</Link>
      <h1>{character?.name}</h1>
      <img src={character?.image} alt={character?.name} className={style.detailImg}/>

      <h2>Episodes:</h2>
      <ul>
        {character?.episodes.map((episode) => (
          <li className={style.episodesDetail}>
            Episode {episode.id} : {episode.name}
          </li>
        ))}
      </ul>
    </div>
        ) :
        (<h1>Loading...</h1>)
    }
    
    

    </>
  );
};

export default Details;