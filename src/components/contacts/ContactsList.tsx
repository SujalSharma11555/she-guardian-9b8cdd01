
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User, Phone, PhoneCall, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  phone: string;
  type: "emergency" | "custom";
}

const defaultEmergencyContacts: Contact[] = [
  {
    id: "women-helpline",
    name: "Women's Helpline",
    phone: "1800-123-4567",
    type: "emergency"
  },
  {
    id: "police",
    name: "Police",
    phone: "100",
    type: "emergency"
  },
  {
    id: "crime-helpline",
    name: "Crime Helpline",
    phone: "1090",
    type: "emergency"
  }
];

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(defaultEmergencyContacts);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Invalid Contact",
        description: "Please provide both a name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      type: "custom" as const
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to your contacts.`,
    });
  };

  const handleEditContact = () => {
    if (!editingContact || !editingContact.name || !editingContact.phone) {
      toast({
        title: "Invalid Contact",
        description: "Please provide both a name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const updatedContacts = contacts.map(contact => 
      contact.id === editingContact.id ? editingContact : contact
    );
    
    setContacts(updatedContacts);
    setEditingContact(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Contact Updated",
      description: `${editingContact.name} has been updated.`,
    });
  };

  const handleDeleteContact = (contactId: string) => {
    const contactToDelete = contacts.find(c => c.id === contactId);
    if (contactToDelete?.type === "emergency") {
      toast({
        title: "Cannot Delete",
        description: "Emergency contacts cannot be removed.",
        variant: "destructive",
      });
      return;
    }

    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    
    toast({
      title: "Contact Removed",
      description: "The contact has been removed from your list.",
    });
  };

  const simulateCall = (contact: Contact) => {
    toast({
      title: `Calling ${contact.name}`,
      description: `Dialing ${contact.phone}...`,
    });
    // In a real app, this would initiate a phone call
  };

  return (
    <div className="w-full space-y-4">
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Emergency Contacts</span>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-she-purple hover:bg-she-purple/90">
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Contact</DialogTitle>
                  <DialogDescription>
                    Add a new emergency contact to your list
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact}>Add Contact</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            These contacts will be notified during emergencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    contact.type === "emergency" ? "bg-she-coral/10" : "bg-she-purple/10"
                  }`}>
                    <User 
                      size={20} 
                      className={contact.type === "emergency" ? "text-she-coral" : "text-she-purple"} 
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => simulateCall(contact)}
                    className="h-8 w-8 rounded-full"
                  >
                    <PhoneCall size={16} className="text-green-500" />
                  </Button>
                  
                  {contact.type === "custom" && (
                    <>
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => setEditingContact(contact)} 
                            className="h-8 w-8 rounded-full"
                          >
                            <Edit size={16} className="text-she-purple" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Contact</DialogTitle>
                            <DialogDescription>
                              Update your emergency contact details
                            </DialogDescription>
                          </DialogHeader>
                          {editingContact && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={editingContact.name}
                                  onChange={(e) => setEditingContact({
                                    ...editingContact,
                                    name: e.target.value
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="edit-phone" className="text-right">
                                  Phone
                                </Label>
                                <Input
                                  id="edit-phone"
                                  value={editingContact.phone}
                                  onChange={(e) => setEditingContact({
                                    ...editingContact,
                                    phone: e.target.value
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {
                              setIsEditDialogOpen(false);
                              setEditingContact(null);
                            }}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditContact}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleDeleteContact(contact.id)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Trash2 size={16} className="text-she-coral" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsList;
