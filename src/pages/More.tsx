
import React from "react";
import Layout from "@/components/Layout";
import AboutSection from "@/components/more/AboutSection";

const More = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">About</h1>
        <AboutSection />
      </div>
    </Layout>
  );
};

export default More;
