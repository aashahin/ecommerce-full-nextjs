"use client";

import React from "react";
import { Store } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTranslations } from "next-intl";
import useRouter from "@/hooks/use-router";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

const StoreSwitcher = ({ className, stores = [] }: StoreSwitcherProps) => {
  const t = useTranslations("Index");
  const storeModal = useStoreModal();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const selectedStore = formattedStores.find(
    (store) => String(store.value) === params.storeId,
  );

  const onStoreChange = (value: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${value.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select store"
          className={cn("py-5 px-3 flex gap-2 justify-between", className)}
        >
          <StoreIcon className="w-5 h-5 text-teal-900" />
          <div className="text-bold">{selectedStore?.label}</div>
          <ChevronsUpDown className="w-5 h-5 text-teal-900 ms-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 mx-4">
        <Command>
          <CommandList>
            <CommandInput placeholder={t("searchHere")} />
            <CommandEmpty>{t("notFound")}</CommandEmpty>
            <CommandGroup heading={t("stores")}>
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreChange(Object(store))}
                  className="cursor-pointer"
                >
                  <StoreIcon className="me-2 w-5 h-5 text-teal-900" />
                  {store.label}
                  <Check
                    className={cn(
                      "w-5 h-5 text-teal-900 ms-auto",
                      selectedStore?.value === store.value ? "block" : "hidden",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                storeModal.onOpen();
              }}
              className="cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 me-2 text-teal-900" />
              {t("createStore")}
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
