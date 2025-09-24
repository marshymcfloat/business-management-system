import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({ title }: { title: string }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle className="capitalize">{title}</CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default StatCard;
