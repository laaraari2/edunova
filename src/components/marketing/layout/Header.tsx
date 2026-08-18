"use client";

import Link from "next/link";
import Logo from "@/components/shared/branding/Logo";
import Container from "@/components/shared/layout/Container";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "Plateforme", href: "#platform" },
  { name: "Tarifs", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

     <div className="flex items-center gap-3">
  <Button variant="ghost" asChild>
    <Link href="/login">Connexion</Link>
  </Button>

  <Button asChild>
    <Link href="/setup">
      Demander une démo
    </Link>
  </Button>
</div>
      </Container>
    </header>
  );
}