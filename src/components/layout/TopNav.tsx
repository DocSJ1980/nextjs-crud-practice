import Link from 'next/link'
import React from 'react'

export default function TopNav() {
    return (
        <div className='h-16 w-full bg-blue-400 flex justify-between items-center '>
            <div className='flex justify-center ml-10'>

                <p className='text-2xl font-bold'>Simple Book Store</p>
            </div>
            <div className="flex justify-end mr-10">
                <Link href={`/orders`} className='border border-solid border-black rounded-md py-2 px-4 text-sm'>
                    Orders
                </Link>
            </div>

        </div>
    )
}
