import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchSinglePosition } from "../apis/positions.apis";
import { useMutation } from "@tanstack/react-query";
import { createApplication } from "../apis/applications.apis";
import { useRef } from "react";

const PositionsDetails = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const positionId = Number(id);

  const {
    data: position,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["position", positionId],
    queryFn: () => fetchSinglePosition(positionId),
    enabled: !isNaN(positionId),
  });

  const applyMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      alert("Application submitted successfully ✅");
    },
    onError: () => {
      alert("Something went wrong ❌");
    },
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeRef.current?.files?.[0]) {
      alert("Resume is required");
      return;
    }

    if (!position) {
      alert("Position not loaded");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullNameRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("positionId", String(positionId));
    formData.append("positionName", position.title); // ✅ THIS WAS MISSING
    formData.append("resume", resumeRef.current.files[0]);

    applyMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-gray-600">Loading position details...</h2>
      </div>
    );
  }

  if (isError || !position) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">Position not found</h2>
        <Link to="/positions" className="text-blue-600 underline">
          ← Back to positions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen body-container py-8">
      <div>
        <Link
          to="/positions"
          className="text-sm text-gray-600 hover:text-gray-900 mb-8 inline-block"
        >
          ← Browse all open positions
        </Link>

        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Left column - Title and Apply */}
            <div className="bg-gray-100 md:w-1/3 p-8 h-fit m-5 rounded">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {" "}
                {position.title}
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                {" "}
                {position.workType} • {position.location}
              </p>
              <Link
                to="#applyform"
                className="btn btn-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Apply
              </Link>
            </div>

            {/* Right column - Content */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What We do
              </h2>
              <p className="text-gray-700 mb-6">
                MarKoub.ma is a pioneering intercity bus ticketing platform in
                Morocco, committed to making travel easy, affordable, and
                convenient for everyone. We provide a seamless online experience
                for booking bus tickets, connecting users with a wide network of
                bus operators across the country. As we continue to grow, we are
                looking for a dynamic and experienced Full Stack Developer to
                join our team.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Mission
              </h2>
              <p className="text-gray-700 mb-4">
                In collaboration with our lead developer, you will be in charge
                of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>
                  Developing application components using React, Next.js, and
                  React Native (with Expo).
                </li>
                <li>
                  Adhering to and enforcing practices, procedures, and use of
                  tool sets described in the team&apos;s working agreement.
                </li>
                <li>
                  Building, improving, and maintaining our code base and
                  projects, ensuring they are easy to use, properly tested,
                  simple to extend, and ultimately driving value for our users.
                </li>
                <li>
                  Working as a generalist across back-end, front-end, and mobile
                  development priorities, building integrations and other
                  features for the product.
                </li>
                <li>
                  Supporting the test-driven development of the software stack
                  (e.g., code reviews, unit tests, CI) and documentation.
                </li>
                <li>
                  Implementing integrations with internal and external systems.
                </li>
                <li>Writing clean, efficient, and well-documented code.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Profile
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>
                  Experience in building frontend architecture and design
                  systems.
                </li>
                <li>Practical experience in e2e and unit testing.</li>
                <li>
                  Working understanding of mono repos and micro-frontends.
                </li>
                <li>Proficient with TypeScript (both frontend and backend).</li>
                <li>Great understanding of CI/CD, GitHub Actions, and Vite.</li>
                <li>
                  Experience in mobile development using React Native and Expo.
                </li>
                <li>
                  Able to learn new systems and languages with a short ramp-up
                  period.
                </li>
                <li>
                  Experienced in architecting and implementing robust, scalable
                  solutions that tackle real user needs.
                </li>
                <li>Curious, positive, and a doer mentality.</li>
                <li>
                  3+ years of professional experience with React, Next.js, React
                  Native, and TypeScript.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Tech Stack
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>
                  <strong>Frontend:</strong> React, Next.js, JavaScript,
                  TypeScript, Vite
                </li>
                <li>
                  <strong>Mobile:</strong> React Native, Expo
                </li>
                <li>
                  <strong>Libraries:</strong> TRPC, Shadcn UI, Drizzle ORM, Node
                  SDKs for various tools
                </li>
                <li>
                  <strong>FullStack:</strong> Next.js
                </li>
                <li>
                  <strong>Backend:</strong> Node.js, Nitro
                </li>
                <li>
                  <strong>DB:</strong> MySQL, Planetscale, Postgres, Clickhouse
                </li>
                <li>
                  <strong>Cloud:</strong> VPS, Docker, Cloudflare, R2,
                  Cloudflare Workers
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What We Offer
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
                <li>
                  Opportunity to be part of a passionate, dynamic and motivated
                  team.
                </li>
                <li>
                  An entrepreneurial journey in a fast growing pioneering
                  scale-up.
                </li>
                <li>Flexibility and a hybrid work environment.</li>
              </ul>

              <div className="bg-gray-100 rounded-lg p-8" id="applyform">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Application
                </h2>
                <form className="space-y-6" onSubmit={handleApply}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        ref={fullNameRef}
                        defaultValue="Yassine Alaoui"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        defaultValue="example@mail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="resume"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="resume"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="resume"
                              name="resume"
                              ref={resumeRef}
                              type="file"
                              className="sr-only"
                              accept=".pdf"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF Only, 2 MB Max
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition"
                    >
                      Submit application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionsDetails;
