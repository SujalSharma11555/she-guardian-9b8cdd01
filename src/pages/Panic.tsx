
import React from "react";
import Layout from "@/components/Layout";
import PanicMode from "@/components/panic/PanicMode";

const Panic = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Panic Mode</h1>
        <PanicMode />
      </div>
    </Layout>
  );
};

export default Panic;
