"use client";

import { useEffect, useState } from "react";
import StoreModal from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  if (!isModalOpen) return null;

  return <StoreModal />;
};

export default ModalProvider;
