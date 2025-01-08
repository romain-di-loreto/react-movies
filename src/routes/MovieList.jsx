import { Link, useSearchParams } from "react-router"
import styles from "../styles/MovieList.module.css"
import { useState, useEffect  } from "react"
import { useTheMovieDB } from "../context/TheMovieDBProvider"
import DummyCard from "../components/DummyCard"
import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"
import SearchBar from "../components/Searchbar"

const MovieList = () => {
    const [movies, setMovies] = useState(undefined);
    const [searchParams, setSearchParams] = useSearchParams();
    const currrentPage = searchParams.get('currrentPage');
    const [page, setPage] = useState(currrentPage ?? 1);
    const { getPopularMovies, totalPages } = useTheMovieDB()
    const [query, setQuery] = useState('');

    const handlePageChange = (newPage) => {
        setPage(newPage);

        setSearchParams({ currrentPage: newPage });
    }

    const handleSearchChange = (search) => {
        setQuery(search.trim());
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Movie list";

        getPopularMovies(page).then(data => {
            if(query !== '')
                setMovies(data.results?.filter(movie => movie.title.toLowerCase().startsWith(query.toLowerCase())) ?? [])
            else
                setMovies(data.results ?? [])
        });  
            
    }, [page, query]);

    if(movies !== undefined)
    {
        return (
            <div className={styles.container}>
                <h1>List of popular movies</h1>
                <div className={styles.searchbarContainer}>
                    <SearchBar onChange={handleSearchChange}/>
                </div>
                <Pagination current={page} onPageChange={handlePageChange} totalPages={totalPages}/>
                <ul className={styles.movieList}>    
                    {movies.map(movie => (
                        <Link key={movie.id} 
                            to={{pathname: `/movie/${movie.id}`}}
                            style={{textDecoration: "none"}}
                            >
                            <MovieCard movie={movie}/>
                        </Link>
                    ))}
                </ul>
                <Pagination current={page} onPageChange={handlePageChange} totalPages={totalPages}/>
            </div>
        )
    }

    const dummyCards = []
    for (var i = 0; i < 20; i++) 
        dummyCards.push(<DummyCard key={`dummy-card-${i}`} />);

    return (
        <div className={styles.container}>
            <h1>List of popular movies</h1>
            <SearchBar onChange={(newSearch) => console.log(newSearch)}/>
            <Pagination current={page} onPageChange={(newPage) => console.log(newPage)} totalPages={100}/>
            <ul className={styles.movieList}>    
                {dummyCards}            
            </ul>
            <Pagination current={page} onPageChange={(newPage) => console.log(newPage)} totalPages={100}/>
        </div>
    )
    
}

export default MovieList;