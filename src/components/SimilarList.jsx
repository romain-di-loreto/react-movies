import { Link } from "react-router"
import styles from "../styles/SimilarList.module.css"
import { useState, useEffect  } from "react"
import { useTheMovieDB } from "../context/TheMovieDBProvider"
import DummyCard from "../components/DummyCard"
import MovieCard from "../components/MovieCard"

const SimilarList = (props) => {
    const { movieId } = props;
    const [movies, setMovies] = useState(undefined);
    const { getSimilarMovies } = useTheMovieDB();

    useEffect(() => {
        getSimilarMovies(movieId).then(data => {
            const res = data.results ?? [];
            setMovies(res.slice(0,10));
        });     
    }, []);

    if(movies !== undefined)
    {
        return (
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
        )
    }

    const dummyCards = []
    for (var i = 0; i < 10; i++) 
        dummyCards.push(<DummyCard key={`dummy-card-${i}`} />);

    return (
        <ul className={styles.movieList}>    
            {dummyCards}            
        </ul>
    )
    
}

export default SimilarList;