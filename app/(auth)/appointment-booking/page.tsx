"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Hugeicons
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Building01Icon,
  Calendar01Icon,
  CallIcon,
  Clock01Icon,
  Location01Icon,
  Mail01Icon,
  StethoscopeIcon,
  UserIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// Shadcn/ui components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Custom hook for posting data
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/notify";

// Zod validation schema
const appointmentSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  email: z.string().email("সঠিক ইমেল ঠিকানা দিন"),
  phone: z
    .string()
    .regex(
      /^(01[3-9]\d{8})$|^(\+8801[3-9]\d{8})$/,
      "সঠিক ফোন নম্বর দিন",
    ),
  dob: z.date({
    message: "জন্ম তারিখ নির্বাচন করুন",
  }),
  age: z.string().optional(),
  gender: z.enum(["male", "female", "other"], {
    message: "লিঙ্গ নির্বাচন করুন",
  }),
  address: z.string().min(5, "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে"),
  consultancyMethod: z.enum(["online", "offline"], {
    message: "পরামর্শ পদ্ধতি নির্বাচন করুন",
  }),
  disease: z.string().min(2, "রোগের বিবরণ দিন"),
  appointmentDate: z.date({
    message: "অ্যাপয়েন্টমেন্টের তারিখ ও সময় নির্বাচন করুন",
  }),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

// Available time slots
const timeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
];

