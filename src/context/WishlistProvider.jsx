import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

// Créez le contexte
const WishlistContext = createContext();

// Composant fournisseur du contexte
const WishlistProvider = ({ children }) => {
    const addToWishlist = (movie) => {
        setWishlist([...wishlist, movie]);
    }

    const removeFromWishlist = (movieId) => {
        setWishlist(wishlist.filter(movie => movie.id !== movieId));
    }

    const isInWishlist = (movieId) => {
        return wishlist.findIndex(movie => movie.id === movieId) !== -1;
    }

    const getWishlistFromLocalstorage = () => {
        const storedWishlist = localStorage.getItem('wishlist') || '[]';

        return JSON.parse(storedWishlist);
    }

    const saveWishlistInLocalstorage = () => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    
    const [wishlist, setWishlist] = useState(getWishlistFromLocalstorage());

    useEffect(() => {     
        saveWishlistInLocalstorage();
    }, [wishlist])

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export default WishlistProvider