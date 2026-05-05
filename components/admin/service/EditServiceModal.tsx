"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePatch } from "@/hooks/swr/usePatch";
import { deleteImage } from "@/utils";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";
import { ImageUploader } from "@/components/ImageUploader";

interface IServiceType {
  _id: string;
  name: string;
  imageUrl: string;
  public_id?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the form schema with zod
const editServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  imageUrl: z.string().optional(),
  public_id: z.string().optional(),
});

type EditServiceFormValues = z.infer<typeof editServiceSchema>;

interface EditServiceModalProps {
  service: IServiceType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditServiceModal({
  service,
  open,
  onOpenChange,
}: EditServiceModalProps) {
  const [imageUrl, setImageUrl] = useState(service.imageUrl || "");
  const [publicId, setPublicId] = useState(service.public_id || "");
  const [oldPublicId, setOldPublicId] = useState(
    service.public_id || "",
  );

  const { mutate: updateService, isLoading } = usePatch(
    `/treatment-service`,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<EditServiceFormValues>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      name: service.name,
      imageUrl: service.imageUrl,
      public_id: service.public_id,
    },
  });

  // Reset form when modal opens with new data
  useEffect(() => {
    if (open) {
      reset({
        name: service.name,
        imageUrl: service.imageUrl,
        public_id: service.public_id,
      });
      setImageUrl(service.imageUrl || "");
      setPublicId(service.public_id || "");
      setOldPublicId(service.public_id || "");
    }
  }, [open, service, reset]);

  const handleImageChange = (url: string, public_id: string) => {
    setImageUrl(url);
    setPublicId(public_id);
    setValue("imageUrl", url);
    setValue("public_id", public_id);
  };

  const onSubmit = async (data: EditServiceFormValues) => {
    // Prepare payload with imageUrl and public_id
    const payload = {
      name: data.name,
      imageUrl: imageUrl,
      public_id: publicId,
    };

    try {
      const res = await updateService({
        id: service._id,
        data: payload,
      });

      if (res?.success) {
        // If image was changed, delete the old image from cloudinary
        if (oldPublicId && oldPublicId !== publicId) {
          await deleteImage(oldPublicId);
        }

        notify.success("Service updated successfully");

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
        notify.error(res?.message || "Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      notify.error("An error occurred while updating the service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  placeholder="Enter service name"
                  {...register("name")}
                  disabled={isLoading}
                  className="p-5"
                  aria-invalid={!!errors.name}
                />
              </FieldContent>
              {errors.name && (
                <FieldError>{errors.name.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Service Image</FieldLabel>
              <FieldContent>
                <ImageUploader
                  value={imageUrl}
                  imagePublicId={publicId}
                  onChange={handleImageChange}
                />
              </FieldContent>
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
