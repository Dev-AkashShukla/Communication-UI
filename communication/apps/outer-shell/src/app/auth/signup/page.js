"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@indi-com/ui"; 
import { ArrowLeft } from "lucide-react";
import SignupSelection from "@/components/auth/sign-up/signup-selection";
import IndividualForm from "@/components/auth/sign-up/form-individual";
import OrganizationForm from "@/components/auth/sign-up/form-organization";
import { Button } from "@indi-com/ui";

export default function SignupPage() {
  // view: 'selection' | 'individual' | 'organization'
  const [view, setView] = useState("selection");

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-zinc-950">
      <Card className="w-full max-w-[500px] shadow-lg border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1 pb-4 relative">
          {view !== "selection" && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 h-6 w-6"
              onClick={() => setView("selection")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <CardTitle className="text-xl font-bold text-center">
            {view === "selection" && "Create an Account"}
            {view === "individual" && "Individual Profile"}
            {view === "organization" && "Organization Setup"}
          </CardTitle>
          <CardDescription className="text-center text-xs">
            {view === "selection" && "Choose how you want to get started"}
            {view === "individual" && "Enter your details below"}
            {view === "organization" && "Register your company & admin details"}
          </CardDescription>
        </CardHeader>

        {/* Load Components based on View */}
        {view === "selection" && <SignupSelection onSelect={setView} />}
        {view === "individual" && <IndividualForm />}
        {view === "organization" && <OrganizationForm />}
      </Card>
    </div>
  );
}