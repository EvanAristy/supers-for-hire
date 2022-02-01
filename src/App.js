import { useState, useContext, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
// components
import Nav from './components/Nav'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import HeroList from './pages/HeroList'
// contexts
// import UserContext from './contexts/UserContext'

function App() {

  const [user, setUser] = useState('')
  const [supersList, setSupersList] = useState([])
  const [heros, setHeros] = useState([])
  const [villains, setVillains] = useState([])

  useEffect(() => {
    fetchSupers()
  }, [])

  const fetchSupers = async () => {
    try {
      const response = await axios.get("https://akabab.github.io/superhero-api/api/all.json")
      setSupersList(response.data)
      
      const good = response.data.filter(superHero => superHero.biography.alignment === 'good')
      setHeros(good)

      const bad = response.data.filter(superVillain => superVillain.biography.alignment === 'bad')
      setVillains(bad)
    
    } catch (error) {
      console.log(error)
    }
  }

  console.log(supersList)

  return (
    <div className="App">
      {/* <UserContext.Provider value={user}> */}
    {console.log('heros', heros)}
    {console.log('villains', villains)}
  
        <Nav />

        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='herolist' element={<HeroList />} />
        </Routes> */}

      {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;
