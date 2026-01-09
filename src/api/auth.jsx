import axios from "axios";

export const registerUser = async (data) => {
  return await axios.post("https://ecom2025-api-orcin.vercel.app/api/register", data);
};

export const currentUser = async (token) =>
  await axios.post(
    "https://ecom2025-api-orcin.vercel.app/api/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) => {
  return await axios.post(
    "https://ecom2025-api-orcin.vercel.app/api/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
