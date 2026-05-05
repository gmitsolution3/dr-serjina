import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppointmentLoader() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Skeleton className="flex-1 h-12" />
          </div>

          {/* Table Skeleton */}
          <div className="rounded-md border overflow-x-auto">
            <div className="w-full">
              {/* Table Header */}
              <div className="bg-muted/50 border-b px-4 py-3">
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              {/* Table Rows */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="border-b px-4 py-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}