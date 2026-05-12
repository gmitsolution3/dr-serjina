import DeleteBlogModal from "@/components/admin/blog/DeleteBlogModal";
// import ViewBlogModal from "@/components/admin/blog/ViewBlogModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBlog } from "@/types";
import {
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

interface BlogActionCellProps {
  blog: IBlog;
}

export default function BlogActionCell({
  blog,
}: BlogActionCellProps) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <HugeiconsIcon
              icon={MoreHorizontalIcon}
              className="h-4 w-4"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/admin-dashboard/blogs/edit/${blog._id}`}>
              <HugeiconsIcon
                icon={ViewIcon}
                className="mr-2 h-4 w-4"
              />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin-dashboard/blogs/edit/${blog.slug}`}>
              <HugeiconsIcon
                icon={EditIcon}
                className="mr-2 h-4 w-4"
              />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <HugeiconsIcon
              icon={DeleteIcon}
              className="mr-2 h-4 w-4"
            />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBlogModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        blog={blog}
      />

      {/* <ViewBlogModal
        blog={blog}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      /> */}
    </>
  );
}
