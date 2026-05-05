import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProfile } from "@/types";
import {
  AwardIcon,
  BriefcaseIcon,
  CalendarIcon,
  CallIcon,
  FacebookIcon,
  GlobeIcon,
  HeartCheckIcon,
  HospitalIcon,
  LinkedinIcon,
  LocationIcon,
  Mortarboard02Icon,
  StarIcon,
  StethoscopeIcon,
  TimeIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

interface IProps {
  profileData: IProfile;
}

export default function ProfileDisplay({ profileData }: IProps) {
  const stats = [
    {
      label: "Services Provided",
      value: profileData.stats?.serviceProvided || 0,
      icon: HeartCheckIcon,
    },
    {
      label: "Years of Experience",
      value: profileData.stats?.yearsOfExperience || 0,
      icon: CalendarIcon,
    },
    {
      label: "Critical Problems Solved",
      value: profileData.stats?.criticalProblemSolved || 0,
      icon: StarIcon,
    },
    {
      label: "Professional Training",
      value: profileData.stats?.professionalTraining || 0,
      icon: Mortarboard02Icon,
    },
  ];

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return FacebookIcon;
      case "linkedin":
        return LinkedinIcon;
      default:
        return GlobeIcon;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
          {profileData.profileImage ? (
            <Image
              src={profileData.profileImage}
              alt={profileData.name.english}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <HugeiconsIcon
                icon={UserIcon}
                className="h-12 w-12 text-muted-foreground"
              />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {profileData.name.english}
          </h2>
          <p className="text-lg text-muted-foreground">
            {profileData.name.bangla}
          </p>
          <p className="text-primary font-medium mt-1">
            {profileData.specializedIn}
          </p>
          <p className="text-muted-foreground mt-2">
            {profileData.shortDescription}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <HugeiconsIcon
                    icon={stat.icon}
                    className="h-5 w-5 text-primary"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {stat.value.toLocaleString()}+
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {profileData.longDescription}
              </p>
            </CardContent>
          </Card>

          {/* Educational Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon
                  icon={Mortarboard02Icon}
                  className="h-5 w-5"
                />
                Educational Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profileData.educationalQualification?.map(
                  (edu, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-sm">{edu}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon
                  icon={StethoscopeIcon}
                  className="h-5 w-5"
                />
                Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.specializations?.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Trainings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon icon={AwardIcon} className="h-5 w-5" />
                Special Trainings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profileData.specialTrainings?.map(
                  (training, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-sm">{training}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon icon={CallIcon} className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profileData.contactNumbers?.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={CallIcon}
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span className="text-sm">{contact.number}</span>
                  </div>
                  {contact.isPrimary && (
                    <Badge variant="default" className="text-xs">
                      Primary
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chamber Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon
                  icon={HospitalIcon}
                  className="h-5 w-5"
                />
                Chamber Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.chamber?.map((chamber, index) => (
                <div
                  key={index}
                  className="border-b last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{chamber.name}</h4>
                    {chamber.isPrimary && (
                      <Badge variant="default" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={LocationIcon}
                        className="h-3 w-3 text-primary"
                      />
                      <span>{chamber.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={BriefcaseIcon}
                        className="h-3 w-3"
                      />
                      <span>{chamber.designation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon icon={TimeIcon} className="h-5 w-5" />
                Timings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Chamber Time
                </p>
                <p className="text-sm">{profileData.chamberTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Appointment Time
                </p>
                <p className="text-sm">
                  {profileData.appointmentTime}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Online Consultancy
                </p>
                <p className="text-sm">
                  {profileData.onlineConsultancyTime}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          {profileData.socialLinks &&
            profileData.socialLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {profileData.socialLinks.map((link, index) => {
                      const SocialIcon = getSocialIcon(link.name);
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                        >
                          <HugeiconsIcon
                            icon={SocialIcon}
                            className="h-5 w-5"
                          />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
}
