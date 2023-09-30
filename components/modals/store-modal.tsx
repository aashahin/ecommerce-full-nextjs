"use client";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(10),
});

export const StoreModal = () => {
  const t = useTranslations("Index");
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Modal
      title={t("titleModal")}
      description={t("descModal")}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      {t("contentModal")}
    </Modal>
  );
};

export default StoreModal;
