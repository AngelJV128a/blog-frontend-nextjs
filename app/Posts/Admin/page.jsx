"use client";
import TablePost from "@/components/posts/TablePost";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Spinner from "@/components/Spinner";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // React Paginate usa índice base 0
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            params: { page: currentPage + 1 }, // tu API seguramente usa base 1
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
          <div className="bg-gray-100 rounded-lg p-6 space-y-4">
            <TablePost posts={posts} />
            <ReactPaginate
              previousLabel={"← Anterior"}
              nextLabel={"Siguiente →"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"flex gap-2 justify-center mt-6"}
              pageClassName={
                "cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
              }
              previousClassName={
                "cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
              }
              nextClassName={
                "cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
              }
              activeClassName={"bg-blue-500 text-white"}
            />
          </div>
        </div>
      )}
    </>
  );
}
