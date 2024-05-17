import OrderButton from '@/components/modals/OrderButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

async function BookPage({ params }: { params: { id: string } }) {
    const response = await fetch(`https://simple-books-api.glitch.me/books/${params.id}`)
    const data = await response.json()
    console.log(data)
    const order = async (id: string) => {
        // call api to order book
        const response = await fetch(`https://simple-books-api.glitch.me/order/${id}`, {
            method: 'POST'
        })
        const result = await response.json()
        console.log(result)
    }
    return (
        <>
            <div className="container">

                <div className="p-8 bg-blue-200 m-4">
                    <div className="flex justify-start mb-4 text-bold text-gray-700">
                        <Link href="/" className=''>Back</Link>
                    </div>
                    {/* {error && <p className="text-red-500">Error: {error}</p>} */}
                    {data && (
                        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{data.name}</h2>
                                <p className="text-sm text-gray-600 mb-4">by {data.author}</p>
                                <p className="text-gray-700 mb-2">ISBN: {data.isbn}</p>
                                <p className="text-gray-700 mb-2">Type: {data.type}</p>
                                <p className="text-gray-700 mb-2">Price: ${data.price}</p>
                                <p className="text-gray-700 mb-2">Current Stock: {data['current-stock']}</p>
                                <div className='border-solid'>
                                    <OrderButton bookId={params.id} available={data.available} stock={data['current-stock']} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BookPage