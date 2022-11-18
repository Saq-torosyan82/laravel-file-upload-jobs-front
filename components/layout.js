import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <Link href="/" className="mx-2 font-semibold">Home</Link>
                    <Link href="/upload" className="mx-2 font-semibold">Uplad</Link>
                </div>
            </nav>
            <div className="flex items-center justify-center h-screen">
                <div className="m-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}