import { apiFetch } from "./client";
import { RoomStatus } from "./rooms";

export async function getRoomStatuses() {
  return apiFetch<RoomStatus[]>("/room-status");
}

export async function getRoomStatus(id: string) {
  return apiFetch<RoomStatus>(`/room-status/${id}`);
}
