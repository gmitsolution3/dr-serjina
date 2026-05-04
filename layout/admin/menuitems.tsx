// config/dashboardMenu.ts
import { DashboardMenu } from "@/utils/dashboardMenu";
import {
  BringToFrontIcon,
  File01Icon,
  GraduationScrollIcon,
  Layout01Icon,
  LeftToRightListBulletIcon,
  PackageOpenIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

const baseDashboardUrl = "/admin-dashboard";
const dashboardMenu = new DashboardMenu(baseDashboardUrl);

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: dashboardMenu.defineUrl("/"),
    icon: Layout01Icon,
  },
  // {
  //   title: "Recent Activities",
  //   url: "/appointments",
  //   icon: Calendar01Icon,
  // },
  // { title: "Notifications", url: "/patients", icon: UserGroupIcon },
];

export const courseManagement = [
  {
    title: "Category Management",
    url: dashboardMenu.defineUrl("/category-management"),
    icon: BringToFrontIcon,
  },
  {
    title: "Courses Management",
    url: dashboardMenu.defineUrl("/course-management"),
    icon: GraduationScrollIcon,
  },
  {
    title: "Batch Management",
    url: dashboardMenu.defineUrl("/batch-management"),
    icon: LeftToRightListBulletIcon,
  },
  {
    title: "Published Course",
    url: dashboardMenu.defineUrl("/published-courses"),
    icon: File01Icon,
  },
  {
    title: "Draft Course",
    url: dashboardMenu.defineUrl("/draft-courses"),
    icon: PackageOpenIcon,
  },
  // {
  //   title: "Course Curriculmn",
  //   url: dashboardMenu.defineUrl("/records"),
  //   icon: File01Icon,
  // },
];

export const userManagement = [
  {
    title: "User Management",
    url: dashboardMenu.defineUrl("/user-management"),
    icon: UserGroupIcon,
  },
  {
    title: "Students",
    url: dashboardMenu.defineUrl("/students"),
    icon: UserGroupIcon,
  },
  /* {
    title: "Instructors",
    url: dashboardMenu.defineUrl("/instructors"),
    icon: UserGroupIcon,
  },
  {
    title: "Admin",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: UserGroupIcon,
  }, */
];

export const settingsItems = [
  {
    title: "Profile",
    url: dashboardMenu.defineUrl("/profile"),
    icon: UserCircleIcon,
  },
  // { title: "Settings", url: "/settings", icon: Settings01Icon },
];
