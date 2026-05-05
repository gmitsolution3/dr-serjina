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
import { IAppointment } from "@/types";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";
import { mutate } from "swr";

interface DeleteAppointmentModalProps {
  appointment: IAppointment;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAppointmentModal({
  appointment,
  open,
  onOpenChange,
}: DeleteAppointmentModalProps) {
  const { mutate: deleteAppointment, isLoading } = useDelete(
    `/appointment`,
  );

  const handleDelete = async (appointment: IAppointment) => {
    try {
      const res = await deleteAppointment(appointment._id);

      if (res?.success) {
        notify.success("Appointment deleted successfully");
        mutate(
          (key) => {
            // SWR cache keys with params are often arrays
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/appointment")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/appointment")
            );
          },
          undefined,
          { revalidate: true },
        );

        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      notify.error("An error occurred while deleting the appointment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the appointment for{" "}
            <span className="font-semibold">{appointment.name}</span>? 
            This action cannot be undone.
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
            onClick={() => handleDelete(appointment)}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            Delete Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}