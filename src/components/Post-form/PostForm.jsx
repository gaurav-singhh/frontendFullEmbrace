import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import postService from "../../services/post";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostImage from "../../Images/AddPost_Image.png";

export default function PostForm({ post }) {
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    try {
      const postPayload = {
        ...data,
        featuredImage: data.image?.[0],
      };

      if (post) {
        const updatedPost = await postService.updatePost(
          post.slug,
          postPayload
        );
        if (updatedPost) navigate(`/post/${updatedPost.data.slug}`);
      } else {
        const newPost = await postService.createPost({
          ...postPayload,
          userId: userData._id,
        });
        if (newPost) navigate(`/post/${newPost.data.slug}`);
      }
    } catch (error) {
      console.error("Failed to submit post", error);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* LEFT: TITLE, SLUG, CONTENT */}
      <div
        className={`w-2/3 px-2 ${isDarkTheme ? "text-white" : "text-black"}`}
      >
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 text-black"
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 text-black"
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* RIGHT: IMAGE, STATUS, BUTTON */}
      <div
        className={`w-1/3 px-2 ${isDarkTheme ? "text-white" : "text-black"}`}
      >
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedImage(URL.createObjectURL(file));
              } else {
                setSelectedImage(null);
              }
            },
          })}
        />

        {/* NEWLY SELECTED IMAGE */}
        {selectedImage && (
          <div className="w-full mb-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-lg max-h-72 object-contain mx-auto"
            />
          </div>
        )}

        {/* EXISTING POST IMAGE (when no new image selected) */}
        {post && !selectedImage && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="rounded-lg max-h-72 object-contain mx-auto"
            />
          </div>
        )}

        {/* DEFAULT PLACEHOLDER IF NO IMAGE */}
        {!post && !selectedImage && (
          <div className="w-full mt-4 hidden md:block">
            <img
              src={AddPostImage}
              alt="Add Post Placeholder"
              className="rounded-lg max-h-72 object-contain mx-auto"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500 hover:bg-green-400" : undefined}
          className="w-full"
          disabled={loading}
        >
          {post
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Creating..."
            : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
