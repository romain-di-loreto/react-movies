import { Link, useSearchParams } from "react-router"
import styles from "../styles/Wishlist.module.css"
import { useWishlist } from "../context/WishlistProvider"
import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"

const Wishlist = () => {
    const { wishlist } = useWishlist()
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const currrentPage = searchParams.get('currrentPage');
    const totalPages = Math.ceil(wishlist.length / 20);
    const [page, setPage] = useState(currrentPage ?? 1);

    const handlePageChange = (newPage) => {
        setPage(newPage);

        setSearchParams({ currrentPage: newPage });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "My Wishlist";
        
        const start = 20 * (page - 1);

        console.log(wishlist);

        setMovies(wishlist.slice(start, start + 20));
    }, [page])


    if(wishlist.length === 0) {
        return (
            <div className={styles.container}>
                <h1>Wishlist</h1>
                <p className={styles.noMovieMessage}>You don't have any movies in your wishlist.</p>
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <h1>Wishlist</h1>

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

export default Wishlist;