"use client";
import PostCard from "@/components/PostCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post() {
  const params = useParams();
  const id = params.id;

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null); // null en vez de {}

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:8000/api/comments?post_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setComments(data);
    };

    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setPost(data);
    };

    fetchComments();
    fetchPost();
  }, [id]);

  if (!post ) {
    return <p>Cargando publicación y comentarios...</p>;
  }

  return (
    <div>
      <PostCard
        title={post.title}
        content={post.content}
        autor = {post.user.name}
        likes={post.likes_count}
        initialComments={comments}
      />
    </div>
  );
}
