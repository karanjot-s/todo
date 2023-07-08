import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function TodoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="m-auto px-4" style={{ maxWidth: "1000px" }}>
        {children}
      </div>
    </>
  );
}
