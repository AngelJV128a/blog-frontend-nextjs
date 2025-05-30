"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

export default function PostCard({
  id,
  title,
  content,
  autor,
  likes,
  initialComments = [],
}) {
  const [comments, setComments] = useState(initialComments);
  const user = useUserStore((state) => state.user);

  const [newComment, setNewComment] = useState({
    user_id: null,
    post_id: null,
    content: "",
  });

  useEffect(() => {
    if (user && id) {
      setNewComment({
        user_id: user.id,
        post_id: id,
        content: "",
      });
    }
  }, [user, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.content.trim()) return;

    setComments([...comments, newComment]);
    console.log(newComment);

    (async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`,
          newComment,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error al enviar comentario:", error);
      }
    })();

    setNewComment((prev) => ({ ...prev, content: "" }));
    console.log("enviando comentario");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">Autor: {autor}</p>
      <p className="text-gray-700">{content}</p>

      <div className="text-sm text-gray-500">👍 {likes} likes</div>

      {/* Comentarios */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Comentarios</h3>
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-800 font-semibold">{c.user_id}</p>
              <p className="text-sm text-gray-700">{c.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Nuevo comentario */}
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <textarea
            value={newComment.content}
            onChange={(e) =>
              setNewComment((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            placeholder="Escribe tu comentario..."
            className="w-full border border-gray-300 rounded p-2 resize-none"
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
}
