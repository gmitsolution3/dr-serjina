import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FolderOpenIcon,
  Refresh04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface IProps {
  refetch: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function ExpertiesEmpty({
  refetch,
  onOpenChange,
}: IProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">Experties</CardTitle>
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
                icon={FolderOpenIcon}
                className="h-10 w-10 text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Experties Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't created any experties yet. Get started by
              creating your first experties.
            </p>
            <Button
              onClick={() => onOpenChange(true)}
              className="gap-2"
            >
              <HugeiconsIcon
                icon={Refresh04Icon}
                className="h-4 w-4"
              />
              Create New Experties
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
