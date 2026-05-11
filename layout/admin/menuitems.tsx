// config/dashboardMenu.ts
import { DashboardMenu } from "@/utils/dashboardMenu";
import {
  Calendar02Icon,
  Layout01Icon,
  Settings01Icon,
  TickDouble02Icon,
  TreatmentIcon,
  UserCircleIcon,
  ContentWritingIcon
} from "@hugeicons/core-free-icons";

const baseDashboardUrl = "/admin-dashboard";
const dashboardMenu = new DashboardMenu(baseDashboardUrl);

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: dashboardMenu.defineUrl("/"),
    icon: Layout01Icon,
  },
  {
    title: "Appointments",
    url: dashboardMenu.defineUrl("/appointments"),
    icon: Calendar02Icon,
  },
  {
    title: "Experties",
    url: dashboardMenu.defineUrl("/experties"),
    icon: TickDouble02Icon,
  },
  {
    title: "Services",
    url: dashboardMenu.defineUrl("/services"),
    icon: TreatmentIcon,
  },
  {
    title: "Blogs",
    url: dashboardMenu.defineUrl("/blogs"),
    icon: ContentWritingIcon,
  },
];

export const settingsItems = [
  {
    title: "Profile",
    url: dashboardMenu.defineUrl("/profile"),
    icon: UserCircleIcon,
  },
  {
    title: "Settings",
    url: dashboardMenu.defineUrl("/settings"),
    icon: Settings01Icon,
  },
];
