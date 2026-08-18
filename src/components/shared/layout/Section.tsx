import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

type SectionBackground =
  | "transparent"
  | "default"
  | "muted"
  | "primary";

interface SectionProps {
  children: ReactNode;
  spacing?: SectionSpacing;
  background?: SectionBackground;
  className?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
};

const backgroundClasses: Record<SectionBackground, string> = {
  transparent: "bg-transparent",
  default: "bg-background",
  muted: "bg-muted",
  primary: "bg-primary text-primary-foreground",
};

export default function Section({
  children,
  spacing = "lg",
  background = "transparent",
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}