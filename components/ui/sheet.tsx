"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm animate-[overlay-in_0.2s_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-surface-elevated shadow-xl outline-none animate-[sheet-in_0.25s_ease-out]",
          className
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">메뉴</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          충북 GEG 사이트 내비게이션 메뉴
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close className="absolute right-5 top-5 rounded-full p-2 text-ink-muted hover:bg-ink/5">
          <X className="h-5 w-5" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
