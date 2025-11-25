"use client";

import { useState } from "react";
import {
  createRoomBooking,
  createRoomBookingSimple,
  RoomBooking,
  SimpleBookingPayload,
} from "../api/roomBookings";
import { updateRoomStatus } from "../api/rooms";

export function useCreateBooking() {
  const [data, setData] = useState<RoomBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = async (payload: Partial<RoomBooking> & { newStatusId?: string }) => {
    try {
      setIsLoading(true);
      console.log("[useCreateBooking] creating booking", payload);
      const booking = await createRoomBooking(payload);
      setData(booking);
      if (payload.room_id && payload.newStatusId) {
        await updateRoomStatus(payload.room_id, payload.newStatusId);
        console.log("[useCreateBooking] updated room status", payload.room_id, payload.newStatusId);
      }
      setError(null);
    } catch (err) {
      console.error("[useCreateBooking] error", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, mutate };
}

export function useCreateSimpleBooking() {
  const [data, setData] = useState<RoomBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = async (payload: SimpleBookingPayload) => {
    try {
      setIsLoading(true);
      console.log("[useCreateSimpleBooking] creando reserva simple", payload);
      const booking = await createRoomBookingSimple(payload);
      setData(booking);
      setError(null);
    } catch (err) {
      console.error("[useCreateSimpleBooking] error", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, mutate };
}
