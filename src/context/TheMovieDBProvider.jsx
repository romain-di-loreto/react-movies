import React, { createContext, useContext, useState, useEffect } from 'react';

// Créez le contexte
const TheMovieDBContext = createContext();

// Composant fournisseur du contexte
const TheMovieDBProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const apikey = import.meta.env.VITE_TMDBKEY;
    const popularMovies = (page) => `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${page}`
    const movieDetails = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`
    const movieActors = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`
    const similarMovies = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apikey}`
    const genresList = () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`
    const queryMovies = (page, query) => `https://api.themoviedb.org/3/search/collection?api_key=${apikey}&include_adult=false&page=${page}&query=${encodeURIComponent(query)}`

    const getPopularMovies = (page) => {   
        return fetch(popularMovies(page ?? 1))
        .then(response => response.json())
    } 

    const getNumberOfPopularPages = () => {   
        return fetch(popularMovies(1))
        .then(response => response.json())
        // .then(json => json.total_pages)
        .then(json => 500)
    } 

    const getMovieDetails = (movieId) => {   
        return fetch(movieDetails(movieId))
        .then(response => response.json())
    }
    
    const getMovieActors = (movieId) => {   
        return fetch(movieActors(movieId))
        .then(response => response.json())
    } 

    const getSimilarMovies = (movieId) => {   
        return fetch(similarMovies(movieId))
        .then(response => response.json())
    } 

    const getMoviesByQuery = (page, query) => {
        return fetch(queryMovies(page, query))
        .then(response => response.json())
        .then(json => json)
    }

    useEffect(() => {
        fetch(genresList())
        .then(response => response.json())
        .then(json => setGenres(json?.genres ?? []));

        getNumberOfPopularPages()
        .then(data => setTotalPages(data));
    },[])

    return (
        <TheMovieDBContext.Provider value={{ genres, getPopularMovies, getMovieDetails, getMovieActors, getSimilarMovies, getMoviesByQuery, totalPages }}>
            {children}
        </TheMovieDBContext.Provider>
    );
};

export const useTheMovieDB = () => {
    return useContext(TheMovieDBContext);
};

export default TheMovieDBProvider