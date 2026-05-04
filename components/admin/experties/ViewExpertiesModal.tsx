import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/utils";
import { IExperties } from "@/types";

interface IProps {
  experties: IExperties;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewExpertiesModal({
  experties,
  open,
  onOpenChange,
}: IProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Experty Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-sm">{experties.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">ID</p>
            <p className="text-sm font-mono">{experties._id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Created At</p>
            <p className="text-sm">{formatDate(experties.createdAt)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Updated At</p>
            <p className="text-sm">{formatDate(experties.updatedAt)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}