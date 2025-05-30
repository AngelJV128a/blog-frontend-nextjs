"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.content.trim()) return;

    const nuevoComentario = {
      ...data,
      user_id: user.id,
      post_id: id,
    };

    setComments([...comments, nuevoComentario]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        nuevoComentario,
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

    reset(); // limpia el campo 'content'
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
              <p className="text-sm text-gray-800 font-semibold">usuario: {c.user_id}</p>
              <p className="text-sm text-gray-700">{c.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Nuevo comentario */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <textarea
            {...register("content", { required: "El comentario es obligatorio" })}
            placeholder="Escribe tu comentario..."
            className="w-full border border-gray-300 rounded p-2 resize-none"
            rows={3}
          />
           {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
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
