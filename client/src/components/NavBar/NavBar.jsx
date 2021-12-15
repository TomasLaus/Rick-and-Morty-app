import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={style.navBar}>
      <ul>
        <li >
          <Link to='/'><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Forig00.deviantart.net%2F25dd%2Ff%2F2015%2F341%2F1%2F0%2Frick_and_morty_folder_icon_by_asmodeopt-d9jc0pn.png&f=1&nofb=1" width="66" height="66"alt="" /></Link>
        </li> 
      </ul>
      <ul>
        
        <li className={style.liCreate}>
          <Link to='/createCharacter' className={style.createCharacter}>Create character</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;