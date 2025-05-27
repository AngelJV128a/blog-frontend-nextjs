"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/UseAuthGuard";
import Card from "@/components/Card";

export default function Posts() {
  const { isLoading, isAuthenticated } = useAuthGuard();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  // Redirección controlada
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/Login");
    }
  }, [isLoading, isAuthenticated, router]);

  // fetch solo si autenticado
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/api/posts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Renderizado condicional **solo en UI**
  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
      {posts.map((post) => (
        <Card key={post.id} title={post.title} user={post.user.name} id={post.id} numLikes={ post.likes_count} numComments={post.comments_count}/>
      ))}
    </div>
    </div>
  );
}
