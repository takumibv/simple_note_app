"use client";

import { Menu, ChevronLeft } from "lucide-react";
import { IconButton } from "@/components/ui";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export function Header({ title, onMenuClick, onBack, showBack = false }: HeaderProps) {
  return (
    <header className="flex items-center gap-2 p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden">
      {showBack && onBack ? (
        <IconButton onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
        </IconButton>
      ) : (
        <IconButton onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </IconButton>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
