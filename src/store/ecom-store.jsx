import { listCategory } from "@/api/category";
import { listProduct, searchFilters } from "@/api/product";
import Category from "@/pages/admin/Category";
import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import _ from "lodash";
import { currentAdmin } from "@/api/auth";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  images: [],
  deletedImages: [],
  carts: [],
  isAdmin: false,
  isLoading: false,
  actionLogin: async (form) => {
    const res = await axios.post("https://ecom2025-api-orcin.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  actionLogout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      images: [],
      deletedImages: [],
      carts: [],
      isAdmin: false,
    });
  },
  checkIsAdmin: async (isAdmin, token) => {
    try {
      await currentAdmin(token);
      set({ isAdmin: isAdmin });
    } catch (error) {
      console.log(error);
    }
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    set({ isLoading: true });
    try {
      const res = await listProduct(count);
      set({ products: res.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
  setImagesForm: (image) => {
    set({ images: image });
  },
  setDeletedImages: (images) => set({ deletedImages: images }),
  addDeletedImage: (public_id) =>
    set((state) => ({
      deletedImages: [...state.deletedImages, public_id],
    })),
  actionSearchFilter: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    const unique = _.unionWith(updateCart, _.isEqual);

    set({ carts: unique });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    user: state.user,
    token: state.token,
    categories: state.categories,
    images: state.images,
    deletedImages: state.deletedImages,
    carts: state.carts,
    isAdmin: state.isAdmin,
  }),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
