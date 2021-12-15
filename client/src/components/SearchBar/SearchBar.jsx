import React from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import { getCharacterByName } from "../../redux/actions/index";
import style from './SearchBar.module.css'


function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

  //agarra el nombre del input y lo setea en el estado
  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  
  
  //on submit-->Le mando lo que esta en el estado
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCharacterByName(name));
    setName("")
  }



    return (

        <div className={style.sb_nav}>
          <form id='Find' className={style.Find}  onSubmit={(e) => handleSubmit(e)}>
            <div className={style.sb_searchcontainer}>
              <input
                type="text"
                value={name}
                placeholder="Search your character"
                onChange={(e) => handleName(e)}
                className={style.inputSearch} 
              />
              <button id={style.sb_send} type="submit"  className={style.submitBtn} >
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpluspng.com%2Fimg-png%2Fsearch-button-png-search-icon-this-icon-is-supposed-to-represent-a-magnifying-glass-it-s-a-large-png-50-px-1600.png&f=1&nofb=1" alt="img not found" width="20" height="20" />
              </button>
            </div>
          </form>
        </div>


    )
}

export default SearchBar
