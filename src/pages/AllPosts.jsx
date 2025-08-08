import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import postService from "../services/post";
import { useSelector } from "react-redux";

function AllPosts() {
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAllPosts().then((response) => {
      if (response) {
        setPosts(response.data);
      }
    });
  }, []);

  return (
    <div className={`w-full ${isDarkTheme ? "bg-gray-900" : "bg-white"} py-2`}>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4"
            >
              <PostCard
                slug={post.slug}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
