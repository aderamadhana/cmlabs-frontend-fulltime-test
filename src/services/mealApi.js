import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
});

export const getIngredients = async () => {
  const { data } = await api.get("/list.php?i=list");
  return data.meals || [];
};

export const searchMealsByIngredient = async (ingredientName) => {
  const { data } = await api.get("/filter.php", {
    params: {
      i: ingredientName,
    },
  });

  return data.meals || [];
};

export const searchFoodsByFirstLetter = async (letter) => {
  const { data } = await api.get("/search.php", {
    params: {
      f: letter,
    },
  });

  return data.meals || [];
};

export const searchFoodsByMealName = async (name) => {
  const keyword = String(name || "").trim();

  if (!keyword) return [];

  const { data } = await api.get(
    `/search.php?s=${encodeURIComponent(keyword)}`,
  );
  return data.meals || [];
};

export const getFoodCategories = async () => {
  const { data } = await api.get("/list.php?c=list");
  return data.meals || [];
};

export const getFoodsByCategory = async (categoryName) => {
  const { data } = await api.get("/filter.php", {
    params: {
      c: categoryName,
    },
  });

  return data.meals || [];
};

export const getMealDetail = async (id) => {
  const { data } = await api.get(`/lookup.php?i=${id}`);
  return data.meals?.[0] || null;
};

export default api;
