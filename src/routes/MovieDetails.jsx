import { Link, useParams } from "react-router"
import styles from "../styles/MovieDetails.module.css"
import { useState, useEffect } from "react";
import { useTheMovieDB } from "../context/TheMovieDBProvider";
import ActorList from "../components/ActorList";
import SimilarList from "../components/SimilarList";
import { useWishlist } from "../context/WishlistProvider";


const MovieDetails = () => {
    const { id } = useParams();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const [isFavorite, setIsFavorite] = useState(isInWishlist(parseInt(id))); 
    const [movie, setMovie] = useState(undefined);
    const { getMovieDetails } = useTheMovieDB()

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Movie details";

        getMovieDetails(id)
        .then(data => setMovie(data))
    }, []) 
    
    if(movie !== undefined) {
        const toggleFavorite = () => {
            if(!isFavorite) {
                var {
                    title,
                    release_date,
                    poster_path,
                    overview,
                    vote_average,
                    popularity,
                    genres,
                    vote_count,
                } = movie;

                addToWishlist({
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    popularity: movie.popularity,
                    genre_ids: movie.genres.map(genre => id),
                });
            }
            else
                removeFromWishlist(parseInt(id));
    
            setIsFavorite(!isFavorite);
        }

        console.log(isInWishlist(parseInt(id)))

        const {
            title,
            release_date,
            poster_path,
            overview,
            vote_average,
            popularity,
            genres,
            vote_count,
        } = movie;

        const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;  

        return (
            <div>
                <article className={styles.movieDetails}>
                    <img className={styles.moviePoster} src={posterUrl}/>
                    <div className={styles.movieInfos}>
                        <h1>{title}</h1>
                        <p><span className={styles.fieldName}>Genres : </span>{
                            genres.map(genre => genre.name).map((genre, index) => (
                                <span key={`${movie.id}-genre-${index}`}>{genre}{index < genres.length - 1  ? ', ' : ''}</span>
                            ))
                        }</p>
                        <p><span className={styles.fieldName}>Release date : </span>{release_date}</p>                    
                        <p><span className={`${styles.fieldName} ${styles.notInline}`}>Overview :</span>{overview}</p>
                        <p><span className={styles.fieldName}>Note : </span>{vote_average} ⭐</p>
                        <p><span className={styles.fieldName}>Popularity : </span>{popularity}</p>
                        <p><span className={styles.fieldName}>Vote count : </span>{vote_count}</p>
                        <button onClick={toggleFavorite}>{isFavorite ? "❤️" : "🤍"}</button>
                    </div>
                    <div className={styles.actors}>
                        <h2>Actors</h2>
                        <ActorList movieId={id} />
                    </div>
                    <div className={styles.similars}>
                        <h2>Similar movies</h2>
                        <SimilarList movieId={id} />
                    </div>
                </article>
            </div>
        )
    }

    return (
        <div>
            <article className={styles.movieDetails}>
                <img className={styles.moviePoster} src="https://dummyimage.com/vertrec"/>
                <div className={styles.movieInfos}>
                    <h1>Movie title</h1>
                    <p><span className={styles.fieldName}>Genres : </span>jsp, truc, chose</p>
                    <p><span className={styles.fieldName}>Release date : </span>sometime between 1900 and 3000</p>                    
                    <p><span className={`${styles.fieldName} ${styles.notInline}`}>Overview :</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus lorem, ullamcorper sit amet semper in, porttitor in nisl. Vivamus imperdiet bibendum ligula vitae blandit. Nullam nec massa rutrum, faucibus odio id, dapibus felis. Quisque sit amet posuere turpis. Integer vehicula venenatis sem. Duis vitae ligula vel turpis rutrum aliquet. Aenean ac fermentum turpis, sit amet fermentum sapien. Quisque ullamcorper ut mauris fringilla accumsan. Nullam tincidunt felis eu justo commodo, et molestie nisi vestibulum. Aliquam erat volutpat.</p>
                    <p><span className={styles.fieldName}>Note : </span>6.5 ⭐</p>
                    <p><span className={styles.fieldName}>Popularity : </span>1000</p>
                    <p><span className={styles.fieldName}>Vote count : </span>1000</p>
                    <button onClick={() => {}}>Add/Remove to/from your wishlist</button>
                </div>
                <div className={styles.actors}>
                    <h2>Actors</h2>
                    <ActorList movieId={id} />
                </div>
                <div className={styles.similars}>
                    <h2>Similar movies</h2>
                    <SimilarList movieId={id} />
                </div>
            </article>
        </div>
    )
}

export default MovieDetails;