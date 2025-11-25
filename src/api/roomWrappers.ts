import { apiFetch } from "./client";
import { RoomWrapper } from "./rooms";

export async function getRoomWrappers() {
  return apiFetch<RoomWrapper[]>("/room-wrappers");
}

export async function getRoomWrapper(id: string) {
  return apiFetch<RoomWrapper>(`/room-wrappers/${id}`);
}
