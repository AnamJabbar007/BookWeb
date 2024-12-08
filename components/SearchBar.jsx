import Image from "next/image";
import search_icon from '@/public/search.png'

export default function SearchBar({ onSearch, query }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query); // Trigger search with the current query
      }}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => onSearch(e.target.value)} // Pass changes immediately to parent
       className="border bg-transparent backdrop-blur-lg  border-gray-300 text-neutral-200 p-3 rounded-l-md w-full focus:ring-2 focus:ring-blue-950"
      />
 <button type="submit" className="bg-white border border-white text-white p-3 rounded-md">
      <Image src={search_icon} width={24} height={24} alt="search" />
      </button>    </form>
  );
}
