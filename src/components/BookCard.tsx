import React from 'react'
import { CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import Link from 'next/link';
import { Button } from './ui/button';
type Book = {
    id: number;
    name: string,
    type: string,
    available: boolean
}

function BookCard({ book }: { book: Book }) {
    return (
        <Card className='max-w-sm min-w-50 rounded overflow-hidden shadow-lg m-4'>
            <CardHeader>{book.name}</CardHeader>
            <CardDescription className="ml-6">{book.type}</CardDescription>
            <CardContent className="mt-8">
                <p className=' my-4 font-bold'>{book.available ? "Available" : "Not available"}</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor aut maxime perspiciatis aliquam est laboriosam eius quaerat eaque molestiae, laborum architecto explicabo temporibus? Tempore, repellendus.</p>
                <div className="flex justify-end items-center">
                    <div className="mt-8  flex justify-end">
                        <Link href={`/book/${book.id}`} className='border border-solid border-black rounded-md py-2 px-4 text-sm'>
                            View Detail
                        </Link>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default BookCard