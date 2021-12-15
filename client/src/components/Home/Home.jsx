import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import {useDispatch, useSelector} from 'react-redux';
import Cards from '../Cards/Cards';
import style from './Home.module.css'
import { filterOrigin } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import {getEpisodes, getCharacters} from '../../redux/actions/index'



function Home() {


    
  

    const characters = useSelector(state => state.filteredCharacters);
    const dispatch = useDispatch();




  //un estado que nos tome la pagina actual
  //un estado que nos tome la cantidad de cards por pagina
  //estado con arreglo de paginas

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  

  //necesito 3 variables para saber cuantos items tengo y saber cuantas paginas voy a necesitar
  let lastItemPerPage = currentPage * itemsPerPage; // --> 4 * 5 --> 20
  
  let firsItemPerPage = lastItemPerPage - itemsPerPage; // 20 - 5  --> 15

  let currentPageItems = characters?.slice(firsItemPerPage, lastItemPerPage);

  let pages = []; 
  //                                    21       /   5 
  const numOfPages = Math.ceil(characters.length / itemsPerPage) // --> resultado total de paginas === 5

  for(let i = 1 ; i<= numOfPages ; i++){
      pages.push(i)
  }

  function pagination(e, page){
      e.preventDefault();
      setCurrentPage(page)
  }

  const handleFilterOrigin = (e) => {
    dispatch(filterOrigin(e.target.value));
  };

  useEffect(() => {
    dispatch(filterOrigin('all'));
  },[dispatch])

  const renderPages = pages.map(page => (
      <li key={page} >
          <div>
              <button onClick={e => pagination(e, page)} className={style.buttonPages}>
                  {page}
              </button>
          </div>
      </li>
  ))


    return (
        <div >
            <NavBar/>
        <div className={style.homeContainer}>



        <select onChange={(e) => handleFilterOrigin(e)}>
            <option selected value='all' disabled>
            Filter By Origin
            </option>
            <option value='all'>All</option>
            <option value='created'>Created</option>
            <option value='api'>Api</option>
        </select>
            <SearchBar/>


            <Cards characters={currentPageItems} />
            
            <section style={{display:'flex', alignContent:'center', alignItems: 'center', margin: '2% auto', top: '0'}}>
            {renderPages}  
            </section>

        </div>
        </div>
    )
}

export default Home
