import { useState, useContext, createContext, useEffect } from "react";

const WishlistContext = createContext();
const WishlistProvider = ({ children }) => {
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    let existingWishlistItem = localStorage.getItem("wishlist");
    if (existingWishlistItem) setwishlist(JSON.parse(existingWishlistItem));
  }, []);

  return (
    <WishlistContext.Provider value={[wishlist, setwishlist]}>
      {children}
    </WishlistContext.Provider>
  );
};

// custom hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };