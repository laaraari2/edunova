import {
  Brain,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const dashboardNavigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Étudiants",
    icon: GraduationCap,
  },
  {
    title: "Enseignants",
    icon: Users,
  },
  {
    title: "IA Insights",
    icon: Brain,
  },
  {
    title: "Paramètres",
    icon: Settings,
  },
];