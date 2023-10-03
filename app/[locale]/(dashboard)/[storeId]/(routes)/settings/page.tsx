import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import SettingsForm from "@/app/[locale]/(dashboard)/[storeId]/(routes)/settings/SettingsForm";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage = async ({ params: { storeId } }: SettingsPageProps) => {
  const { userId } = auth();
  const store = await prismadb.store.findFirst({
    where: {
      id: String(storeId),
      userId: String(userId),
    },
  });

  return (
    <>
        <SettingsForm store={store}/>
    </>
  );
};

export default SettingsPage;
