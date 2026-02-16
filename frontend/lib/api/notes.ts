/**
 * Notes API
 */

import { apiClient } from "./client";
import type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  NotesQueryParams,
} from "@/types";

export async function getAll(params?: NotesQueryParams): Promise<Note[]> {
  const queryString = params?.group_id ? `?group_id=${params.group_id}` : "";
  return apiClient.get<Note[]>(`/notes${queryString}`);
}

export async function getById(id: number): Promise<Note> {
  return apiClient.get<Note>(`/notes/${id}`);
}

export async function create(data: CreateNoteRequest): Promise<Note> {
  return apiClient.post<Note>("/notes", data);
}

export async function update(
  id: number,
  data: UpdateNoteRequest
): Promise<Note> {
  return apiClient.patch<Note>(`/notes/${id}`, data);
}

export async function deleteNote(id: number): Promise<void> {
  return apiClient.delete<void>(`/notes/${id}`);
}

export const notesApi = {
  getAll,
  getById,
  create,
  update,
  delete: deleteNote,
};
