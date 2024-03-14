"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";
import LoginForm from "./components/LoginForm";
import Alert from "@/components/ui/Alert";

const initialState = {
  message: null,
  status: null,
};

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="container px-6">
      <h1 className="text-2xl font-semibold my-6">Login</h1>
      <form action={formAction}>
        {state.message && (
          <Alert className="mb-4" title="Error" variant="error">
            <p>{state.message}</p>
          </Alert>
        )}
        <LoginForm />
      </form>
    </div>
  );
}
