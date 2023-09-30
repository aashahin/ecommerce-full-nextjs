"use client";
import { useTranslations } from "next-intl";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";


export default function Home() {
  const t = useTranslations("Index");
  const onOpen = useStoreModal((state)=> state.onOpen);
  const isOpen = useStoreModal((state)=> state.isOpen);

  useEffect(() => {
      if(!isOpen){
        onOpen()
      }
  }, []);

  return (
    <div className="p-4">
        {t("descStoreModal")}
    </div>
  );
}
