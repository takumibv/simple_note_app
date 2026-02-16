/**
 * Base API client
 */

import { ApiError } from "@/types";
import { getToken } from "@/lib/auth/token";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export class ApiClientError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method,
    headers,
  };

  if (options.body !== undefined) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiError;

      try {
        errorData = (await response.json()) as ApiError;
      } catch {
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      throw new ApiClientError(
        errorData.message || "An error occurred",
        response.status,
        errorData.errors
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, headers?: Record<string, string>): Promise<T> => {
    return apiRequest<T>(endpoint, { method: "GET", headers });
  },

  post: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>(endpoint, { method: "POST", body, headers });
  },

  patch: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>(endpoint, { method: "PATCH", body, headers });
  },

  delete: <T = void>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>(endpoint, { method: "DELETE", headers });
  },
};
