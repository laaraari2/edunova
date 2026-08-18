"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { navigation } from "@/lib/data/navigation";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
  <Button variant="ghost" size="icon">
    <Menu className="h-5 w-5" />
  </Button>
</SheetTrigger>

        <SheetContent side="right">
          <nav className="mt-10 flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}