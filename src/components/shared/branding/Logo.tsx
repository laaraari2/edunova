import Link from "next/link";

type LogoProps = {
  href?: string;
  showText?: boolean;
};

export default function Logo({
  href = "/",
  showText = true,
}: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
        E
      </div>

      {showText && (
        <div className="leading-tight">
          <h1 className="text-lg font-bold">
            Edunova
          </h1>

          <p className="text-xs text-muted-foreground">
            Education Operating System
          </p>
        </div>
      )}
    </Link>
  );
}