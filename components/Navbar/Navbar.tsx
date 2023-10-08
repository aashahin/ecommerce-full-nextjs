import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/Navbar/MainNav";
import LanguageSwitcher from "@/components/switcher/LanguageSwitcher";
import StoreSwitcher from "@/components/switcher/StoreSwitcher";
import Redirect from "@/hooks/use-redirect";
import prisma from "@/lib/prismadb";

const Navbar = async ({ locale = "ar" }: { locale: string }) => {
  const { userId } = auth();

  if (!userId) {
    return Redirect({
      to: "/login",
      locale: String(locale),
    });
  }

  const stores = await prisma.store.findMany({
    where: {
      userId: String(userId),
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center gap-2 h-16 p-4">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="flex items-center absolute end-4">
          <LanguageSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
