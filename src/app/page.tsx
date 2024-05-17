type Book = {
  id: number;
  name: string,
  type: string,
  available: boolean
}
import BookCard from "@/components/BookCard";
import { CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import Image from "next/image";

export default async function Home() {
  const response = await fetch('https://simple-books-api.glitch.me/books', {
    method: "get"
  });
  const data: Book[] = await response.json();
  return (
    <>
      <div className="container">
        <div className="flex flex-wrap h-30 p-4 items-center justify-between m-4 bg-blue-200">
          {data.length > 0 && data.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}