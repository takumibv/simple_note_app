/**
 * Authentication API
 */

import { apiClient } from "./client";
import type { User, AuthResponse, LoginRequest, RegisterRequest } from "@/types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/login", data);
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/register", data);
}

export async function getCurrentUser(): Promise<User> {
  return apiClient.get<User>("/auth/me");
}

export const authApi = {
  login,
  register,
  getCurrentUser,
};
