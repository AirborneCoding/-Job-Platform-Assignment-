import { Link } from "react-router-dom";
import AllPositions from "../components/AllPositions";

const PositionsPage = () => {
  return (
    <div className="body-container mt-8">
      <h2 className="text-center font-bold text-3xl">Open Positions</h2>
      <Link to="/" className="mb-8 text-gray-600 hover:text-gray-900">
        ← Back Home
      </Link>
      <AllPositions />
    </div>
  );
};

export default PositionsPage;
