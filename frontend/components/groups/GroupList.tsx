"use client";

import { Folder, Plus, FileText } from "lucide-react";
import { useState } from "react";
import type { Group } from "@/types";
import { Input } from "@/components/ui";

interface GroupListProps {
  groups: Group[];
  selectedGroupId: number | null;
  onSelectGroup: (groupId: number | null) => void;
  onCreateGroup: (name: string) => void;
}

export function GroupList({
  groups,
  selectedGroupId,
  onSelectGroup,
  onCreateGroup,
}: GroupListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName.trim());
      setNewGroupName("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Groups
      </div>

      <button
        onClick={() => onSelectGroup(null)}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
          selectedGroupId === null
            ? "bg-zinc-200 dark:bg-zinc-800"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <FileText className="w-4 h-4" />
        <span>All Notes</span>
      </button>

      {groups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelectGroup(group.id)}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
            selectedGroupId === group.id
              ? "bg-zinc-200 dark:bg-zinc-800"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          <Folder className="w-4 h-4" />
          <span className="truncate">{group.name}</span>
        </button>
      ))}

      {isAdding ? (
        <form onSubmit={handleSubmit} className="px-2 py-1">
          <Input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group name"
            autoFocus
            onBlur={() => {
              if (!newGroupName.trim()) {
                setIsAdding(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsAdding(false);
                setNewGroupName("");
              }
            }}
          />
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Group</span>
        </button>
      )}
    </div>
  );
}
