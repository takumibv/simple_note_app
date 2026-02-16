"use client";

import { useState, useEffect, useCallback } from "react";
import type { Note, Group } from "@/types";
import { notesApi, groupsApi, ApiClientError } from "@/lib/api";
import { Sidebar, Header } from "@/components/layout";
import { NoteList, NoteEditor } from "@/components/notes";

type View = "list" | "editor";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState<View>("list");
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const data = await notesApi.getAll(
        selectedGroupId ? { group_id: selectedGroupId } : undefined
      );
      setNotes(data);
      setError(null);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      }
    }
  }, [selectedGroupId]);

  const fetchGroups = useCallback(async () => {
    try {
      const data = await groupsApi.getAll();
      setGroups(data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  const handleSelectGroup = (groupId: number | null) => {
    setSelectedGroupId(groupId);
    setSelectedNoteId(null);
    setIsCreatingNote(false);
  };

  const handleCreateGroup = async (name: string) => {
    try {
      await groupsApi.create({ group: { name } });
      await fetchGroups();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      }
    }
  };

  const handleSelectNote = (noteId: number) => {
    setSelectedNoteId(noteId);
    setIsCreatingNote(false);
    setMobileView("editor");
  };

  const handleCreateNote = () => {
    setSelectedNoteId(null);
    setIsCreatingNote(true);
    setMobileView("editor");
  };

  const handleSaveNote = async (data: {
    title: string;
    content: string;
    group_id: number | null;
  }) => {
    try {
      if (isCreatingNote) {
        const newNote = await notesApi.create({
          note: {
            title: data.title,
            content: data.content || undefined,
            group_id: data.group_id ?? undefined,
          },
        });
        setIsCreatingNote(false);
        setSelectedNoteId(newNote.id);
      } else if (selectedNoteId) {
        await notesApi.update(selectedNoteId, {
          note: {
            title: data.title,
            content: data.content || undefined,
            group_id: data.group_id ?? undefined,
          },
        });
      }
      await fetchNotes();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      }
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await notesApi.delete(noteId);
      setSelectedNoteId(null);
      setMobileView("list");
      await fetchNotes();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      }
    }
  };

  const handleBack = () => {
    setMobileView("list");
    setIsCreatingNote(false);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950">
      <Sidebar
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={handleSelectGroup}
        onCreateGroup={handleCreateGroup}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <Header
            title={
              mobileView === "editor"
                ? isCreatingNote
                  ? "New Note"
                  : "Edit Note"
                : "Notes"
            }
            onMenuClick={() => setIsSidebarOpen(true)}
            onBack={mobileView === "editor" ? handleBack : undefined}
            showBack={mobileView === "editor"}
          />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-4 py-2 text-sm">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Note List - hidden on mobile when viewing editor */}
        <div
          className={`w-full lg:w-80 border-r border-zinc-200 dark:border-zinc-800 ${
            mobileView === "editor" ? "hidden lg:block" : "block"
          }`}
        >
          <NoteList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onCreateNote={handleCreateNote}
          />
        </div>

        {/* Note Editor - hidden on mobile when viewing list */}
        <div
          className={`flex-1 ${
            mobileView === "list" ? "hidden lg:block" : "block"
          }`}
        >
          <NoteEditor
            note={isCreatingNote ? null : selectedNote}
            groups={groups}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
            isNew={isCreatingNote}
          />
        </div>
      </div>
    </div>
  );
}
