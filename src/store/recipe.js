import { create } from "zustand";
import Axios from "axios";

export const useRecipe = create((set, get) => ({
  recipes: [],
  detailRecipe: {},
  loadingRecipes: false,

  getRecipes: async (params) => {
    set({
      loadingRecipes: true,
    });
    try {
      const url =
        await `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params}`;
      const response = await Axios.get(url);
      console.log(params);
      set({
        recipes: await response?.data?.meals,
        loadingRecipes: false,
      });
    } catch (error) {
      console.log(error);
      set({
        loadingRecipes: false,
      });
    }
  },

  getDetailRecipe: async (params) => {
    set({
      loadingRecipes: true,
    });
    try {
      const url =
        await `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params}`;
      const response = await Axios.get(url);
      console.log(params);
      set({
        detailRecipe: await response?.data?.meals[0],
        loadingRecipes: false,
      });
    } catch (error) {
      console.log(error);
      set({
        loadingRecipes: false,
      });
    }
  },
}));
