export const navLinks = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Positions",
    link: "/positions",
  },
  {
    id: 3,
    title: "Admin Panel",
    link: "/admin",
  },
] as const;

export interface Position {
  id: number;
  title: string;
  department: string;
  workType: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type Application = {
  id: number;
  fullName: string;
  email: string;
  positionId: number;
  resumeUrl: string;
  createdAt?: string;
  updatedAt?: string;
};
