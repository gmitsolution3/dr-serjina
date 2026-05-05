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
import { IService } from "@/types";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";
import { mutate } from "swr";

interface DeleteServiceModalProps {
  service: IService;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteServiceModal({
  service,
  open,
  onOpenChange,
}: DeleteServiceModalProps) {
  const { mutate: deleteService, isLoading } = useDelete(
    `/treatment-service`,
  );

  const handleDelete = async (service: IService) => {
    try {
      const res = await deleteService(service._id);

      if (res?.success) {
        notify.success("Service deleted successfully");
        mutate(
          (key) => {
            // SWR cache keys with params are often arrays
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/treatment-service")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/treatment-service")
            );
          },
          undefined,
          { revalidate: true },
        );

        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      notify.error("An error occurred while deleting the service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{service.name}"? This
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
            onClick={() => handleDelete(service)}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}