"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import Spinner from "@/components/Spinner";

export default function MisPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate usa base 0
  const [totalPages, setTotalPages] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return; // ⛔ espera a que el usuario esté definido

    const fetchData = async () => {
      const token = Cookies.get("token");
      const page = currentPage + 1; // Laravel usa base 1
      const user_id = user.sub;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/likes/${user_id}?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = response.data;
        console.log(json.data);
        setTotalPages(json.last_page);
        setPosts(json.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching posts:",
          error.response?.status || error.message
        );
      }
    };

    fetchData();
  }, [currentPage, user]);

  const handlePageClick = ({ selected }) => {
    console.log("selected", selected);
    setCurrentPage(selected);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      ) : (
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
        </div>
      )}
    </>
  );
}
