import BillboardForm from "./components/BillboardForm";

export default async function BillboardPage({
  params: { billboardId },
}: {
  params: { billboardId: string };
}) {
  let billboard;

  if (billboardId !== "new") {
    billboard = await prisma?.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
  }

  return (
    <div>
      <BillboardForm billboard={billboard} />
    </div>
  );
}
