"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function MisPosts() {
  const [posts, setPosts] = useState([]);

  // fetch solo si autenticado
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const user_id = 2; // puedes obtenerlo de tu auth
      try {
        const response = await fetch(
          `http://localhost:8000/api/posts/likes/${user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    // 👉 ¡Aquí haces la llamada!
    fetchData();
  }, []);

  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Likes</h1>

        {posts === undefined ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">Sin publicaciones</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Card
                key={post.id}
                title={post.post.title}
                user={post.post.user_id}
                id={post.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
