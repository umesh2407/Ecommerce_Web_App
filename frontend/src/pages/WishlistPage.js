import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useWishlist } from "../context/wishlistContext"; // Assuming useWishlist context is set up
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import ConfirmationPopup from "./../components/ConfirmationPopup"; // Import ConfirmationPopup component

const WishlistPage = () => {
  const [auth] = useAuth();
  const [wishlist, setWishlist] = useWishlist(); // Use wishlist context
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setWishlist(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlistItems();
  }, [auth?.token, setWishlist]);

  // Remove item from wishlist
  const removeWishlistItem = async (itemId) => {
    try {
      setItemToRemove(itemId);
      setShowConfirmation(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Confirm removal of item from wishlist
  const confirmRemoveItem = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/wishlist/remove/${itemToRemove}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const updatedWishlist = wishlist.filter((item) => item._id !== itemToRemove);
      setWishlist(updatedWishlist);
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
    setShowConfirmation(false);
  };

  // Cancel removal of item from wishlist
  const cancelRemoveItem = () => {
    setShowConfirmation(false);
  };

  return (
    <Layout>
      <div className="wishlist-page py-8">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl font-bold mb-4">
            {auth?.user ? `Hello ${auth?.user?.name}` : "Hello Guest"}
          </h1>
          <p className="text-center mb-4">
            {wishlist?.length
              ? `You have ${wishlist.length} items in your wishlist`
              : "Your Wishlist Is Empty"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mt-10 ml-10">
            <div className="wishlist-items">
              {wishlist?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-4 bg-white rounded-lg shadow-md p-4"
                >
                  <div className="w-24 h-24 mr-4">
        
               
                    <img  onClick={() => navigate(`/product/${item.slug}`)}
                      src={`data:${item.photo.contentType};base64,${item.photo.data}`}
                      alt={item.name}
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description.substring(0, 30)}
                    </p>
                    <p className="text-sm font-semibold">
                      Price:{" "}
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => removeWishlistItem(item._id)}>
                      <MdDelete className="text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add a summary or additional wishlist functionalities here */}
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to remove this item from your wishlist?"
          onConfirm={confirmRemoveItem}
          onCancel={cancelRemoveItem}
        />
      )}
    </Layout>
  );
};

export default WishlistPage;
