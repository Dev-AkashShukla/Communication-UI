"use client";

import { User, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@indi-com/ui"; // Ensure Button is imported if used, otherwise Link is enough

export default function SignupSelection({ onSelect }) {
  return (
    <div className="p-6 pt-0 space-y-4">
      <div className="grid gap-4">
        {/* Individual Option */}
        <div
          onClick={() => onSelect("individual")}
          className="cursor-pointer border rounded-md p-3 hover:border-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center space-x-3 group"
        >
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full group-hover:bg-primary/10 transition-colors">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Individual</h3>
            <p className="text-xs text-muted-foreground">
              Freelancers, solo developers.
            </p>
          </div>
        </div>

        {/* Organization Option */}
        <div
          onClick={() => onSelect("organization")}
          className="cursor-pointer border rounded-md p-3 hover:border-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center space-x-3 group"
        >
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full group-hover:bg-primary/10 transition-colors">
            <Building2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Organization</h3>
            <p className="text-xs text-muted-foreground">
              Companies, teams, startups.
            </p>
          </div>
        </div>
      </div>

      {/* --- BACK TO SIGN IN SECTION --- */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link 
          href="/auth/login" 
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}