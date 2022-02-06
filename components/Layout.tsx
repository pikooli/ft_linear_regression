import React from "react";
import Header from "components/Header";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <div className="container mt-3">{children}</div>;
      </main>
      ;
    </>
  );
};

export default Layout;
