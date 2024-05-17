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
