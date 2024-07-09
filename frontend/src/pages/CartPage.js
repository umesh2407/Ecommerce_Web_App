import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import ConfirmationPopup from "./../components/ConfirmationPopup"; // Import ConfirmationPopup component

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to toggle confirmation popup
  const [itemToRemove, setItemToRemove] = useState(null); // State to store item ID to remove
  const navigate = useNavigate();

  // Fetch Braintree token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial fetch of token
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Calculate total price of items in cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      setItemToRemove(pid); // Set item ID to remove
      setShowConfirmation(true); // Show confirmation popup
    } catch (error) {
      console.log(error);
    }
  };

  // Confirm removal of item
  const confirmRemoveItem = () => {
    const updatedCart = cart.filter((item) => item._id !== itemToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowConfirmation(false); // Hide confirmation popup after deletion
  };

  // Handle cancellation of removal
  const cancelRemoveItem = () => {
    setShowConfirmation(false); // Hide confirmation popup
  };

  // Handle payment processing
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_API}/api/product/braintree/payment`,
  //       {
  //         nonce,
  //         cart,
  //       }
  //     );
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
// Inside your handlePayment function
const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/product/braintree/payment`,
      {
        nonce,
        cart,
      }
    );

    // After successful payment, send invoice email
    await axios.post(`${process.env.REACT_APP_API}/api/product/send-invoice`, {
      userEmail: auth.user.email, // Assuming user email is stored in auth.user.email
      invoiceDetails: cart, // Assuming cart contains the items purchased
    });

    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Completed Successfully");
  } catch (error) {
    console.log("Error processing payment:", error);
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="cart-page py-8">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl font-bold mb-4">
            {auth?.user ? `Hello ${auth?.user?.name}` : "Hello Guest"}
          </h1>
          <p className="text-center mb-4">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : "Your Cart Is Empty"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="cart-items">
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center mb-4 bg-white rounded-lg shadow-md p-4"
                >
                  <div className="w-24 h-24 mr-4">
                    <img onClick={() => navigate(`/product/${p.slug}`)}
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold mb-2">{p.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="text-sm font-semibold">
                      Price:{" "}
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => removeCartItem(p._id)}>
                      <MdDelete className="text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
              <hr className="mb-4" />
              <div className="mb-4">
                <h4 className="text-lg font-semibold">
                  Total: {totalPrice()}
                </h4>
              </div>
              {auth?.user?.address ? (
                <>
                  <div className="mb-4">
                    <h4 className="font-semibold">Current Address</h4>
                    <p>{auth?.user?.address}</p>
                    <button
                      className="btn btn-outline-warning mt-2"
                      onClick={() =>
                        navigate("/dashboard/user/profile")
                      }
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/dashboard/user/profile")
                      }
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="text-red-400"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div>
                {!clientToken ||
                !auth?.token ||
                !cart?.length ? (
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-gray-600">
                      Payment gateway is not available
                    </span>
                  </div>
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) =>
                        setInstance(instance)
                      }
                    />
                    <button
                      className={`w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mt-4 ${
                        loading ||
                        !instance ||
                        !auth?.user?.address
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handlePayment}
                      disabled={
                        loading ||
                        !instance ||
                        !auth?.user?.address
                      }
                    >
                      {loading
                        ? "Processing ..."
                        : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to remove this item from your cart?"
          onConfirm={confirmRemoveItem}
          onCancel={cancelRemoveItem}
        />
      )}
    </Layout>
  );
};

export default CartPage;
