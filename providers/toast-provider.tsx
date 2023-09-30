"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-center",
        style: {
          padding: "16px",
          color: "#fff",
          background: "#333",
          borderRadius: "8px",
        },
      }}
    />
  );
}
