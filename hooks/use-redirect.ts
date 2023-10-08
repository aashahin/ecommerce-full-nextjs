import { redirect } from "next/navigation";
import {defaultLocale} from "@/middleware";

export default function Redirect({
  to,
  locale,
}: {
  to: string;
  locale?: string;
}) {
  return redirect(locale === defaultLocale ? to : `/${locale}${to}`);
}
