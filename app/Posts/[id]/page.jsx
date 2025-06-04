"use client";
import PostCard from "@/components/posts/PostCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Post() {
  const params = useParams();
  const id = params.id;

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null); // null en vez de {}

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments`,
          {
            params: { post_id: id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchComments();
    fetchPost();
  }, [id]);

  if (!post || !post.user) {
    return <p>Cargando publicación y comentarios...</p>;
  }

  return (
    <div>
      <PostCard
        id={post.id}
        title={post.title}
        content={post.content}
        autor={post.user.name}
        likes={post.likes_count}
        initialComments={comments}
      />
    </div>
  );
}
