/**
 * Core domain types for the note-taking application
 */

export interface Note {
  id: number;
  title: string;
  content: string | null;
  group_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  note: {
    title: string;
    content?: string;
    group_id?: number;
  };
}

export interface UpdateNoteRequest {
  note: {
    title?: string;
    content?: string;
    group_id?: number;
  };
}

export interface CreateGroupRequest {
  group: {
    name: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface NotesQueryParams {
  group_id?: number;
}

// Auth types
export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
}
