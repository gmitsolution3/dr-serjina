// components/admin/experties/modals/EditExpertiesModal.tsx
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
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

interface IExpertiesType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Define the form schema with zod
const editExpertiesSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
});

type EditExpertiesFormValues = z.infer<typeof editExpertiesSchema>;

interface EditExpertiesModalProps {
  experties: IExpertiesType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditExpertiesModal({
  experties,
  open,
  onOpenChange,
}: EditExpertiesModalProps) {
  const { mutate: updateExperty, isLoading } = usePatch(
    `/treatment-experties`,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditExpertiesFormValues>({
    resolver: zodResolver(editExpertiesSchema),
    defaultValues: {
      name: experties.name,
    },
  });

  // Reset form when modal opens with new data
  useEffect(() => {
    if (open) {
      reset({ name: experties.name });
    }
  }, [open, experties.name, reset]);

  const onSubmit = async (data: EditExpertiesFormValues) => {
    try {
      const res = await updateExperty({
        id: experties._id,
        data,
      });

      if (res?.success) {
        notify.success("Experty updated successfully");

        mutate(
          (key) => {
            // SWR cache keys with params are often arrays
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/treatment-experties")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/treatment-experties")
            );
          },
          undefined,
          { revalidate: true },
        );
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to update experty");
      }
    } catch (error) {
      console.error("Error updating experty:", error);
      notify.error("An error occurred while updating the experty");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Experty</DialogTitle>
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
