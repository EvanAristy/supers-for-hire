import { useState, useContext, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

function App() {

  const [supersList, setSupersList] = useState([])

  useEffect(() => {
    fetchSupers()
  }, [])

  const fetchSupers = async () => {
    try {
      const response = await axios.get("https://akabab.github.io/superhero-api/api/all.json")
      setSupersList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(supersList)

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
