import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <section className="max-w-4xl mx-auto my-16">{children}</section>
    </div>
  );
};

export default Layout;
