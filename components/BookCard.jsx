import Image from "next/image";
import Link from "next/link"; // Import Link from next.js for navigation

export default function BookCard({ book }) {
    // Check if book.id is defined before rendering the link
    if (!book.id) {
      return <div>No ID available for this book</div>;
    }
  
    return (
      <div className=" rounded-md p-8 shadow-md">
        <Link href={`https://books.google.com/books?id=${book.id}`} passHref>
          <Image
            src={book.image}
            alt={book.title}
            className="w-2/3 h-auto object-cover "
            width={200}
            height={600}
          />
          <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.author}</p>
          <span>{}</span>
        </Link>
      </div>
    );
  }
  