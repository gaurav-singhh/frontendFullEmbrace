import api from "../api";

export const authService = {
  async createAccount({
    fullName,
    email,
    username,
    password,
    avatar,
    coverImage,
  }) {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar[0]);
    if (coverImage) formData.append("coverImage", coverImage[0]);

    try {
      const response = await api.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating account:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },

  async login({ email, password }) {
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data.data.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get("/users/current-user");
      return response.data.data;
    } catch (error) {
      // Return null or a specific error object if the user is not authenticated
      return null;
    }
  },

  async logout() {
    try {
      const response = await api.post("/users/logout");
      localStorage.removeItem("accessToken");
      return response.data;
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },
};

export default authService;
