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
  
  useEffect(() => {
    fetchAirplaneArt();
  }, [])
  
  async function fetchAirplaneArt() {
    const resp = await fetch("https://api.artic.edu/api/v1/artworks/search?q=airplane&fields=artist_title,id,image_id,title")
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

  return (
  //RENDER
    <>
    <h1>Art Search</h1>
    <h3>From the collection of the Art Institute of Chicago</h3>
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
