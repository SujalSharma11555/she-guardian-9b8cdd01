
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Plus, Trash2, Edit, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ContactForm from "./ContactForm";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary?: boolean;
}

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Load initial emergency contacts
  useEffect(() => {
    // In a real app, this would come from a database
    const emergencyContacts: Contact[] = [
      {
        id: "1",
        name: "Women's Helpline",
        phone: "1091",
        relation: "Emergency Service",
        isPrimary: true
      },
      {
        id: "2",
        name: "Police",
        phone: "100",
        relation: "Emergency Service",
        isPrimary: true
      },
      {
        id: "3",
        name: "Crime Helpline",
        phone: "1090",
        relation: "Emergency Service",
        isPrimary: true
      }
    ];
    
    setContacts(emergencyContacts);
  }, []);
  
  const addContact = (contact: { name: string; phone: string; relation: string }) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...contact
    };
    
    setContacts([...contacts, newContact]);
    setShowForm(false);
    
    toast({
      title: "Contact added",
      description: `${contact.name} has been added to your emergency contacts`
    });
  };
  
  const deleteContact = (id: string) => {
    // Don't allow deletion of primary contacts
    const contactToDelete = contacts.find(c => c.id === id);
    
    if (contactToDelete?.isPrimary) {
      toast({
        title: "Cannot delete",
        description: "This is a default emergency contact and cannot be deleted",
        variant: "destructive"
      });
      return;
    }
    
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: "Contact deleted",
      description: "The contact has been removed from your emergency contacts"
    });
  };
  
  const setPrimaryContact = (id: string) => {
    setContacts(
      contacts.map(contact => ({
        ...contact,
        isPrimary: contact.id === id ? true : contact.isPrimary
      }))
    );
    
    const contactName = contacts.find(c => c.id === id)?.name;
    
    toast({
      title: "Primary contact set",
      description: `${contactName} is now your primary emergency contact`
    });
  };
  
  return (
    <div className="space-y-4">
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>People to contact during emergencies</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} size="sm">
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Add Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm 
                  onAddContact={addContact} 
                  onCancel={() => setShowForm(false)} 
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {contacts.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No emergency contacts added yet
                </p>
              ) : (
                contacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className={`p-3 rounded-md flex justify-between items-center ${
                      contact.isPrimary 
                        ? "bg-she-pink/20 border border-she-pink/30" 
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-she-purple/20 flex items-center justify-center mr-3">
                        {contact.isPrimary ? (
                          <Star size={18} className="text-she-purple" />
                        ) : (
                          <Phone size={18} className="text-she-purple" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-xs text-gray-500">{contact.phone} • {contact.relation}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {!contact.isPrimary && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setPrimaryContact(contact.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Star size={16} className="text-gray-500" />
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => deleteContact(contact.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsList;
