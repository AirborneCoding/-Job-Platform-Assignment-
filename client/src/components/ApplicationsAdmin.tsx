import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Application, Position } from "../utils";
import { fetchAllApplications } from "../apis/applications.apis";
import { fetchAllPositions } from "../apis/positions.apis";

const ApplicationsAdmin = () => {
  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: fetchAllApplications,
  });

  const { data: positions } = useQuery<Position[]>({
    queryKey: ["positions"],
    queryFn: fetchAllPositions,
  });

  const positionsMap = useMemo(() => {
    const map: Record<number, Position> = {};
    positions?.forEach((p) => (map[p.id] = p));
    return map;
  }, [positions]);

  if (isLoading) {
    return <div className="py-10 text-center">Loading applications...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Position
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium">Resume</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {applications?.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{app.fullName}</td>
              <td className="px-6 py-4">{app.email}</td>
              <td className="px-6 py-4">
                {positionsMap[app.positionId]?.title ?? "Unknown"}
              </td>
              <td className="px-6 py-4">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsAdmin;
