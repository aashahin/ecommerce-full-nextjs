"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  message: string;
  type: "public" | "private";
}

const variant: Record<ApiAlertProps["type"], BadgeProps["variant"]> = {
  public: "secondary",
  private: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, message, type }) => {
  const t = useTranslations("Index");

  const onCopy = (msg: string) => {
    navigator.clipboard.writeText(msg);
    toast.success(t("copied"));
  };
  return (
    <Alert>
      <AlertTitle className="flex items-center">
        <Server size={22} className="me-3" />
        {title}
        <Badge variant={variant[type]} className="ms-2">
          {type === "public" ? t("public") : t("private")}
        </Badge>
      </AlertTitle>
      <AlertDescription className="m-4 flex items-center justify-between">
        <code className="relative ms-4 text-sm bg-muted rounded px-[0.5rem] py-[0.5rem] font-semibold">
          {message}
        </code>
        <Button variant="outline" size="icon" onClick={() => onCopy(message)}>
          <Copy size={18} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
