import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { clientName, clientEmail } = await request.json();

    const response = await fetch(
        "https://simple-books-api.glitch.me/api-clients",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientName, clientEmail }),
        }
    );

    return NextResponse.json(await response.json());
}
