// components/admin/experties/modals/CreateExpertiesModal.tsx
"use client";

import { useEffect } from "react";
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

// Define the form schema with zod
const createExpertiesSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
});

type CreateExpertiesFormValues = z.infer<typeof createExpertiesSchema>;

interface CreateExpertiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateExpertiesModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateExpertiesModalProps) {
  const { mutate: createExperty, isLoading } = usePost(
    "/treatment-experties",
    {
      revalidateKey: "/treatment-experties",
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExpertiesFormValues>({
    resolver: zodResolver(createExpertiesSchema),
    defaultValues: {
      name: "",
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateExpertiesFormValues) => {
    try {
      const res = await createExperty(data);

      if (res?.success) {
        notify.success("Experty created successfully");
        onOpenChange(false);
        onSuccess?.();
      } else {
        notify.error(res?.message || "Failed to create experty");
      }
    } catch (error) {
      console.error("Error creating experty:", error);
      notify.error("An error occurred while creating the experty");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Experty</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  placeholder="Enter experty name"
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
              Create Experty
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}