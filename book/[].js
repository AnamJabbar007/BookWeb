import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

export async function getServerSideProps({ params }) {
  const { id } = params;

  // Fetch book details from Google Books API
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  if (!res.ok) {
    return {
      notFound: true, // Display a 404 page if the book isn't found
    };
  }

  const book = await res.json();

  return {
    props: { book },
  };
}

const BookDetails = ({ book }) => {
  const router = useRouter();

  // Show loading state if the page is pre-rendering (rare in this case)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Destructure book data
  const { volumeInfo } = book;
  const { title, authors, description, imageLinks, publishedDate, publisher } =
    volumeInfo;

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{title || "Book Details"}</title>
      </Head>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Book Cover */}
        {imageLinks?.thumbnail && (
          <Image
            src={imageLinks.thumbnail}
            alt={`${title} cover`}
            className="w-full md:w-1/3 mx-auto mb-4 rounded-md"
          />
        )}

        {/* Book Title */}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        {/* Authors */}
        {authors && (
          <p className="text-gray-600">
            <strong>Author(s):</strong> {authors.join(", ")}
          </p>
        )}

        {/* Publisher and Date */}
        <p className="text-gray-600">
          <strong>Publisher:</strong> {publisher || "Unknown"}
        </p>
        <p className="text-gray-600">
          <strong>Published Date:</strong> {publishedDate || "Unknown"}
        </p>

        {/* Description */}
        {description && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        )}

        {/* Back Button */}
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
