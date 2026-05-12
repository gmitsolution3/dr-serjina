import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DocumentAttachmentIcon,
  Refresh04Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface IProps {
  refetch: () => void;
}

export default function BlogEmpty({
  refetch,
}: IProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">Blogs</CardTitle>
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
                icon={DocumentAttachmentIcon}
                className="h-10 w-10 text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Blogs Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't created any blogs yet. Get started by
              writing your first blog post.
            </p>
            <Button asChild className="gap-2">
              <Link href="/admin-dashboard/blogs/new">
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  className="h-4 w-4"
                />
                Write New Blog
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}