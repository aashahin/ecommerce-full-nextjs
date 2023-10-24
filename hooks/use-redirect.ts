import { redirect } from "next/navigation";
import {useLocale} from 'next-intl';


export default function Redirect({
  to,
  locale,
}: {
  to: string;
  locale?: string;
}) {
  const defaultLocale = useLocale();
  return redirect(locale === defaultLocale ? to : `/${locale}${to}`);
}
