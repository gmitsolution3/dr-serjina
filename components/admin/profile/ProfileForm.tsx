"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DiamondPlusIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { IProfile } from "@/types";
import { usePatch } from "@/hooks/swr/usePatch";
import { notify } from "@/utils/notify";
import { mutate } from "swr";
import { ImageUploader } from "@/components/ImageUploader";

// Define the form schema with objects for string arrays
const profileSchema = z.object({
  name: z.object({
    english: z.string().min(1, "English name is required"),
    bangla: z.string().min(1, "Bangla name is required"),
  }),
  specializedIn: z.string().min(1, "Specialization is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  educationalQualification: z.array(z.object({
    value: z.string().min(1, "Qualification is required"),
  })),
  profileImage: z.string().optional(),
  profileImagePublicId: z.string().optional(),
  contactNumbers: z.array(z.object({
    number: z.string().min(1, "Phone number is required"),
    isPrimary: z.boolean(),
  })),
  chamber: z.array(z.object({
    name: z.string().min(1, "Chamber name is required"),
    location: z.string().min(1, "Location is required"),
    designation: z.string().min(1, "Designation is required"),
    isPrimary: z.boolean(),
  })),
  chamberTime: z.string().min(1, "Chamber time is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  onlineConsultancyTime: z.string().min(1, "Online consultancy time is required"),
  specialTrainings: z.array(z.object({
    value: z.string().min(1, "Training is required"),
  })),
  specializations: z.array(z.object({
    value: z.string().min(1, "Specialization is required"),
  })),
  stats: z.object({
    serviceProvided: z.number(),
    yearsOfExperience: z.number(),
    criticalProblemSolved: z.number(),
    professionalTraining: z.number(),
  }),
  socialLinks: z.array(z.object({
    name: z.string().min(1, "Platform name is required"),
    url: z.string().url("Must be a valid URL"),
  })),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface IProps {
  profileData: IProfile;
  onSuccess: () => void;
  onCancel: () => void;
}

// Helper function to convert string array to object array
const stringToObjectArray = (strings: string[] = []) => {
  return strings.map(str => ({ value: str }));
};

// Helper function to convert object array to string array
const objectToStringArray = (objects: { value: string }[] = []) => {
  return objects.map(obj => obj.value);
};

export default function ProfileForm({ profileData, onSuccess, onCancel }: IProps) {
  const [imageUrl, setImageUrl] = useState(profileData.profileImage || "");
  const [imagePublicId, setImagePublicId] = useState(profileData.profileImagePublicId || "");

  const { mutate: updateProfile, isLoading } = usePatch(`/profile`);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profileData.name,
      specializedIn: profileData.specializedIn,
      shortDescription: profileData.shortDescription,
      longDescription: profileData.longDescription,
      educationalQualification: stringToObjectArray(profileData.educationalQualification),
      profileImage: profileData.profileImage || "",
      profileImagePublicId: profileData.profileImagePublicId || "",
      contactNumbers: profileData.contactNumbers || [{ number: "", isPrimary: false }],
      chamber: profileData.chamber || [{ name: "", location: "", designation: "", isPrimary: false }],
      chamberTime: profileData.chamberTime || "",
      appointmentTime: profileData.appointmentTime || "",
      onlineConsultancyTime: profileData.onlineConsultancyTime || "",
      specialTrainings: stringToObjectArray(profileData.specialTrainings),
      specializations: stringToObjectArray(profileData.specializations),
      stats: profileData.stats || {
        serviceProvided: 0,
        yearsOfExperience: 0,
        criticalProblemSolved: 0,
        professionalTraining: 0,
      },
      socialLinks: profileData.socialLinks || [{ name: "", url: "" }],
    },
  });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control,
    name: "educationalQualification",
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "contactNumbers",
  });

  const {
    fields: chamberFields,
    append: appendChamber,
    remove: removeChamber,
  } = useFieldArray({
    control,
    name: "chamber",
  });

  const {
    fields: trainingFields,
    append: appendTraining,
    remove: removeTraining,
  } = useFieldArray({
    control,
    name: "specialTrainings",
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specializations",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name,
        specializedIn: profileData.specializedIn,
        shortDescription: profileData.shortDescription,
        longDescription: profileData.longDescription,
        educationalQualification: stringToObjectArray(profileData.educationalQualification),
        profileImage: profileData.profileImage || "",
        profileImagePublicId: profileData.profileImagePublicId || "",
        contactNumbers: profileData.contactNumbers || [{ number: "", isPrimary: false }],
        chamber: profileData.chamber || [{ name: "", location: "", designation: "", isPrimary: false }],
        chamberTime: profileData.chamberTime || "",
        appointmentTime: profileData.appointmentTime || "",
        onlineConsultancyTime: profileData.onlineConsultancyTime || "",
        specialTrainings: stringToObjectArray(profileData.specialTrainings),
        specializations: stringToObjectArray(profileData.specializations),
        stats: profileData.stats || {
          serviceProvided: 0,
          yearsOfExperience: 0,
          criticalProblemSolved: 0,
          professionalTraining: 0,
        },
        socialLinks: profileData.socialLinks || [{ name: "", url: "" }],
      });
      setImageUrl(profileData.profileImage || "");
      setImagePublicId(profileData.profileImagePublicId || "");
    }
  }, [profileData, reset]);

  const handleImageChange = (url: string, public_id: string) => {
    setImageUrl(url);
    setImagePublicId(public_id);
    setValue("profileImage", url);
    setValue("profileImagePublicId", public_id);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    // Convert object arrays back to string arrays for API
    const payload = {
      name: data.name,
      specializedIn: data.specializedIn,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      educationalQualification: objectToStringArray(data.educationalQualification),
      profileImage: imageUrl,
      profileImagePublicId: imagePublicId,
      contactNumbers: data.contactNumbers,
      chamber: data.chamber,
      chamberTime: data.chamberTime,
      appointmentTime: data.appointmentTime,
      onlineConsultancyTime: data.onlineConsultancyTime,
      specialTrainings: objectToStringArray(data.specialTrainings),
      specializations: objectToStringArray(data.specializations),
      stats: data.stats,
      socialLinks: data.socialLinks,
    };

    try {
      const res = await updateProfile({
        id: "",
        data: payload,
      });

      if (res?.success) {
        notify.success("Profile updated successfully");
        mutate(
          (key) => {
            if (Array.isArray(key)) {
              return typeof key[0] === "string" && key[0].startsWith("/profile");
            }
            return typeof key === "string" && key.startsWith("/profile");
          },
          undefined,
          { revalidate: true },
        );
        onSuccess();
      } else {
        notify.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify.error("An error occurred while updating the profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your basic profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name.english">Name (English)</FieldLabel>
              <FieldContent>
                <Input
                  id="name.english"
                  {...register("name.english")}
                  disabled={isLoading}
                />
              </FieldContent>
              {errors.name?.english && <FieldError>{errors.name.english.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="name.bangla">Name (Bangla)</FieldLabel>
              <FieldContent>
                <Input
                  id="name.bangla"
                  {...register("name.bangla")}
                  disabled={isLoading}
                />
              </FieldContent>
              {errors.name?.bangla && <FieldError>{errors.name.bangla.message}</FieldError>}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="specializedIn">Specialized In</FieldLabel>
            <FieldContent>
              <Input
                id="specializedIn"
                {...register("specializedIn")}
                disabled={isLoading}
              />
            </FieldContent>
            {errors.specializedIn && <FieldError>{errors.specializedIn.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="shortDescription">Short Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="shortDescription"
                {...register("shortDescription")}
                disabled={isLoading}
                rows={2}
              />
            </FieldContent>
            {errors.shortDescription && <FieldError>{errors.shortDescription.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="longDescription">Long Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="longDescription"
                {...register("longDescription")}
                disabled={isLoading}
                rows={5}
              />
            </FieldContent>
            {errors.longDescription && <FieldError>{errors.longDescription.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Profile Image</FieldLabel>
            <FieldContent>
              <ImageUploader
                value={imageUrl}
                imagePublicId={imagePublicId}
                onChange={handleImageChange}
              />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      {/* Educational Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle>Educational Qualifications</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {eduFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`educationalQualification.${index}.value`)}
                disabled={isLoading}
                placeholder="e.g., MBBS - Comilla Medical College"
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeEdu(index)}
                disabled={isLoading}
              >
                <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendEdu({ value: "" })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Qualification
          </Button>
          {errors.educationalQualification && (
            <FieldError>Please add at least one qualification</FieldError>
          )}
        </CardContent>
      </Card>

      {/* Contact Numbers */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Numbers</CardTitle>
          <CardDescription>Add your contact numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  {...register(`contactNumbers.${index}.number`)}
                  disabled={isLoading}
                  placeholder="Phone number"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    {...register(`contactNumbers.${index}.isPrimary`)}
                    disabled={isLoading}
                  />
                  Primary
                </label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeContact(index)}
                  disabled={isLoading}
                >
                  <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendContact({ number: "", isPrimary: false })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Contact Number
          </Button>
        </CardContent>
      </Card>

      {/* Chamber Information */}
      <Card>
        <CardHeader>
          <CardTitle>Chamber Information</CardTitle>
          <CardDescription>Add your chamber details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {chamberFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-lg space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  {...register(`chamber.${index}.name`)}
                  disabled={isLoading}
                  placeholder="Chamber name"
                />
                <Input
                  {...register(`chamber.${index}.location`)}
                  disabled={isLoading}
                  placeholder="Location"
                />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    {...register(`chamber.${index}.designation`)}
                    disabled={isLoading}
                    placeholder="Designation"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...register(`chamber.${index}.isPrimary`)}
                      disabled={isLoading}
                    />
                    Primary
                  </label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeChamber(index)}
                    disabled={isLoading}
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendChamber({ name: "", location: "", designation: "", isPrimary: false })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Chamber
          </Button>
        </CardContent>
      </Card>

      {/* Timings */}
      <Card>
        <CardHeader>
          <CardTitle>Timings</CardTitle>
          <CardDescription>Set your availability timings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="chamberTime">Chamber Time</FieldLabel>
            <FieldContent>
              <Input
                id="chamberTime"
                {...register("chamberTime")}
                disabled={isLoading}
                placeholder="e.g., Saturday - Wednesday, 5:00 PM - 8:30 PM"
              />
            </FieldContent>
            {errors.chamberTime && <FieldError>{errors.chamberTime.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="appointmentTime">Appointment Time</FieldLabel>
            <FieldContent>
              <Input
                id="appointmentTime"
                {...register("appointmentTime")}
                disabled={isLoading}
                placeholder="e.g., 11:00 AM - 11:00 PM"
              />
            </FieldContent>
            {errors.appointmentTime && <FieldError>{errors.appointmentTime.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="onlineConsultancyTime">Online Consultancy Time</FieldLabel>
            <FieldContent>
              <Input
                id="onlineConsultancyTime"
                {...register("onlineConsultancyTime")}
                disabled={isLoading}
                placeholder="e.g., Available on request"
              />
            </FieldContent>
            {errors.onlineConsultancyTime && <FieldError>{errors.onlineConsultancyTime.message}</FieldError>}
          </Field>
        </CardContent>
      </Card>

      {/* Special Trainings */}
      <Card>
        <CardHeader>
          <CardTitle>Special Trainings</CardTitle>
          <CardDescription>Add your specialized training</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`specialTrainings.${index}.value`)}
                disabled={isLoading}
                placeholder="e.g., Neurophysiology (EEG)"
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeTraining(index)}
                disabled={isLoading}
              >
                <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTraining({ value: "" })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Training
          </Button>
        </CardContent>
      </Card>

      {/* Specializations */}
      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
          <CardDescription>Add your areas of specialization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {specFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`specializations.${index}.value`)}
                disabled={isLoading}
                placeholder="e.g., Epilepsy"
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSpec(index)}
                disabled={isLoading}
              >
                <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSpec({ value: "" })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Specialization
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Update your professional statistics</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="stats.serviceProvided">Services Provided</FieldLabel>
            <FieldContent>
              <Input
                id="stats.serviceProvided"
                type="number"
                {...register("stats.serviceProvided", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="stats.yearsOfExperience">Years of Experience</FieldLabel>
            <FieldContent>
              <Input
                id="stats.yearsOfExperience"
                type="number"
                {...register("stats.yearsOfExperience", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="stats.criticalProblemSolved">Critical Problems Solved</FieldLabel>
            <FieldContent>
              <Input
                id="stats.criticalProblemSolved"
                type="number"
                {...register("stats.criticalProblemSolved", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="stats.professionalTraining">Professional Training</FieldLabel>
            <FieldContent>
              <Input
                id="stats.professionalTraining"
                type="number"
                {...register("stats.professionalTraining", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialFields.map((field, index) => (
            <div key={field.id} className="grid md:grid-cols-2 gap-3">
              <Input
                {...register(`socialLinks.${index}.name`)}
                disabled={isLoading}
                placeholder="Platform name (e.g., Facebook)"
              />
              <div className="flex gap-2">
                <Input
                  {...register(`socialLinks.${index}.url`)}
                  disabled={isLoading}
                  placeholder="Profile URL"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSocial(index)}
                  disabled={isLoading}
                >
                  <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSocial({ name: "", url: "" })}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={DiamondPlusIcon} className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
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
  );
}