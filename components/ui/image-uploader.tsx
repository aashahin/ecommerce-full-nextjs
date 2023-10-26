"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "next-intl";

interface ImageUploaderProps {
  onChange: (file: String) => void;
  onRemove: (file: String) => void;
  disabled?: boolean;
  value?: string[];
}

export default function ImageUploader({
  onChange,
  onRemove,
  disabled,
  value,
}: ImageUploaderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Index");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleUpload = (e: any) => {
    onChange(e.info.secure_url);
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value?.map((url: string) => (
          <div
            key={url}
            className="relative w-96 h-60 rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-0 right-0">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Image"
              objectFit="cover"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={handleUpload} uploadPreset="vbqmvfdx">
        {
            ({ open}) => {
                const onClick = () => {
                    open();
                }

                return (
                    <Button
                        type="button"
                        onClick={onClick}
                        disabled={disabled}
                        variant="secondary"
                        >
                        <ImagePlus size={18} className="me-2" />
                        {t("uploadImage")}
                    </Button>
                )
            }
        }
      </CldUploadWidget>
    </>
  );
}
