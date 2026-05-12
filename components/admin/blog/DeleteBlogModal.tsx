import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDelete } from "@/hooks/swr/useDelete";
import { IBlog } from "@/types";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";
import { mutate } from "swr";

interface DeleteBlogModalProps {
  blog: IBlog;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteBlogModal({
  blog,
  open,
  onOpenChange,
}: DeleteBlogModalProps) {
  const { mutate: deleteBlog, isLoading } = useDelete(
    `/blog`,
  );

  const handleDelete = async (blog: IBlog) => {
    try {
      const res = await deleteBlog(blog.slug);

      if (res?.success) {
        notify.success("Blog deleted successfully");
        mutate(
          (key) => {
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/blog")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/blog")
            );
          },
          undefined,
          { revalidate: true },
        );

        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      notify.error("An error occurred while deleting the blog");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{blog.title}"? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(blog)}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            Delete Blog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}