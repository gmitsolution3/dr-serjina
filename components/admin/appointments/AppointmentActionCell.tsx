import DeleteAppointmentModal from "@/components/admin/appointments/DeleteAppointmentModal";
import ViewAppointmentModal from "@/components/admin/appointments/ViewAppointmentModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAppointment } from "@/types";
import {
  DeleteIcon,
  MoreHorizontalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

interface AppointmentActionCellProps {
  appointment: IAppointment;
}

export default function AppointmentActionCell({
  appointment,
}: AppointmentActionCellProps) {
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
          <DropdownMenuItem onClick={() => setShowViewModal(true)}>
            <HugeiconsIcon icon={ViewIcon} className="mr-2 h-4 w-4" />
            View Details
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

      <DeleteAppointmentModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        appointment={appointment}
      />

      <ViewAppointmentModal
        appointment={appointment}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />
    </>
  );
}
