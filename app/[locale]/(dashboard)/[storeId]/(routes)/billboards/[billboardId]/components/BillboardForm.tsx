"use client";

import { Billboard } from "@prisma/client";
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
import { useURL } from "@/hooks/use-url";
import { AlertModal } from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";
import useRouter from "@/hooks/use-router";
import { useParams } from "next/navigation";
import ImageUploader from "@/components/ui/image-uploader";

interface BillboardFormProps {
  billboard: Billboard | any;
}

const formSchema = z.object({
  label: z.string().min(3).max(300),
  image: z.string().min(10).max(300),
});

type FormSchema = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ billboard }) => {
  const t = useTranslations("Index");
  const { refresh, push } = useRouter();
  const params = useParams();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const title = billboard ? t("editBillboard") : t("createBillboard");
  const desc = billboard ? t("editBillboardDesc") : t("createBillboardDesc");
  const msg = billboard ? t("successUpdate") : t("successCreate");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/${billboard.storeId}/billboards/${billboard.id}`,
          data
        );
      } else {
        await axios.post(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      }
      toast.success(msg);
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
      await axios.delete(
        `/api/${billboard.storeId}/billboards/${billboard.id}`
      );
      refresh();
      push("/");
      toast.success(t("successDelete"));
    } catch (error) {
      toast.error(t("somethingWentWrong"));
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
          <Heading title={title} description={desc} />
          {billboard && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-fit mt-4 ms-3 p-4 space-y-6"
          >
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    {t("backgroundImage")}
                  </FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field?.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2">
              <FormField
                name="label"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      {t("billboardName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("billboardName")}
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
      </div>
    </>
  );
};

export default BillboardForm;
