"use client";

import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { Note, Group } from "@/types";
import { Button, IconButton } from "@/components/ui";

interface NoteEditorProps {
  note: Note | null;
  groups: Group[];
  onSave: (data: { title: string; content: string; group_id: number | null }) => void;
  onDelete: (noteId: number) => void;
  isNew?: boolean;
}

export function NoteEditor({
  note,
  groups,
  onSave,
  onDelete,
  isNew = false,
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content || "");
      setGroupId(note.group_id);
      setIsDirty(false);
    } else if (isNew) {
      setTitle("");
      setContent("");
      setGroupId(null);
      setIsDirty(false);
    }
  }, [note, isNew]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), content, group_id: groupId });
    setIsDirty(false);
  };

  const handleChange = (
    setter: (value: string) => void,
    value: string
  ) => {
    setter(value);
    setIsDirty(true);
  };

  const handleGroupChange = (value: string) => {
    setGroupId(value === "" ? null : Number(value));
    setIsDirty(true);
  };

  if (!note && !isNew) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500">
        Select a note or create a new one
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={groupId ?? ""}
          onChange={(e) => handleGroupChange(e.target.value)}
          className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
        >
          <option value="">No Group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          {note && (
            <IconButton
              onClick={() => onDelete(note.id)}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="w-4 h-4" />
            </IconButton>
          )}
          <Button onClick={handleSave} disabled={!title.trim() || !isDirty}>
            Save
          </Button>
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => handleChange(setTitle, e.target.value)}
        placeholder="Note title"
        className="text-2xl font-semibold bg-transparent border-none outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => handleChange(setContent, e.target.value)}
        placeholder="Start writing..."
        className="flex-1 text-base leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
      />
    </div>
  );
}
