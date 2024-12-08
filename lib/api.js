const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const searchBooks = async (query) => {
  const response = await fetch(`${BASE_URL}/volumes?q=${query}&key=${API_KEY}`);
  return response.json();
};