export default function AppointmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createAppointment } = usePost("/appointment", {
    revalidateKey: "/appointment",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      address: "",
      consultancyMethod: "offline",
      disease: "",
    },
  });

  // Watch values for reactive updates
  const dob = watch("dob");
  const consultancyMethod = watch("consultancyMethod");
  const appointmentDate = watch("appointmentDate");

  // Calculate age when DOB changes
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob.toISOString(),
      age: calculateAge(data.dob),
      gender: data.gender,
      address: data.address,
      consultancyMethod: data.consultancyMethod,
      disease: data.disease,
      appointmentDate: data.appointmentDate.toISOString(),
    };

    try {
      await createAppointment(payload, {
        onSuccess: () => {
          notify.success("অ্যাপয়েন্টমেন্ট সফলভাবে সম্পন্ন হয়েছে!");
          router.push("/");
        },
        onError: (error: any) => {
          notify.error(
            error?.response?.data?.message ||
              "অ্যাপয়েন্টমেন্ট করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
          );
        },
      });
    } catch (error) {
      notify.error("কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary rounded-t-2xl p-4 mb-4">
            <HugeiconsIcon
              icon={Calendar01Icon}
              size={40}
              color="#F8F329"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            অ্যাপয়েন্টমেন্ট বুক করুন
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার প্রয়োজনীয় তথ্য দিয়ে ফর্মটি পূরণ করুন
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="mb-6">
          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="bg-primary"
          >
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
              className="rotate-180"
            />
            হোমপেজে ফিরুন
          </Button>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl p-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet>
                <FieldLegend>ব্যক্তিগত তথ্য</FieldLegend>
                <FieldDescription>
                  আপনার ব্যক্তিগত তথ্য সঠিকভাবে পূরণ করুন
                </FieldDescription>

                <FieldGroup>
                  {/* Full Name */}
                  <Field>
                    <FieldLabel
                      htmlFor="name"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={UserIcon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      পূর্ণ নাম{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="আপনার নাম লিখুন"
                      autoComplete="off"
                      className="p-5"
                    />
                    {errors.name && (
                      <FieldError>{errors.name.message}</FieldError>
                    )}
                  </Field>

                  {/* Email */}
                  <Field>
                    <FieldLabel
                      htmlFor="email"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      ইমেল ঠিকানা{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      autoComplete="off"
                      className="p-5"
                    />
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </Field>

                  {/* Phone */}
                  <Field>
                    <FieldLabel
                      htmlFor="phone"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={CallIcon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      ফোন নম্বর{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="017XXXXXXXX"
                      autoComplete="off"
                      className="p-5"
                    />
                    {errors.phone && (
                      <FieldError>{errors.phone.message}</FieldError>
                    )}
                  </Field>

                  {/* Date of Birth */}
                  <Field>
                    <FieldLabel
                      htmlFor="dob"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      জন্ম তারিখ{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full text-left font-normal justify-start p-5 ${
                            !dob && "text-muted-foreground"
                          }`}
                        >
                          {dob ? (
                            format(dob, "dd MMMM, yyyy")
                          ) : (
                            <span>তারিখ নির্বাচন করুন</span>
                          )}
                          <HugeiconsIcon
                            icon={Calendar01Icon}
                            className="ml-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={dob}
                          onSelect={(date) => {
                            setValue("dob", date as Date);
                            trigger("dob");
                          }}
                          disabled={(date) =>
                            date > new Date() ||
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dob && (
                      <FieldError>{errors.dob.message}</FieldError>
                    )}
                  </Field>

                  {/* Gender */}
                  <Field>
                    <FieldLabel
                      htmlFor="gender"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={UserIcon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      লিঙ্গ <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      onValueChange={(value) => {
                        setValue("gender", value as any);
                        trigger("gender");
                      }}
                      defaultValue={watch("gender")}
                    >
                      <SelectTrigger className="p-5">
                        <SelectValue placeholder="নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">পুরুষ</SelectItem>
                        <SelectItem value="female">মহিলা</SelectItem>
                        <SelectItem value="other">
                          অন্যান্য
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <FieldError>{errors.gender.message}</FieldError>
                    )}
                  </Field>

                  {/* Address */}
                  <Field>
                    <FieldLabel
                      htmlFor="address"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={Location01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      ঠিকানা <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Textarea
                      id="address"
                      {...register("address")}
                      placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                      className="resize-none p-5 h-[100px]"
                      rows={3}
                    />
                    {errors.address && (
                      <FieldError>
                        {errors.address.message}
                      </FieldError>
                    )}
                  </Field>

                  {/* Consultancy Method */}
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Video01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      পরামর্শ পদ্ধতি{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("consultancyMethod", value as any);
                        trigger("consultancyMethod");
                      }}
                      defaultValue={consultancyMethod}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="online"
                          id="online"
                          className="p-2"
                        />
                        <label
                          htmlFor="online"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <HugeiconsIcon
                            icon={Video01Icon}
                            size={18}
                            color="currentColor"
                            strokeWidth={1.5}
                          />
                          অনলাইন
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="offline"
                          id="offline"
                          className="p-2"
                        />
                        <label
                          htmlFor="offline"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <HugeiconsIcon
                            icon={Building01Icon}
                            size={18}
                            color="currentColor"
                            strokeWidth={1.5}
                          />
                          অফলাইন (চেম্বার)
                        </label>
                      </div>
                    </RadioGroup>
                    {errors.consultancyMethod && (
                      <FieldError>
                        {errors.consultancyMethod.message}
                      </FieldError>
                    )}
                  </Field>

                  {/* Disease Description */}
                  <Field>
                    <FieldLabel
                      htmlFor="disease"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={StethoscopeIcon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      রোগের বিবরণ{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Textarea
                      id="disease"
                      {...register("disease")}
                      placeholder="আপনার রোগের লক্ষণ ও বিবরণ লিখুন"
                      className="resize-none p-5 h-[150px]"
                      rows={6}
                    />
                    <FieldDescription>
                      আপনার সমস্যা সম্পর্কে বিস্তারিত জানাতে পারেন
                    </FieldDescription>
                    {errors.disease && (
                      <FieldError>
                        {errors.disease.message}
                      </FieldError>
                    )}
                  </Field>

                  {/* Appointment Date & Time */}
                  <Field>
                    <FieldLabel
                      htmlFor="appointmentDate"
                      className="flex items-center gap-2"
                    >
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      অ্যাপয়েন্টমেন্টের তারিখ ও সময়{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full text-left font-normal p-5 justify-start ${
                            !appointmentDate &&
                            "text-muted-foreground"
                          }`}
                        >
                          {appointmentDate ? (
                            format(
                              appointmentDate,
                              "dd MMMM, yyyy - hh:mm a",
                            )
                          ) : (
                            <span>তারিখ ও সময় নির্বাচন করুন</span>
                          )}
                          <HugeiconsIcon
                            icon={Calendar01Icon}
                            className="ml-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full p-0"
                        align="start"
                      >
                        <Calendar
                          className="w-full"
                          mode="single"
                          selected={appointmentDate}
                          onSelect={(date) => {
                            if (date) {
                              const currentValue = appointmentDate;
                              const newDate = new Date(date);
                              if (currentValue) {
                                newDate.setHours(
                                  currentValue.getHours(),
                                );
                                newDate.setMinutes(
                                  currentValue.getMinutes(),
                                );
                              } else {
                                newDate.setHours(10, 0);
                              }
                              setValue("appointmentDate", newDate);
                              trigger("appointmentDate");
                            }
                          }}
                          disabled={(date) =>
                            date <
                            new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                        <div className="border-t p-3">
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const selectedDate =
                                    appointmentDate || new Date();
                                  const [hour, minute, period] =
                                    time
                                      .match(/(\d+):(\d+)\s*(AM|PM)/)
                                      ?.slice(1) || [];
                                  let hours = parseInt(hour);
                                  if (period === "PM" && hours !== 12)
                                    hours += 12;
                                  if (period === "AM" && hours === 12)
                                    hours = 0;
                                  selectedDate.setHours(
                                    hours,
                                    parseInt(minute),
                                    0,
                                  );
                                  setValue(
                                    "appointmentDate",
                                    selectedDate,
                                  );
                                  trigger("appointmentDate");
                                }}
                                className="text-xs"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {errors.appointmentDate && (
                      <FieldError>
                        {errors.appointmentDate.message}
                      </FieldError>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>

              {/* Submit Button */}
              <div className="flex justify-center pt-8 mt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "অপেক্ষা করুন..."
                  ) : (
                    <>
                      অ্যাপয়েন্টমেন্ট বুক করুন
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={18}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={24}
                color="#F8F329"
                strokeWidth={1.5}
                className="mx-auto mb-2"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                চেম্বার সময়
              </p>
              <p className="font-semibold">শনি, সোম, বুধবার</p>
              <p className="text-sm">সন্ধ্যা ৭টা - রাত ৯টা</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <HugeiconsIcon
                icon={CallIcon}
                size={24}
                color="#F8F329"
                strokeWidth={1.5}
                className="mx-auto mb-2"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                জরুরী যোগাযোগ
              </p>
              <p className="font-semibold">+8801339511108</p>
              <p className="text-sm">সকাল ১১টা - রাত ১১টা</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <HugeiconsIcon
                icon={Video01Icon}
                size={24}
                color="#F8F329"
                strokeWidth={1.5}
                className="mx-auto mb-2"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                অনলাইন কনসালটেশন
              </p>
              <p className="font-semibold">সকাল ১১টা - রাত ১১টা</p>
              <p className="text-sm">শনি-শুক্র</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
