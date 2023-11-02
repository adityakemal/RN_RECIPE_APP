import { create } from "zustand";
import Axios from "axios";

export const useCategory = create((set, get) => ({
  activeCategory: "Beef",
  categories: [],
  loading: false,
  handleChangeCategory: (val) => set((state) => ({ activeCategory: val })),
  //fetch api
  getCategories: async (params) => {
    try {
      set({ loading: true });
      const url =
        await `https://www.themealdb.com/api/json/v1/1/categories.php`;
      const response = await Axios.get(url);
      set({
        categories: await response?.data?.categories,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
