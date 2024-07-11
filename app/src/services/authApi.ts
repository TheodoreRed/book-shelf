import axios from "axios";
import { User } from "../models/User";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAuthenticatedUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get(`${apiUrl}/auth/current-user`, {
      withCredentials: true,
    });
    return response.data ? response.data : null;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Logout failed");
    } else {
      throw new Error("An unexpected error occurred during logout");
    }
  }
};
