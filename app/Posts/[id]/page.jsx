"use client";
import PostCard from "@/components/PostCard";
import { useParams } from "next/navigation";
export default function Post() {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <PostCard
        title="Mi primer post"
        content="Este es el contenido del post."
        likes={25}
        initialComments={["Muy buen post!", "Gracias por compartir"]}
      />
    </div>
  );
}
