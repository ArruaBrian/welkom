import { apiFetch } from "./client";

export type RoomStatus = {
  id: string;
  name: string;
  description: string;
};

export type RoomWrapper = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price_per_night: number;
  max_adults: number;
  max_children: number;
  max_infants: number;
  crib_available: boolean;
  extra_bed_available: boolean;
  amenities: string[] | null;
  id_floor?: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  price: string;
  capacity_people: number;
  id_roomwrapper: string;
  id_room_status: string;
  roomStatus: RoomStatus;
  roomWrapper: RoomWrapper;
  capacity: number;
  price_per_night: number;
  status: string;
};

export async function getRooms() {
  return apiFetch<Room[]>("/rooms");
}

export async function getRoom(id: string) {
  return apiFetch<Room>(`/rooms/${id}`);
}

export async function updateRoomStatus(id: string, statusId: string) {
  console.log("[API] update room status", id, statusId);
  return apiFetch<Room>(`/rooms/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ id_room_status: statusId }),
  });
}
