"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";

export default function MisPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate usa base 0
  const [totalPages, setTotalPages] = useState(0);
  const user = useUserStore((state) => state.user);

  // fetch solo si autenticado
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const page = currentPage + 1; // Laravel usa base 1

      const user_id = user.id; // puedes obtenerlo de tu auth
      try {
        const response = await fetch(
          `http://localhost:8000/api/posts/likes/${user_id}?page=${page}`,
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

        const json = await response.json();
        console.log(json.data);
        setTotalPages(json.last_page);
        setPosts(json.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    // 👉 ¡Aquí haces la llamada!
    fetchData();
  }, [currentPage]);

  const handlePageClick = ({ selected }) => {
    console.log("selected", selected);
    setCurrentPage(selected);
  };

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
                title={post.title}
                user={post.name}
                id={post.id}
                numLikes={post.count_likes}
                numComments={post.count_comentarios}
                liked={post.liked}
              />
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Siguiente →"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex space-x-2"}
            pageClassName={"px-3 py-1 border rounded cursor-pointer"}
            activeClassName={"bg-blue-500 text-white"}
            previousClassName={"px-3 py-1 border rounded cursor-pointer"}
            nextClassName={"px-3 py-1 border rounded cursor-pointer"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
        user id: {user.id}
      </div>
    </>
  );
}
