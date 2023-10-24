"use client";

import Heading from "@/components/shared/Head";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

const BillboardClient = () => {
    const t = useTranslations("Index");
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
               title={t("billboards")}
               description={t("billboardsDesc")}
               />
           <Button>
            <Plus size={20} className="me-2"/>
            {t("addBillboard")}
           </Button>
        </div>
        <Separator className="my-4"/>
        </>
        );
};

export default BillboardClient;