import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [totals, setTotals] = useState({
    total: 0,
    pages: 0
  })
  
  useEffect(() => {
    toast.dismiss()
    fetchArt();
    if (search === "") {
      return
    } else if (totals.total === 0) {
      toast(`There are no results for ${search}`)
    } else {
    toast(`There are ${totals.total} results for ${search}.`)
    }
  }, [search, page])
  
  async function fetchArt() {
    const resp = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title&limit=8&page=${page}`)
    const artObjects = await resp.json()
    const resultsArray = artObjects.data
    const totalResults = {
      total: artObjects.pagination.total,
      page: artObjects.pagination.total_pages
    }
    const resultsInfo = resultsArray.map((object) => {
      return {
        artist: object.artist_title,
        title: object.title,
        image: object.image_id,
        id: object.id
      }
    })
    setArt(resultsInfo)
    setTotals(totalResults)
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
    <ToastContainer
    position="bottom-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition: Zoom
    />
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
    {/* Greys out the 'previous' button if the current page state is 1 */}
    <button disabled={page === 1} onClick={() => handlePage('previous')}>Previous</button>
    Page {page}
    <button onClick={() => handlePage('next')}>Next</button>
    </div>
    </>
  );
}

export default App
