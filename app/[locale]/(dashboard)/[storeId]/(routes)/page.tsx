import React from "react";
import prisma from "@/lib/prismadb";

interface DashboardPageProps {
    params: {storeId: string}
}

const DashboardPage : React.FC<DashboardPageProps>= async ({
    params
})=>{
    const store = await prisma.store.findFirst({
        where: {
            id: Number(params.storeId),
        }
    })

    return(
        <div>
            {store?.name}
        </div>
    )
}

export default DashboardPage;