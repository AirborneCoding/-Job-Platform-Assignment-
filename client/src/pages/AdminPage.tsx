import React, { useState } from "react";
import { Link } from "react-router-dom";
import PositionsAdmin from "../components/PositionsAdmin";
import ApplicationsAdmin from "../components/ApplicationsAdmin";

const AdminPage: React.FC = () => {
  const [view, setView] = useState<"positions" | "applications">("positions");

  return (
    <div className="body-container my-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Link to="/" className="text-gray-600 hover:text-gray-900">
        ← Back Home
      </Link>

      {/* Tabs */}
      <div className="flex gap-4 my-6">
        <button
          onClick={() => setView("positions")}
          className={`px-4 py-2 cursor-pointer rounded-lg font-medium ${
            view === "positions" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Positions
        </button>

        <button
          onClick={() => setView("applications")}
          className={`px-4 py-2 cursor-pointer rounded-lg font-medium ${
            view === "applications" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Applications
        </button>
      </div>

      {view === "positions" && <PositionsAdmin />}
      {view === "applications" && <ApplicationsAdmin />}
    </div>
  );
};

export default AdminPage;
