"use client";

import { useCallback, useEffect, useState } from "react";
import { getRooms, Room } from "../api/rooms";
import { getActiveRoomBooking, RoomBooking } from "../api/roomBookings";

type Options = { refetchIntervalMs?: number };

export function useRooms(options: Options = {}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getRooms();
      setRooms(data);
      setError(null);
      console.log("[useRooms] fetched rooms", data.length);
    } catch (err) {
      console.error("[useRooms] error", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    if (options.refetchIntervalMs) {
      const id = setInterval(fetchRooms, options.refetchIntervalMs);
      return () => clearInterval(id);
    }
  }, [options.refetchIntervalMs, fetchRooms]);

  return { rooms, isLoading, error, refetch: fetchRooms };
}

export function useRoomAvailability(roomId: string | undefined) {
  const [activeBooking, setActiveBooking] = useState<RoomBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchActive = useCallback(async () => {
    if (!roomId) return;
    try {
      setIsLoading(true);
      const booking = await getActiveRoomBooking(roomId);
      setActiveBooking(booking);
      setError(null);
      console.log("[useRoomAvailability] active booking", roomId, booking);
    } catch (err) {
      console.error("[useRoomAvailability] error", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchActive();
  }, [fetchActive]);

  const disponible = !activeBooking;

  return { disponible, activeBooking, isLoading, error, refetch: fetchActive };
}
