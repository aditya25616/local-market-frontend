import api from "./api";

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  return api.post(
    "/cart",
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCart = async () => {
  const token = localStorage.getItem("token");

  return api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};