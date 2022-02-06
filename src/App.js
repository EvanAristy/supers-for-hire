import { useState, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
// components
import Nav from './components/Nav'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import HeroList from './pages/HeroList'
import VillainList from './pages/VillainList'
// contexts
import UserContext from './contexts/UserContext'

function App() {

  const [user, setUser] = useState('')
  const [supersList, setSupersList] = useState([])
  const [allHeros, setAllHeros] = useState([])
  const [allVillains, setAllVillains] = useState([])

  useEffect(() => {
    fetchSupers()
  }, [])

  const fetchSupers = async () => {
    try {
      const response = await axios.get("https://akabab.github.io/superhero-api/api/all.json")
      setSupersList(response.data)
      
      const good = response.data.filter(superHero => superHero.biography.alignment === 'good')
      const goodShuffle = good.sort(() => Math.random() - 0.5)
      setAllHeros(goodShuffle)

      const bad = response.data.filter(superVillain => superVillain.biography.alignment === 'bad')
      const badShuffle = bad.sort(() => Math.random() - 0.5)
      setAllVillains(badShuffle)
    
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(supersList)
  // console.log('good', allHeros)
  // console.log('bad', allVillains)

  return (
    <div className="App">
      <UserContext.Provider value={user}>
  
        <Nav />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='hero/list' element={
            <HeroList 
              allHeros={allHeros}
              itemsPerPage={12}
            />
          } />
          <Route path='villain/list' element={
            <VillainList 
              allVillains={allVillains}
              itemsPerPage={12}
            />
          } />
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
