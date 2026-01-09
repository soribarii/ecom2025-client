import axios from "axios";

export const createCategory = async (token, form) => {
  return axios.post("https://ecom2025-api-orcin.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return axios.get("https://ecom2025-api-orcin.vercel.app/api/category");
};

export const editCategory = async (token, form) => {
  return axios.put("https://ecom2025-api-orcin.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (token, id) => {
  return axios.delete(`https://ecom2025-api-orcin.vercel.app/api/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
