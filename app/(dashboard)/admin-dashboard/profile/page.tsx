"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/swr/useFetch";
import { IProfile } from "@/types";
import {
  EditIcon,
  EyeIcon,
  Refresh04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ProfileLoader from "@/components/admin/profile/ProfileLoader";
import ProfileError from "@/components/admin/profile/ProfileError";
import ProfileDisplay from "@/components/admin/profile/ProfileDisplay";
import ProfileForm from "@/components/admin/profile/ProfileForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, isError, refetch } = useFetch(
    "/profile",
  );

  const profileData: IProfile = data?.data;

  // Loading state
  if (isLoading) {
    return <ProfileLoader />;
  }

  // Error state
  if (isError) {
    return <ProfileError refetch={refetch} />;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">
              Profile Management
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <HugeiconsIcon
                  icon={Refresh04Icon}
                  className="h-4 w-4"
                />
                Refresh
              </Button>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                <HugeiconsIcon
                  icon={isEditing ? EyeIcon : EditIcon}
                  className="h-4 w-4"
                />
                {isEditing ? "View Mode" : "Edit Mode"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <ProfileForm 
              profileData={profileData} 
              onSuccess={() => {
                setIsEditing(false);
                refetch();
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileDisplay profileData={profileData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}