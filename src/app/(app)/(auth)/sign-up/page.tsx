import SignUpView from "@/modules/auth/ui/views/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

interface SignInPageProps {}

const SignInPage = async ({}: SignInPageProps) => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return (
    <div>
      <SignUpView />
    </div>
  );
};

export default SignInPage;
