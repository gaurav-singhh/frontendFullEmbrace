import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import postService from "../services/post";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post.data);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className={`py-8 ${isDarkTheme ? "bg-gray-900" : "bg-white"} `}>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
