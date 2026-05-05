"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/notify";
import { ImageUploader } from "@/components/ImageUploader";

// Define the form schema with zod
const createServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  imageUrl: z.string().optional(),
  public_id: z.string().optional(),
});

type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

interface CreateServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateServiceModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateServiceModalProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const { mutate: createService, isLoading } = usePost(
    "/treatment-service",
    {
      revalidateKey: "/treatment-service",
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      public_id: "",
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      reset();
      setImageUrl("");
      setPublicId("");
    }
  }, [open, reset]);

  const handleImageChange = (url: string, public_id: string) => {
    setImageUrl(url);
    setPublicId(public_id);
    setValue("imageUrl", url);
    setValue("public_id", public_id);
  };

  const onSubmit = async (data: CreateServiceFormValues) => {
    // Prepare payload with imageUrl and public_id
    const payload = {
      name: data.name,
      imageUrl: imageUrl,
      public_id: publicId,
    };

    try {
      const res = await createService(payload);

      if (res?.success) {
        notify.success("Service created successfully");
        onOpenChange(false);
        onSuccess?.();
      } else {
        notify.error(res?.message || "Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      notify.error("An error occurred while creating the service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
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
            <Button type="submit" disabled={isLoading || !imageUrl}>
              {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              )}
              Create Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}