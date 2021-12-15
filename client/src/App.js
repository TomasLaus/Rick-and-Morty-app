import './App.css'
import { Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {getEpisodes, getCharacters} from './redux/actions/index'
import Details from './components/Details/Details';
import CreateCharacter from './components/CreateCharacter/CreateCharacter';
import Landing from './components/Landing/Landing';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getEpisodes());
  }, [dispatch])

  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/characters/:id' element={<Details/>}/>
        <Route exact path='/createcharacter' element={<CreateCharacter/>}/>
      </Routes>
    </div>
  )
}

export default App
