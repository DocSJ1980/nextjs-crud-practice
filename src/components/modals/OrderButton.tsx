"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import OrderModal from './OrderModal'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

interface OrderButtonProps {
    bookId: string
    available: boolean
    stock: number
}

const OrderButton: React.FC<OrderButtonProps> = ({ bookId, available, stock }) => {
    const [showModal, setShowModal] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)
    const [orders, setOrders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const client = localStorage.getItem("clientName");
        const storedOrders: string[] = localStorage.getItem("storedOrders")
            && JSON.parse(localStorage.getItem("storedOrders") || "[]");
        setAccessToken(token);
        setClientName(client);
        setOrders(storedOrders);
    }, []);

    const handleOrderClick = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        console.log("HandleCloseModal Ran")
        setShowModal(false)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>

                    <div className='border-solid'>
                        <Button className="w-full text-lg mt-4" disabled={!available} onClick={handleOrderClick}>
                            {!loading ? <span>Order Now</span> : <span>Loading...</span>}
                        </Button>
                    </div>

                </DialogTrigger>
                {showModal && <DialogContent>
                    <OrderModal
                        bookId={bookId}
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        stock={stock}
                        accessToken={accessToken} setAccessToken={setAccessToken}
                        clientName={clientName}
                        setClientName={setClientName}
                        orders={orders}
                        setOrders={setOrders}
                        setLoading={setLoading}
                    />
                </DialogContent>
                }
            </Dialog>

        </>
    )
}

export default OrderButton
