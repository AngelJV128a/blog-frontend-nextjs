"use client";
import { useState } from "react";

export default function PostCard({ title, content, likes, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-700">{content}</p>

      <div className="text-sm text-gray-500">👍 {likes} likes</div>

      {/* Comentarios */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Comentarios</h3>
        {comments.length === 0 ? (
          <p className="text-gray-400">No hay comentarios aún.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((c, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Nuevo comentario */}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario..."
          className="w-full border border-gray-300 rounded p-2 resize-none"
          rows={3}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Comentar
        </button>
      </div>
    </div>
  );
}
