"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Checkbox } from "@indi-com/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@indi-com/ui";
import { Loader2, ArrowRight } from "lucide-react";

export default function OrganizationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Admin Fields
    full_name: "",
    work_email: "",
    phone_number: "",
    designation: "",
    password: "",
    confirmPassword: "", // Added
    // Company Fields
    company_name: "",
    industry_type: "",
    employee_count: "",
    website_url: "",
    tax_id: "",
    terms: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const isWorkEmail = (email) => {
    const blockedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];
    return domain && !blockedDomains.includes(domain);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    
    // Email Validation
    if (!isWorkEmail(formData.work_email)) {
      alert("Please use a valid work email (e.g., name@company.com)");
      return;
    }

    // Password Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) return alert("Accept terms to proceed");
    
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="p-6 pt-0 space-y-4">
      
      {/* STEP 1: ADMIN DETAILS */}
      {step === 1 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Step 1: Admin Details</div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="full_name" className="text-xs">Full Name *</Label>
                    <Input id="full_name" placeholder="John Doe" className="h-8 text-sm" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="phone_number" className="text-xs">Phone *</Label>
                    <Input id="phone_number" placeholder="+91..." className="h-8 text-sm" value={formData.phone_number} onChange={handleChange} required />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="work_email" className="text-xs">Work Email *</Label>
                    <Input id="work_email" type="email" placeholder="name@company.com" className="h-8 text-sm" value={formData.work_email} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="designation" className="text-xs">Designation</Label>
                    <Input id="designation" placeholder="e.g. HR" className="h-8 text-sm" value={formData.designation} onChange={handleChange} />
                </div>
            </div>

            <p className="text-[10px] text-muted-foreground -mt-1">Work email required. Personal emails not allowed.</p>

            {/* PASSWORD ROW */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">Password *</Label>
                    <Input id="password" type="password" placeholder="Min 8 chars" className="h-8 text-sm" value={formData.password} onChange={handleChange} required minLength={8} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs">Confirm Password *</Label>
                    <Input id="confirmPassword" type="password" placeholder="Re-enter" className="h-8 text-sm" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
            </div>

            <Button type="submit" className="w-full mt-2 h-9">
                Next: Company Details <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
        </div>
      )}

      {/* STEP 2: COMPANY DETAILS (Same as before) */}
      {step === 2 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Step 2: Company Info</div>

            <div className="space-y-1">
                <Label htmlFor="company_name" className="text-xs">Company Name *</Label>
                <Input id="company_name" placeholder="Finnotia Tech" className="h-8 text-sm" value={formData.company_name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">Industry</Label>
                    <Select onValueChange={(val) => handleSelectChange("industry_type", val)}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fintech">Fintech</SelectItem>
                            <SelectItem value="it">IT / Software</SelectItem>
                            <SelectItem value="health">Healthcare</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Size</Label>
                    <Select onValueChange={(val) => handleSelectChange("employee_count", val)}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1-10">1-10 Employees</SelectItem>
                            <SelectItem value="11-50">11-50 Employees</SelectItem>
                            <SelectItem value="50+">50+ Employees</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="website_url" className="text-xs">Website</Label>
                    <Input id="website_url" placeholder="https://" className="h-8 text-sm" value={formData.website_url} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="tax_id" className="text-xs">Tax ID / GST</Label>
                    <Input id="tax_id" placeholder="Optional" className="h-8 text-sm" value={formData.tax_id} onChange={handleChange} />
                </div>
            </div>

            <div className="flex items-center space-x-2 py-2">
                <Checkbox id="terms" checked={formData.terms} onCheckedChange={(c) => handleSelectChange("terms", c)} />
                <label htmlFor="terms" className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Accept Terms & Conditions
                </label>
            </div>

            <div className="flex gap-2">
                <Button variant="outline" type="button" onClick={() => setStep(1)} className="h-9 w-1/3">Back</Button>
                <Button type="submit" className="h-9 w-2/3" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    Complete Registration
                </Button>
            </div>
        </div>
      )}
    </form>
  );
}