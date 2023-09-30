import { redirect } from "next/navigation";

export default function Redirect({
  to,
  locale,
}: {
  to: string;
  locale?: string;
}) {
  return redirect(locale === "ar" ? to : `/${locale}${to}`);
}
