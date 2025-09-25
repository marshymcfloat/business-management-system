import BookButton from "@/components/authenticated/dashboard/BookButton";
import DashboardChart from "@/components/authenticated/dashboard/DashboardChart";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <>
      <h1 className="text-2xl">
        Hi, <span className="font-medium">Marshymcfloat</span>{" "}
      </h1>

      <Card className="w-[420px]">
        <DashboardChart />
      </Card>
      <BookButton />
    </>
  );
};

export default DashboardPage;
