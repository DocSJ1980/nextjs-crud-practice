import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token } = await request.json();

    const response = await fetch(
        "https://simple-books-api.glitch.me/orders",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return NextResponse.json(await response.json());
}

