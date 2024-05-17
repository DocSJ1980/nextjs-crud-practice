"use client"
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Loader2, PencilRuler, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface Order {
    id: string;
    bookId: number;
    customerName: string;
    createdBy: string;
    quantity: number;
    timestamp: number;
}


const OrdersPage = () => {
    const [data, setData] = useState<Order[]>([]);
    const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
    const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                setData(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    function formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
    const totalQuantity = data.reduce((total, order) => total + order.quantity, 0);

    const handleUpdate = async (orderId: string, customerName: string) => {
        setIsUpdating((prevState) => ({ ...prevState, [orderId]: true }));
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("/api/order", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, orderId, customerName }),
            });

            if (response.ok) {
                // Handle successful update
                console.log("Order updated successfully");
                router.refresh()
            } else {
                // Handle update error
                console.error("Error updating order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        } finally {
            setIsUpdating((prevState) => ({ ...prevState, [orderId]: false }));
        }
    };

    const handleDelete = async (orderId: string) => {
        setIsDeleting((prevState) => ({ ...prevState, [orderId]: true }));
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("/api/order", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, orderId }),
            });

            if (response.ok) {
                // Handle successful deletion
                console.log("Order deleted successfully");
                // Optionally, you can update the data state to remove the deleted order
                router.refresh()
            } else {
                // Handle deletion error
                console.error("Error deleting order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        } finally {
            setIsDeleting((prevState) => ({ ...prevState, [orderId]: false }));
        }
    };


    return (
        <div>
            {data.length > 0 ? (
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Book Id</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead>Ordered At</TableHead>
                            <TableHead className='text-center'>Update</TableHead>
                            <TableHead className='text-center'>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.bookId}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell className="text-right">
                                    {order.quantity}
                                </TableCell>
                                <TableCell>{formatDate(order.timestamp)}</TableCell>
                                <TableCell>
                                    <div className='flex justify-center items-center'>
                                        {isUpdating[order.id] ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <Button
                                                className='h-8 w-8 p-1'
                                                variant={'secondary'}
                                                onClick={() => handleUpdate(order.id, order.customerName)}
                                            >
                                                <PencilRuler className='h-5 w-5' />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-center items-center'>
                                        {isDeleting[order.id] ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <Button
                                                variant={'destructive'}
                                                className='h-8 w-8 p-1'
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                <Trash2 className='h-5 w-5' />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className='text-center'>Total</TableCell>
                            <TableCell className="text-right">{totalQuantity}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            ) : (
                <div className="flex justify-center items-center">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
