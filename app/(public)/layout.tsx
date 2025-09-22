import Navbar from "@/components/public/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="bg-gradient-to-br  from-pink-100 to-orange-50 h-screen">
        <header>
          <Navbar />
        </header>

        {children}
      </main>
    </>
  );
};

export default PublicLayout;
