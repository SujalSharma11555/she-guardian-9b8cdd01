
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface ContactFormProps {
  onAddContact: (contact: { name: string; phone: string; relation: string }) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAddContact, onCancel }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name.trim() || !phone.trim() || !relation.trim()) {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Phone number validation
    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    onAddContact({ name, phone, relation });
    
    // Reset form
    setName("");
    setPhone("");
    setRelation("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (234) 567-8901"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="relation">Relation</Label>
        <Input
          id="relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="Friend, Family, etc."
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Contact</Button>
      </div>
    </form>
  );
};

export default ContactForm;
