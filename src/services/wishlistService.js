import api from "./api";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addToWishlist = async (productId) => {
  return api.post("/wishlist", { productId }, getConfig());
};

export const getWishlist = async () => {
  return api.get("/wishlist", getConfig());
};

export const removeFromWishlist = async (productId) => {
  return api.delete(`/wishlist/${productId}`, getConfig());
};