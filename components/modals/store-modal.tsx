"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3),
});

export const StoreModal = () => {
  const t = useTranslations("Index");
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/stores", values);

      toast.success(t("successStoreModal"));
      return window.location.assign(`/${res.data.id}`);
    } catch (e: object | any) {
      if (e.response.data === "Store already exists") {
        return toast.error(t("storeExists"));
      }
      return toast.error(t("errorStoreModal"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={t("titleStoreModal")}
      description={t("descStoreModal")}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name={"name"}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("nameStoreModal")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("nameStoreModal")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4 space-x-2 flex justify-end gap-2">
            <Button
              disabled={loading}
              variant="outline"
              onClick={storeModal.onClose}
            >
              {t("cancel")}
            </Button>
            <Button disabled={loading} type="submit">
              {t("create")}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
