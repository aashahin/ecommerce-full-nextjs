import BillboardForm from "./components/BilloardForm";

export default async function BillboardPage({
    params: {billboardId},
}: {
    params: {billboardId: string};
}){

    let billboard;

    if (billboardId !== "new") {
    billboard = await prisma?.billboard.findUnique({
        where: {
            id: billboardId,
        },
    });
    }

    return(
        <div>
           <BillboardForm store={billboard} /> 
        </div>
    )
}
