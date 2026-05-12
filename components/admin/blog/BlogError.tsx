import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert01Icon,
  Refresh04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface IProps {
  refetch: () => void;
}

export default function BlogError({ refetch }: IProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Blog Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-destructive/10 p-3 mb-4">
              <HugeiconsIcon
                icon={Alert01Icon}
                size={24}
                strokeWidth={1.5}
                className="h-10 w-10 text-destructive"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Failed to Load Blogs
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              There was an error loading the blog data. Please
              try again.
            </p>
            <Button onClick={() => refetch()} className="gap-2">
              <HugeiconsIcon
                icon={Refresh04Icon}
                className="h-4 w-4"
              />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}