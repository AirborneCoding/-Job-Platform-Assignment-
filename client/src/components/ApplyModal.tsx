import { useState } from "react";
import type { Position } from "../utils";

type Props = {
  isOpen: boolean;
  position: Position | null;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
};

const ApplyModal = ({ isOpen, position, onClose, onSubmit }: Props) => {
  const [resume, setResume] = useState<File | null>(null);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resume) {
      alert("Resume is required");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (position?.id) {
      formData.append("positionId", String(position.id));
      formData.append("spontaneous", "false");
    } else {
      formData.append("spontaneous", "true");
    }
    formData.append("resume", resume);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-2">
          {position ? `Apply for ${position.title}` : "Spontaneous Application"}
        </h2>

        {position && (
          <p className="text-gray-600 mb-6">
            {position.department} · {position.location}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              name="fullName"
              type="text"
              required
              placeholder="Full name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="YourEmail@Email.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position Applying For *
            </label>
            <select
              name="positionName"
              defaultValue={position?.title ?? ""}
              className="select w-full"
              required
            >
              <option value="" disabled>
                Position applying for
              </option>

              {position && (
                <option value={position.title}>{position.title}</option>
              )}

              {!position && (
                <>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="caisse">Caisse</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF Only) *
            </label>

            <div className="relative w-full">
              <input
                type="file"
                accept="application/pdf"
                required
                id="resume"
                className="hidden"
                onChange={(e) => setResume(e.target.files?.[0] ?? null)}
              />

              <label
                htmlFor="resume"
                className="w-full input input-bordered cursor-pointer block text-center py-2 font-semibold"
              >
                Resume
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-1">PDF Only, 2 MB Max</p>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-markoubOrange1 btn text-white py-3 rounded-md font-medium"
            >
              Submit application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
