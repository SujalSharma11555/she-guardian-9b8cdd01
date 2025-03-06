
import React from "react";
import Layout from "@/components/Layout";
import ContactsList from "@/components/contacts/ContactsList";

const Contacts = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
        <ContactsList />
      </div>
    </Layout>
  );
};

export default Contacts;
