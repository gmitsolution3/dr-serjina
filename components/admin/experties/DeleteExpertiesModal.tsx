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
import { IExperties } from "@/types";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";
import { mutate } from "swr";

interface DeleteExpertiesModalProps {
  experties: IExperties;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteExpertiesModal({
  experties,
  open,
  onOpenChange,
}: DeleteExpertiesModalProps) {
  const { mutate: deleteExperty, isLoading } = useDelete(
    `/treatment-experties`,
  );

  const handleDelete = async (experties: IExperties) => {
    try {
      const res = await deleteExperty(experties._id);

      if (res?.success) {
        notify.success("Experty deleted successfully");
        mutate(
          (key) => {
            // SWR cache keys with params are often arrays
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/treatment-experties")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/treatment-experties")
            );
          },
          undefined,
          { revalidate: true },
        );

        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete experty");
      }
    } catch (error) {
      console.error("Error deleting experty:", error);
      notify.error("An error occurred while deleting the experty");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Experty</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{experties.name}"? This
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
            onClick={() => handleDelete(experties)}
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
