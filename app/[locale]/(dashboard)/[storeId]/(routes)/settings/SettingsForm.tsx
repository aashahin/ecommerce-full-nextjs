"use client";

import { Store } from "@prisma/client";
import Heading from "@/components/shared/Head";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import toast from "react-hot-toast";
import axios from "axios";
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { ApiAlert } from "@/components/ui/api-alert";
import { useURL } from "@/hooks/use-url";
import { AlertModal } from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";

interface SettingsFormProps {
  store: Store | any;
}

const formSchema = z.object({
  name: z.string().min(3).max(255),
});

type FormSchema = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {
  const locales = ['en', 'ar'] as const;
 const {useRouter} = createSharedPathnamesNavigation({locales});
  const t = useTranslations("Index");
  const { refresh, push } = useRouter();
  const url = useURL();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${store.id}`, data);

      toast.success(t("successUpdate"));
      return refresh();
    } catch (e) {
      return toast.error(t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${store.id}`);
      refresh();
      push('/');
      toast.success('Store deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <div className="flex flex-col mx-4">
      <div className="flex items-center justify-between p-4">
        <Heading title={t("settings")} description={t("settingsDesc")} />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit mt-4 ms-3 p-4"
        >
          <div className="grid grid-cols-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">{t("storeName")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("storeName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button variant="default" type="submit" className="mt-4">
            {t("save")}
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <ApiAlert
        title={t("apiPublic")}
        message={`${url}/api/stores/${store.id}`}
        type="public"
          />
    </div>
    </>
  );
};

export default SettingsForm;
