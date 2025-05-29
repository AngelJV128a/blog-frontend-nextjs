"use client";
import EditarPost from "@/components/Forms/EditarPost";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Editar() {
  const params = useParams();
  const id = params.id;

  const [post, setPost] = useState(null); // null en vez de {}

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error("Error al obtener el post:", error);
        // Aquí podrías manejar el error de forma visual también (ej: setear un estado de error)
      }
    };

    fetchPost();
  }, [id]);

  if (!post ) {
    return <p>Cargando publicación</p>;
  }
  return (
    <>
       <EditarPost post={post} /> 
    </>
  );
}
