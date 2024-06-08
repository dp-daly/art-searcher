import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Page from './components/Page';
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
    page: 0
  })
  
  useEffect(() => {
    toast.dismiss()
    fetchArt();
    if (search === "") {
      return
    } else if (totals.total === 0) {
      toast(`There are no results for ${search}`)
    } else {
      //Regex added to accommodate different total number lengths with appropriate commas
    toast(
      <>
        There are <b>{totals.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> results for <b>{search}</b>.
      </>
    )
    }
  }, [search])


  //Separated out to avoid toast from firing with each new page.
  useEffect(() => {
    fetchArt();
  }, [page]);

  
  async function fetchArt() {
    const resp = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title&limit=8&page=${page}`)
    const artObjects = await resp.json()
    console.log(artObjects)
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

  function returnToPage1() {
    setPage(1)
  }

  //Defining props to be passed to the Page component here and using the spread operator to pass them through in both instances of its use below. This is to make the code more maintainable if props need to change when it is being used more than once. 
  const pageProps = {
    index: page,
    page: page,
    total: totals.page,
    updatePage: handlePage
  };


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
    toastStyle={{ backgroundColor: "goldenrod", color: "black" }}
    />
    <h1 onClick={returnToPage1}>Art Search</h1>
    <h3>From the collection of the Art Institute of Chicago</h3>
    <ul>
      <li>Enter your chosen search term.</li>
      <li>Results include a thumbnail, the artist, and the artwork title.</li>
      <li>See up to 8 results from the collection per page. Click 'next' above or below the gallery to see the next 8 results.</li>
      <li>If you would like to return to the first page of your search, just click on "Art Search" at the top of the page.</li>
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
    <Page {...pageProps} />
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
    <Page {...pageProps} />
    </>
  );
}

export default App
