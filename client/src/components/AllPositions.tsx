import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { fetchAllPositions } from "../apis/positions.apis";
import ApplyModal from "./ApplyModal";
import { useMutation } from "@tanstack/react-query";
import { createApplication } from "../apis/applications.apis";
import type { Position } from "../utils";

const columnHelper = createColumnHelper<Position>();

const AllPositions = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["positions"],
    queryFn: fetchAllPositions,
  });

  const positions: Position[] = Array.isArray(data) ? data : [];

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  const departments = useMemo(() => {
    const deps = [...new Set(positions.map((pos) => pos.department))];
    return deps.sort();
  }, [positions]);

  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredPositions = useMemo(() => {
    if (selectedDepartment === "all") return positions;
    return positions.filter((pos) => pos.department === selectedDepartment);
  }, [positions, selectedDepartment]);

  const columns = [
    // Title + Department
    columnHelper.accessor((row) => row, {
      id: "title-department",
      header: "",
      cell: (info) => {
        const position = info.getValue();
        return (
          <div>
            <div className="text-xl font-semibold text-gray-900">
              {position.title}
            </div>
            <div className="text-base text-gray-600 mt-1">
              {position.department}
            </div>
          </div>
        );
      },
    }),

    // Work Type
    columnHelper.accessor("workType", {
      header: "",
      cell: (info) => (
        <div className="text-center text-gray-700">{info.getValue()}</div>
      ),
    }),

    // Location
    columnHelper.accessor("location", {
      header: "",
      cell: (info) => (
        <div className="text-center text-gray-700">{info.getValue()}</div>
      ),
    }),

    //Apply Button (opens modal only)
    columnHelper.display({
      id: "apply",
      header: "",
      cell: (info) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPosition(info.row.original);
            setIsApplyOpen(true);
          }}
          className="px-8 py-4 bg-white border-2 border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          Apply
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredPositions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const applyMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      setIsApplyOpen(false);
      alert("Application submitted successfully ✅");
    },
  });

  if (isLoading) {
    return <h2 className="text-center mt-20 text-2xl">Loading...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center mt-20 text-2xl text-red-600">
        Error loading positions
      </h2>
    );
  }

  return (
    <section className="mt-2">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 mb-10">
        <p className="text-xl text-gray-700">
          We have {filteredPositions.length} open positions
        </p>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="select select-bordered w-full md:w-auto max-w-xs"
        >
          <option value="all">All departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => navigate(`/positions/${row.original.id}`)}
              className="cursor-pointer hover:bg-markoubOrange2"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-10">
        <p className="text-xl text-gray-700 mb-6">
          No matching role right now?
        </p>
        <button
          onClick={() => {
            setSelectedPosition(null);
            setIsApplyOpen(true);
          }}
          className="btn btn-lg text-white rounded-md bg-markoubOrange1 py-3 px-8 font-medium hover:shadow-lg transition"
        >
          Apply spontaneously
        </button>
      </div>

      <ApplyModal
        isOpen={isApplyOpen}
        position={selectedPosition}
        onClose={() => setIsApplyOpen(false)}
        onSubmit={(formData) => applyMutation.mutate(formData)}
      />
    </section>
  );
};

export default AllPositions;
