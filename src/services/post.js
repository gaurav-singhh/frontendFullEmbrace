import api from "../api";

export const postService = {
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("featuredImage", featuredImage);
    formData.append("status", status);
    formData.append("userId", userId);

    try {
      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async getPost(slug) {
    try {
      const response = await api.get(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching post:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async getAllPosts() {
    try {
      const response = await api.get("/posts");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching all posts:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async updatePost(slug, { title, content, featuredImage, status }) {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (content) formData.append("content", content);
    if (featuredImage) formData.append("featuredImage", featuredImage);
    if (status) formData.append("status", status);

    try {
      const response = await api.patch(`/posts/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async deletePost(slug) {
    try {
      const response = await api.delete(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default postService;
