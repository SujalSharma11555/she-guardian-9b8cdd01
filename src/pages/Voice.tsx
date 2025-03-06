
import React from "react";
import Layout from "@/components/Layout";
import VoiceCommands from "@/components/voice/VoiceCommands";

const Voice = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Voice Commands</h1>
        <VoiceCommands />
      </div>
    </Layout>
  );
};

export default Voice;
