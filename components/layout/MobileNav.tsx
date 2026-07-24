"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {site.navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <a
                href={link.href}
                className="rounded-xl px-4 py-4 text-2xl font-bold text-ink transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="border-t border-border p-6">
          <SheetClose asChild>
            <Button asChild variant="primary" size="lg" className="w-full">
              <a href="#join">참여하기</a>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
