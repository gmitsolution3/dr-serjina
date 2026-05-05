import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar03Icon,
  Refresh04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface IProps {
  refetch: () => void;
}

export default function AppointmentEmpty({
  refetch,
}: IProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">Appointments</CardTitle>
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <HugeiconsIcon
                icon={Refresh04Icon}
                className="h-4 w-4"
              />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <HugeiconsIcon
                icon={Calendar03Icon}
                className="h-10 w-10 text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Appointments Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              No appointments have been booked yet. Appointments will appear here once patients book them.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}