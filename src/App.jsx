import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

const App = () => {
  //SETTING STATE
  const [art, setArt] = useState([{
    artist: "",
    title: "", 
    image: "",
    id: ""
  }])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    fetchArt();
  }, [search, page])
  
  async function fetchArt() {
    const resp = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title&limit=8&page=${page}`)
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
    setArt(resultsInfo)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  function handlePage(action) {
    //because this is a function, react passes in the current value of "page"; 
    //if we were to enter a value, it would simply update the state
    setPage(currentPage => {
      if (action === 'previous') {
        return currentPage - 1;
      } else {
        return currentPage + 1;
      }
    });
  }

  return (
  //RENDER
    <>
    <h1>Art Search</h1>
    <h3>From the collection of the Art Institute of Chicago</h3>
    <ul>
      <li>Enter your chosen search term.</li>
      <li>See up to 8 results from the collection per page.</li>
      <li>Results include a thumbnail, the artist, and the artwork title.</li>
      <li>Click 'next' at the bottom of the page to see the next 8 results.</li>
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
      {art.map((art) => {
      return <Card
      key={art.id}
      artist={art.artist}
      title={art.title}
      image={art.image}
      />
    })}
    </div>
    <div id="page">
    <button disabled={page === 1} onClick={() => handlePage('previous')}>Previous</button>
    Page {page}
    <button onClick={() => handlePage('next')}>Next</button>
    </div>
    </>
  );
}

export default App
