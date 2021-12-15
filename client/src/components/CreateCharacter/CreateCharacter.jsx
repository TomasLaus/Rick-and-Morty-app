import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import style from './CreateCharacter.module.css'
import NavBar from '../NavBar/NavBar';
import {getCharacters} from '../../redux/actions/index';
import {useNavigate} from 'react-router-dom'

function CreateCharacter() {
    const dispatch = useDispatch()
    const episodes = useSelector((state) => state.episodes);
    const navigate = useNavigate();

    const [button, setButton] = useState(true);


    const [character, setCharacter] = useState({
      name: '',
      image: '',
      episodes: [], // [1, 5, 3 ]
    });
  
    useEffect(() => {
        character.name && character.image && character.episodes.length > 0
          ? setButton(false)
          : setButton(true);
      }, [character]);


    const handleChange = (e) => {
        setCharacter({
            ...character,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (e) => {
        //hacer un push de cada value al array de mi estado episodes
        let episodeId = e.target.value;
        episodeId = Number(episodeId);
    
        setCharacter({
          ...character,
          episodes: Array.from(new Set([...character.episodes, episodeId]))
        });
    };

    const filterEpisodes = (id) => {
        let filteredEpisodes = character.episodes.filter(
          (episode) => episode !== id,
        );
        
        setCharacter({
          ...character,
          episodes: filteredEpisodes,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/characters/', character);
        
        
        setCharacter({
          name: '',
          image: '',
          episodes: [],
        });
        dispatch(getCharacters())
        navigate('/home')
    };
    

    return (
        <div className={style.container}>
          <NavBar />
          <div className={style.mainContainer}>
            <h1>Create your character</h1>
    
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type='text'
                value={character.name}
                name='name'
                onChange={handleChange}
              />
              <label>Image:</label>
              <input
                type='text'
                value={character.image}
                name='image'
                onChange={handleChange}
              />
    
              <label>Episodes:</label>
              <select onChange={handleSelect} name='episodes'>
                <option defaultValue disabled selected>Select episode</option>
                {episodes?.map((episode) => (
                  <option key={episode.id} value={episode.id}>
                    {episode.name}
                  </option>
                ))}
              </select>
              <button disabled={button} type='submit'>
                Create Character
              </button>
            </form>
          </div>
    
          {(character.name || character.image || character.episodes.length > 0) && (
            <div className={style.displayContainer}>
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '50%' }}
              />
              <div className={style.infoContainer}>
                <h2>Name: {character.name}</h2>
                <p>
                  Appears on{' '}
                  {character.episodes.length <= 1 ? (
                    <span>episode</span>
                  ) : (
                    <span>episodes</span>
                  )}
                  :
                </p>
                <ul>
                  {character.episodes.map((el) => (
                    <div key={el} className={style.li}>
                      <li>📺 {el}</li>
                      <button
                        className={style.deleteButton}
                        onClick={() => filterEpisodes(el)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      );
}

export default CreateCharacter
