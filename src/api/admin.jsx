import axios from "axios";

export const listOrderAdmin = async (token) => {
  return await axios.get("https://ecom2025-api-orcin.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    "https://ecom2025-api-orcin.vercel.app/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listAllUsers = async (token) => {
  return await axios.get(
    "https://ecom2025-api-orcin.vercel.app/api/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeUserStatus = async (token, value) => {
  return await axios.post(
    "https://ecom2025-api-orcin.vercel.app/api/change-status", value, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeUserRole = async (token, value) => {
  return await axios.post(
    "https://ecom2025-api-orcin.vercel.app/api/change-role", value, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
