"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate usa base 0
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const page = currentPage + 1; // Laravel usa base 1

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            params: { page },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = response.data;
        setTotalPages(json.last_page);
        setPosts(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [currentPage]);

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
          <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                user={post.user.name}
                id={post.id}
                numLikes={post.likes_count}
                numComments={post.comments_count}
                liked={post.liked}
              />
            ))}
          </div>
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
