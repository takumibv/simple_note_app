/**
 * Groups API
 */

import { apiClient } from "./client";
import type { Group, CreateGroupRequest } from "@/types";

export async function getAll(): Promise<Group[]> {
  return apiClient.get<Group[]>("/groups");
}

export async function create(data: CreateGroupRequest): Promise<Group> {
  return apiClient.post<Group>("/groups", data);
}

export const groupsApi = {
  getAll,
  create,
};
