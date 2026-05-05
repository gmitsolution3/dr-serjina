import DeleteServiceModal from "@/components/admin/service/DeleteServiceModal";
import EditServiceModal from "@/components/admin/service/EditServiceModal";
import ViewServiceModal from "@/components/admin/service/ViewServiceModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IService } from "@/types";
import {
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

interface ServiceActionCellProps {
  service: IService;
}

export default function ServiceActionCell({
  service,
}: ServiceActionCellProps) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <HugeiconsIcon icon={EditIcon} className="mr-2 h-4 w-4" />
            Edit
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

      <DeleteServiceModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        service={service}
      />

      <ViewServiceModal
        service={service}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <EditServiceModal
        service={service}
        open={showEditModal}
        onOpenChange={setShowEditModal}
      />
    </>
  );
}