"use client";

import {UserButton} from "@clerk/nextjs";
import MainNav from "@/components/Navbar/MainNav";
import Link from "next-intl/link";

const Navbar = () => {
    return (
        <div className="border-b">
        <div className="flex items-center gap-2 h-16 p-4">
            <Link href={"/"} className="text-2xl font-bold">
                مجنة
            </Link>
            <MainNav className="mx-6"/>
            <div className="flex items-center absolute end-4">
                <UserButton afterSignOutUrl="/"/>

                {/*// TODO: Add a toggle for other languages*/}
            </div>
            </div>
        </div>
    )
}

export default Navbar;