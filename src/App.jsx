import './App.css'
import Navbar from './components/Navbar'
import TheMovieDBProvider from './context/TheMovieDBProvider'
import WishlistProvider from './context/WishlistProvider'
import { BrowserRouter, Routes , Route } from 'react-router'
import MovieList from './routes/MovieList'
import MovieDetails from './routes/MovieDetails'
import Wishlist from './routes/Wishlist'

function App() {
  return (
    <TheMovieDBProvider>
      <WishlistProvider>
        <BrowserRouter>    
          <div style={{position: 'relative', zIndex: 1}}>
            <Navbar />

            <Routes>
              <Route path='/' element={<MovieList />} />
              <Route path='/list' element={<MovieList />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
              <Route path='/wishlist' element={<Wishlist />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </TheMovieDBProvider>
  )
}

export default App
