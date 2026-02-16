"use client";

import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

export function NoteCard({ note, isSelected, onClick }: NoteCardProps) {
  const formattedDate = new Date(note.updated_at).toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
  });

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border rounded-lg transition-colors ${
        isSelected
          ? "ring-2 ring-zinc-900 dark:ring-white border-transparent"
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <h3 className="font-medium truncate text-zinc-900 dark:text-zinc-50">
        {note.title}
      </h3>
      {note.content && (
        <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{note.content}</p>
      )}
      <p className="mt-2 text-xs text-zinc-400">{formattedDate}</p>
    </button>
  );
}
