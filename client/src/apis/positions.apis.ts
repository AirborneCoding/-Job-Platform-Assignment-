import axios from "axios";
import type { Position } from "../utils";

export async function fetchAllPositions() {
  const res = await axios.get("/api/v1/positions");
  return res.data;
}

export async function fetchSinglePosition(id: number) {
  const res = await axios.get(`/api/v1/positions/${id}`);
  return res.data;
}

export async function createPosition(data: Omit<Position, "id">) {
  const res = await axios.post("/api/v1/positions", data);
  return res.data;
}

export async function updatePosition(
  id: number,
  data: Partial<Omit<Position, "id">>
) {
  const res = await axios.patch(`/api/v1/positions/${id}`, data);
  return res.data;
}

export async function deletePosition(id: number) {
  const res = await axios.delete(`/api/v1/positions/${id}`);
  return res.data;
}
