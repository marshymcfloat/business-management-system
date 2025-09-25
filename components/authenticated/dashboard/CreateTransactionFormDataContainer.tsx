import CreateTransactionForm from "./CreateTransactionForm";
import prisma from "@/lib/prisma/prisma";
const CreateTransactionFormDataContainer = async () => {
  const services = await prisma.serviceUnit.findMany({
    select: {
      id: true,
      branchId: true,
      title: true,
      price: true,
    },
  });
  const branches = await prisma.branch.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <div>
      <CreateTransactionForm services={services} branches={branches} />
    </div>
  );
};

export default CreateTransactionFormDataContainer;
