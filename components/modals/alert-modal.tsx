"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
    const t = useTranslations("Index");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t("AreYouSure")}
      description={t("alertModalDesc")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 flex items-center justify-end gap-2 w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
            {t("cancel")}
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            {t("continue")}
        </Button>
      </div>
    </Modal>
  );
};