"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DialogFooter } from '../ui/dialog'

interface OrderModalProps {
    bookId: string
    isOpen: boolean
    onClose: () => void
    stock: number
    accessToken: string | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    clientName: string | null
    setClientName: React.Dispatch<React.SetStateAction<string | null>>
    orders: string[]
    setOrders: React.Dispatch<React.SetStateAction<string[]>>
}

const OrderModal: React.FC<OrderModalProps> = ({ bookId, isOpen, onClose, stock, accessToken, setAccessToken, clientName, setClientName, orders, setOrders }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        quantity: 1,
    })

    let currentOrders: string[]
    if (orders === null) currentOrders = []
    else currentOrders = orders
    const authenticate = async (name: string, email: string) => {
        try {
            const response = await fetch(`/api/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientName: name,
                    clientEmail: email,
                }),
            })
            const result = await response.json()
            console.log(result)
            if (result.accessToken) {
                setAccessToken(result.accessToken)
                setClientName(name)
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('clientName', name)
            }
            return result
        } catch (error) {
            console.error(error)
        }
    }

    const placeOrder = async (accessToken: string, clientName: string, bookId: string) => {
        try {
            const response = await fetch(`/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: accessToken,
                    clientName,
                    bookId
                }),
            })
            const result = await response.json()
            console.log(result)
            if (result?.orderId) {
                console.log("currentOrders: ", currentOrders)
                currentOrders.push(result.orderId)
                setOrders(currentOrders)
                console.log("currentOrders: ", currentOrders)
                console.log("orders: ", orders)
                localStorage.setItem('orders', JSON.stringify(orders))
            }
            return result
        } catch (error) {
            console.error(error)
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!accessToken && !clientName) {
            const authRequest = await authenticate(formData.name, formData.email)
            if (authRequest.token && clientName) {
                await placeOrder(authRequest.token, clientName, bookId)
            }
            onClose()
        } else if (accessToken && clientName) {
            await placeOrder(accessToken, clientName, bookId)
            onClose()
        }
    }

    const handleIncrease = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.quantity < stock) {
            setFormData({ ...formData, quantity: formData.quantity + 1 });
        }
    };
    const handleDecrease = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.quantity > 1) {
            setFormData({ ...formData, quantity: formData.quantity - 1 });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="mt-3 text-center sm:mt-0 sm:text-left sm:mx-4">
            <h3 className="text-lg leading-6 mb-3 font-medium text-center text-gray-900" id="modal-headline">
                Place Your Book
            </h3>
            <div className="mt-2">
                <form onSubmit={handleFormSubmit}>
                    {clientName && <p className='text-start mb-6'>Welcome {clientName}! 👋</p>}
                    {!clientName &&
                        <>
                            <div className='flex justify-between items-center gap-4 '>
                                <label htmlFor="name" className="block text-sm text-start font-medium min-w-16 text-gray-700">
                                    Name
                                </label>
                                <Input value={formData.name} onChange={handleInputChange} name="name" />
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <label htmlFor="email" className="block text-sm text-start font-medium text-gray-700 min-w-16">
                                    Email
                                </label>
                                <Input value={formData.email} onChange={handleInputChange} name="email" />
                            </div>
                        </>
                    }
                    <div className="mt-2 flex justify-start items-center gap-4">
                        <label className="block text-sm text-start font-medium min-w-16 text-gray-700">
                            Quantity
                        </label>
                        <div className="ml-10 flex justify-center gap-10 items-center ">
                            <Button className='rounded-full text-xl' onClick={handleDecrease}>-</Button>
                            <p className="text-center min-w-10">
                                {formData.quantity}
                            </p>
                            <Button className='rounded-full text-xl' onClick={handleIncrease}>+</Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="mt-4 w-full">
                            <button
                                type="submit"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            >
                                Order
                            </button>
                        </div>
                    </DialogFooter>
                </form>
            </div>
        </div>
    )
}

export default OrderModal
