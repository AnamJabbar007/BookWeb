"use client";
import { useState, useEffect } from "react";
import { searchBooks } from "../lib/api"; // API function to fetch books
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard"; // Component to display book info
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Function to handle search
  const handleSearch = async (query) => {
    setLoading(true);
    if (query.trim() === "") {
      localStorage.removeItem("searchQuery"); // Clear query from local storage if empty
    } else {
      localStorage.setItem("searchQuery", query); // Save query to local storage if not empty
    }
    setSearchQuery(query); // Update search input state
    const data = await searchBooks(query);
    setBooks(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery") || "";
    setSearchQuery(savedQuery); // Set the saved query to state on initial load
    handleSearch(savedQuery); // Perform search with saved query
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">Find Your Next Book</h1>
          <div className="w-full px-4 md:px-0 max-w-xl">
            <SearchBar onSearch={handleSearch} query={searchQuery} /> {/* Pass the search query to SearchBar */}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={{
                  id: book.id,
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors?.join(", "),
                  image: book.volumeInfo.imageLinks?.thumbnail,
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
