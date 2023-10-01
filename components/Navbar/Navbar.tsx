"use client";

import {UserButton} from "@clerk/nextjs";
import MainNav from "@/components/Navbar/MainNav";

const Navbar = () => {
    return (
        <div className="border-b">
        <div className="flex items-center gap-2 h-16 p-4">
            <div>
                PWA
            </div>
            <div>
                Search
            </div>
            <MainNav className="mx-6"/>
            <div className="flex items-center absolute end-4">
                <UserButton afterSignOutUrl="/"/>
            </div>
            </div>
        </div>
    )
}

export default Navbar;