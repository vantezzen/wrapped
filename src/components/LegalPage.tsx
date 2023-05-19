import React from "react";
import Footer from "./Footer";

function LegalPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-200 text-zinc-900">
      <div className="prose max-w-lg mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

export default LegalPage;
