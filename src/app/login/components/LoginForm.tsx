"use client";

import { Input } from "@/components/ui/Input";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const { pending } = useFormStatus();

  return (
    <>
      <Input
        label="Access Key"
        type="password"
        id="access_key"
        name="access_key"
        placeholder="Enter your access key here..."
      />
      <button
        disabled={pending}
        type="submit"
        className="px-3 py-2 bg-blue-500 disabled:bg-slate-400 text-white rounded-md mt-4"
      >
        Login
      </button>
    </>
  );
}
