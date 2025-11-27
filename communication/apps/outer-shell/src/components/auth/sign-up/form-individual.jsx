"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Checkbox } from "@indi-com/ui";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function IndividualForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "", // Added
    terms: false 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDATION
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.terms) {
      alert("Please accept terms");
      return;
    }
    
    setLoading(true);
    // API Call simulation
    setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/dashboard");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name" className="text-xs">Full Name</Label>
        <Input id="name" className="h-8 text-sm" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs">Email</Label>
        <Input id="email" type="email" className="h-8 text-sm" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
      </div>
      
      {/* PASSWORD SECTION */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs">Password</Label>
          <Input id="password" type="password" className="h-8 text-sm" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength={8} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-xs">Confirm Password</Label>
          <Input id="confirmPassword" type="password" className="h-8 text-sm" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="terms" checked={formData.terms} onCheckedChange={(c) => setFormData({...formData, terms: c})} />
        <label htmlFor="terms" className="text-xs leading-none">
          I agree to the <Link href="/terms" className="underline">Terms</Link>
        </label>
      </div>

      <Button type="submit" className="w-full h-9" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}