import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/utils";
import { IAppointment } from "@/types";
import { Badge } from "@/components/ui/badge";

interface IProps {
  appointment: IAppointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewAppointmentModal({
  appointment,
  open,
  onOpenChange,
}: IProps) {
  const getGenderLabel = (gender: string) => {
    return gender === "male" ? "Male" : gender === "female" ? "Female" : "Other";
  };

  const getConsultancyMethodBadge = (method: string) => {
    return method === "online" ? (
      <Badge variant="default" className="bg-blue-500">Online</Badge>
    ) : (
      <Badge variant="default" className="bg-green-500">Offline</Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-sm font-semibold">{appointment.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm break-all">{appointment.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-sm">{appointment.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="text-sm">{appointment.age} years</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p className="text-sm">{formatDate(appointment.dob)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-sm capitalize">{getGenderLabel(appointment.gender)}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-sm">{appointment.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Consultancy Method</p>
              <div>{getConsultancyMethodBadge(appointment.consultancyMethod)}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Disease / Condition</p>
              <p className="text-sm">{appointment.disease}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Appointment Date</p>
              <p className="text-sm font-semibold text-primary">
                {formatDate(appointment.appointmentDate)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Booked On</p>
              <p className="text-sm">{formatDate(appointment.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">ID</p>
            <p className="text-xs font-mono text-muted-foreground break-all">
              {appointment._id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}