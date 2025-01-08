import styles from "../styles/MovieCard.module.css"
import { useTheMovieDB } from "../context/TheMovieDBProvider";
import { useState } from "react";
import { useWishlist } from "../context/WishlistProvider";

const MovieCard = (props) => {
    const { movie } = props;
    const { genres } = useTheMovieDB();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const [isFavorite, setIsFavorite] = useState(isInWishlist(movie.id));    
    const {
        title,
        release_date,
        poster_path,
        overview,
        vote_average,
        popularity,
        genre_ids,
    } = movie;

    const toggleFavorite = () => {
        if(!isFavorite) {
            addToWishlist({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                overview: movie.overview,
                vote_average: movie.vote_average,
                popularity: movie.popularity,
                genre_ids: movie.genre_ids,
            });            
        }
        else
            removeFromWishlist(movie.id);
        
        setIsFavorite((prev) => !prev);
    };

    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const genreNames = genres.filter(genre => genre_ids.includes(genre.id)).map((genre, index) => genre.name);

    return (
        <li className={styles.movieCard} style={{ backgroundImage: `url(${posterUrl})` }}>
            <button
                className={`${styles.favoriteButton} ${
                    isFavorite ? styles.filled : ""
                }`}
                onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    e.stopPropagation(); // Stop the event from bubbling up
                    toggleFavorite(); // Toggle favorite state
                }}
                aria-label="Toggle favorite"
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>
            <div className={styles.movieDetails}>
                <h2 className={styles.movieTitle}>{title}</h2>
                <p className={styles.movieReleaseDate}>Release Date: {release_date}</p>
                <p className={styles.movieGenres}>{
                    genreNames.map((genre, index) => (
                        <span key={`${movie.id}-genre-${index}`}>{genre}{index < genreNames.length - 1  ? ', ' : ''}</span>
                    ))
                }</p>
                <p className={styles.movieOverview}>{overview}</p>
                <div className={styles.movieMetrics}>
                <span className={styles.movieRating}>⭐ {vote_average}</span>
                <span className={styles.moviePopularity}>🔥 {popularity}</span>
                </div>
                <div className={styles.favorite}>

                </div>
            </div>
        </li>
    )
}

export default MovieCard;