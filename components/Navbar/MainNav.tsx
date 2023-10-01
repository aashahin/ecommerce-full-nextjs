"use client";

import React from "react";
import {cn} from "@/lib/utils";

const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <nav
             className={cn(
                "flex items-center gap-2",
                className
            )}
        >
            MainNav
        </nav>
    )
}

export default MainNav;