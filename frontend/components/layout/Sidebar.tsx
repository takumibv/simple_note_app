"use client";

import { X } from "lucide-react";
import type { Group } from "@/types";
import { GroupList } from "@/components/groups";
import { IconButton } from "@/components/ui";

interface SidebarProps {
  groups: Group[];
  selectedGroupId: number | null;
  onSelectGroup: (groupId: number | null) => void;
  onCreateGroup: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  groups,
  selectedGroupId,
  onSelectGroup,
  onCreateGroup,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h1 className="text-lg font-semibold">Notes</h1>
            <IconButton onClick={onClose} className="lg:hidden">
              <X className="w-5 h-5" />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <GroupList
              groups={groups}
              selectedGroupId={selectedGroupId}
              onSelectGroup={(id) => {
                onSelectGroup(id);
                onClose();
              }}
              onCreateGroup={onCreateGroup}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
