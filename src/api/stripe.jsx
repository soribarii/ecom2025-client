import axios from "axios";

export const payment = async (token) => {
  return await axios.post('https://ecom2025-api-orcin.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}