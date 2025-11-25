"use client";

import { useCallback, useEffect, useState } from "react";
import { getRoom, Room } from "../api/rooms";
import { useRoomAvailability } from "./useRooms";

export function useRoom(roomId: string | undefined) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const availability = useRoomAvailability(roomId);

  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    try {
      setIsLoading(true);
      const data = await getRoom(roomId);
      setRoom(data);
      setError(null);
      console.log("[useRoom] room", roomId, data);
    } catch (err) {
      console.error("[useRoom] error", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  return { room, isLoading, error, refetch: fetchRoom, availability };
}
