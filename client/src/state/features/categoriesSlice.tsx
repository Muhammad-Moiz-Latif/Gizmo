// devicesSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Category {
  CategoryId: any;
  _id: number;
  name: string;
  image: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  hasFetched: boolean;
}

const initialState: CategoryState = {
  categories: [], // Make sure this is an empty array
  isLoading: false,
  hasFetched: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload; // Expecting action.payload to be an array
      state.isLoading = false;
      state.hasFetched = true;
    },
  },
});

export const { setCategories, setCategoriesLoading } = categorySlice.actions;
export default categorySlice.reducer;
