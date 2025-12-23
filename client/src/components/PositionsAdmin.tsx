import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "../apis/positions.apis";

import { FaTrash, FaEdit } from "react-icons/fa";
import type { Position } from "../utils";

const emptyForm = {
  title: "",
  department: "",
  workType: "",
  location: "",
  description: "",
  createdAt: "",
  updatedAt: "",
};

const PositionsAdmin = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: positions, isLoading } = useQuery<Position[]>({
    queryKey: ["positions"],
    queryFn: fetchAllPositions,
  });

  const createMutation = useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      setForm(emptyForm);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Position> }) =>
      updatePosition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      setEditingId(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (pos: Position) => {
    setEditingId(pos.id);
    setForm({
      title: pos.title,
      department: pos.department,
      workType: pos.workType,
      location: pos.location,
      description: pos.description ?? "",
      createdAt: pos.createdAt,
      updatedAt: pos.updatedAt,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return <div className="py-10 text-center">Loading positions...</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Work Type</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {positions?.map((pos) => (
              <tr key={pos.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{pos.title}</td>
                <td className="px-6 py-4">{pos.department}</td>
                <td className="px-6 py-4">{pos.workType}</td>
                <td className="px-6 py-4">{pos.location}</td>
                <td className="px-6 py-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(pos)}
                    className="btn btn-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(pos.id)}
                    className="btn btn-sm text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Position" : "Add New Position"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Work Type"
            value={form.workType}
            onChange={(e) => setForm({ ...form, workType: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <textarea
            className="input input-bordered w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button className="btn bg-markoubOrange1 text-white px-6 py-3 rounded-md">
            {editingId ? "Update Position" : "Add Position"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PositionsAdmin;
