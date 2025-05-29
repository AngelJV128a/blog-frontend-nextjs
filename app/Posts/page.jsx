"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Cookies from "js-cookie";

import ReactPaginate from "react-paginate";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate usa base 0
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const page = currentPage + 1; // Laravel usa base 1

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}`,
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
        /*         console.log(json.data); */
        setTotalPages(json.last_page);
        setPosts(json.data);
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
  );
}
