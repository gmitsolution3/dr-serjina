import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/utils";
import { IService } from "@/types";
import { ImageIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface IProps {
  service: IService;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewServiceModal({
  service,
  open,
  onOpenChange,
}: IProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-sm">{service.name}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Image</p>
            {service.imageUrl ? (
              <div className="space-y-2">
                <div className="relative w-full h-32 rounded-md border overflow-hidden bg-muted">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {!service.imageUrl && (
                    <div className="flex items-center justify-center h-full">
                      <HugeiconsIcon icon={ImageIcon} className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No image provided</p>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">ID</p>
            <p className="text-sm font-mono">{service._id}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Created At</p>
            <p className="text-sm">{formatDate(service.createdAt)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Updated At</p>
            <p className="text-sm">{formatDate(service.updatedAt)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}