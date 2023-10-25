"use client";

import Heading from "@/components/shared/Head";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useRouter from "@/hooks/use-router";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";


const BillboardClient = () => {
    const t = useTranslations("Index");
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
               title={t("billboards")}
               description={t("billboardsDesc")}
               />
           <Button 
               onClick={() => router.push(`/${params.storeId}/billboards/new`)}
               className="flex items-center gap-2"
               >
            <Plus size={20}/>
            {t("addBillboard")}
           </Button>
        </div>
        <Separator className="my-4"/>
        </>
        );
};

export default BillboardClient;