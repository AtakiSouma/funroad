import SignInView from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return (
    <div>
      <SignInView />
    </div>
  );
};

export default LoginPage;
