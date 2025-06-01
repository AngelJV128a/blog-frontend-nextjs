import Link from "next/link";
import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

import LikeButton from "./posts/LikeButton";
import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function Card({
  title,
  user,
  id,
  numLikes,
  numComments,
  liked,
}) {
  const [likes, setLikes] = useState(numLikes);
  const pathname = usePathname();
  const router = useRouter();

  const handleLikeToggle = (liked) => {
    console.log(likes);
    setLikes((prev) => prev + (liked ? 1 : -1));
    console.log(likes);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          try {
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            );
            const data = response.data;
            console.log(data);
            Swal.fire({
              title: "Eliminando...",
              text: "Tu post ha sido eliminado.",
              timer: 1500,
              icon: "success",
            });
            router.push("/posts/mis-posts");
          } catch (error) {
            console.error(
              "Error en fetch:",
              error.response?.status || error.message
            );
          }
        };
        fetchData();
      }
    });
  };

  return (
    <div
      key={id}
      className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-6"
    >
      {pathname === "/posts/mis-posts" && (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/posts/${id}/editar`}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleDelete}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">{title}</h5>
      <p className="text-base font-light leading-relaxed text-inherit mb-4">
        Autor: {user}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <Link href={`/posts/${id}`}>
          <button
            className="mt-auto text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg transition"
            type="button"
          >
            Read More
          </button>
        </Link>
        <div className="flex items-center gap-4 ml-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LikeButton onToggle={handleLikeToggle} initialLiked={liked} />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-green-500" />
            <span>{numComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
