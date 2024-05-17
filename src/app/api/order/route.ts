import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token, clientName, bookId } = await request.json();

    const response = await fetch(
        "https://simple-books-api.glitch.me/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                bookId,
                customerName: clientName
            }),
        }
    );

    return NextResponse.json(await response.json());
}

export async function PUT(request: Request) {
    const { token, orderId, customerName } = await request.json();

    const response = await fetch(
        `https://simple-books-api.glitch.me/orders/${orderId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customerName
            }),
        }
    );

    return NextResponse.json(await response.json());
}

export async function DELETE(request: Request) {
    const { token, orderId } = await request.json();

    const response = await fetch(
        `https://simple-books-api.glitch.me/orders/${orderId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
    );

    return NextResponse.json(await response.json());
}

