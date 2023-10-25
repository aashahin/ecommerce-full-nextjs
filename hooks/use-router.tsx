import { createSharedPathnamesNavigation } from "next-intl/navigation";

export default function useRouter() {
  const locales = ["en", "ar"] as const;
  const { useRouter } = createSharedPathnamesNavigation({ locales });
  return useRouter();
}
