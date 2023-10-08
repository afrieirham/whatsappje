import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function Home() {
  const response = api.link.getAll.useQuery();
  const user = useUser();

  console.log(response.data, user);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignedIn>
          <p>Hello World</p>
          <SignOutButton>
            <Button>Logout</Button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>
      </main>
    </>
  );
}
