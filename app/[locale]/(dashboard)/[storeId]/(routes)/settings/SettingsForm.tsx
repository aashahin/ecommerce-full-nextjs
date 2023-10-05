"use client";

import { Store } from "@prisma/client";
import Heading from "@/components/shared/Head";
import {useTranslations} from "next-intl";

interface SettingsFormProps {
  store: Store | null;
}

const SettingsForm = ({ store }: SettingsFormProps) => {
  const t = useTranslations("Index");
  return (
    <div className="flex items-center justify-between p-4">
      <Heading title={t("settings")} description={t("settingsDesc")} />
    </div>
  );
};

export default SettingsForm;
