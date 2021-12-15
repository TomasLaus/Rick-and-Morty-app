const { Character, Episode } = require('../db');
const {Router} = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const router = Router();

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  let dataBaseCharacters;
  let APIcharacters;

  if (name) {
    try {
      dataBaseCharacters = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      let characterResult = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`,
      );

      APIcharacters =
        characterResult.data.results.length > 0
          ? characterResult.data.results?.map((character) => {
              return {
                id: character.id,
                name: character.name,
                image: character.image,
              };
            })
          : [];

      const characters = [...dataBaseCharacters, ...APIcharacters];

      res.json(characters);
    } catch (error) {
      try {
        res.json(dataBaseCharacters);
      } catch (error) {
        next(error);
      }
    }
  } else {
    try {
      const API_characters = await axios.get(
        'https://rickandmortyapi.com/api/character/',
      );
      const API_results = API_characters.data.results;
      const DB_characters = await Character.findAll();

      const API_formated_characters = API_results.map((character) => {
        return {
          id: character.id,
          name: character.name,
          image: character.image,
        };
      });
      res.json([...DB_characters, ...API_formated_characters]);
    } catch (err) {
      console.log('rompi');
    }
  }
})



router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    let character
    
    try {
      if (id.includes('-')) {
        character = await Character.findByPk(id, { include: Episode })
        console.log(character)
        character = {
          id: character.id,
          name: character.name,
          image: character.image,
          episodes: character.episodes.map((episode) => {
            return {
              id: episode.id,
              name: episode.name,
            }
          }),
        }
      } else {
        let characterResponse = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        )
        characterResponse = characterResponse.data
  
        let episodesList = characterResponse.episode.map((episode) =>
          episode.split('/').pop()
        )
  
        episodesList = episodesList.join(',')
  
        let episodes = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesList}`
        )
        episodes = episodes.data.map((episodes) => {
          return {
            id: episodes.id,
            name: episodes.name,
          }
        })
  
        character = {
          id: characterResponse.id,
          name: characterResponse.name,
          image: characterResponse.image,
          episodes: episodes,
        }
      }
  
      res.json(character)
    } catch (error) {
      next(error)
    }
  })



router.post('/', async (req, res, next) => {
  const { name, image, episodes } = req.body;
  
  Character.create({
    name,
    image,
  })
    .then((character) => {
      return character.setEpisodes(episodes);
    })
    .then((characterWithEpisodes) => {
      res.json(characterWithEpisodes);
    })
})


module.exports = router;