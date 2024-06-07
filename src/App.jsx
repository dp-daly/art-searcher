import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

const App = () => {

  //SETTING STATE
  const [airplaneArt, setAirplaneArt] = useState([{
    artist: "",
    title: "", 
    image: "",
    id: ""
  }])
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    fetchAirplaneArt();
  }, [search])
  
  async function fetchAirplaneArt() {
    const resp = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title`)
    const artObjects = await resp.json()
    const resultsArray = artObjects.data
    const resultsInfo = resultsArray.map((object) => {
      return {
        artist: object.artist_title,
        title: object.title,
        image: object.image_id,
        id: object.id
      }
    })
    setAirplaneArt(resultsInfo)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  console.log(search)

  return (
  //RENDER
    <>
    <h1>Art Search</h1>
    <h3>From the collection of the Art Institute of Chicago</h3>
    <ul>
      <li>Enter your chosen search term.</li>
      <li>See up to 10 results from the collection.</li>
      <li>Results include a thumbnail, the artist, and the artwork title.</li>
    </ul>
    <div id="search">
    <input
        type="text"
        value={search}
        placeholder="Enter search term..."
        onChange={handleSearch}
      />
    </div>
    <div className="buffer">...</div>
    <div id="container">
      {airplaneArt.map((art) => {
      return <Card
      key={art.id}
      artist={art.artist}
      title={art.title}
      image={art.image}
      />
    })}
    </div>
    </>
  );
}

export default App
