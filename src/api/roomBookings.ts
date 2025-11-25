import { apiFetch } from "./client";

export type RoomBooking = {
  id: string;
  client_id?: string;
  room_id: string;
  status: string;
  check_in: string;
  check_out: string;
  guests: number;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
};

export async function createRoomBooking(data: Partial<RoomBooking>) {
  console.log("[API] create booking payload", data);
  return apiFetch<RoomBooking>("/room-bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type SimpleBookingPayload = {
  id_room: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  start_date: string;
  end_date: string;
  total_price: number;
  notes?: string;
};

export async function createRoomBookingSimple(payload: SimpleBookingPayload) {
  console.log("[API] create simple booking payload", payload);
  return apiFetch<RoomBooking>("/room-bookings/simple", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getRoomBooking(id: string) {
  return apiFetch<RoomBooking>(`/room-bookings/${id}`);
}

export async function getRoomBookingsByRoom(roomId: string) {
  return apiFetch<RoomBooking[]>(`/room-bookings/room/${roomId}`);
}

export async function getActiveRoomBooking(roomId: string) {
  return apiFetch<RoomBooking | null>(`/room-bookings/room/${roomId}/active`);
}
