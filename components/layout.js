import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div>
            <Link href="/" className="mx-2 font-semibold">Home</Link>
            <Link href="/upload" className="mx-2 font-semibold">Uplad</Link>
            <div className="flex items-center justify-center h-screen">
                <div className="m-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}