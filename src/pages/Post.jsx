import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../services/post";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);

  const isAuthor = post && userData ? post.owner?._id === userData?._id : false;

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) setPost(post.data);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    postService.deletePost(post.slug).then((status) => {
      if (status) {
        navigate("/");
      }
    });
  };

  return post ? (
    <div
      className={`py-8 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-400 text-black"
      }`}
    >
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-xl max-w-sm"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button
                  bgColor="bg-green-500 hover:bg-green-300 hover:text-gray-500"
                  className="mr-3"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-300  hover:text-red-500  "
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl px-8 font-bold">{post.title}</h1>
        </div>
        <div className="browser-css px-10">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
