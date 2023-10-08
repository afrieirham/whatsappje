import { SignInButton } from "@clerk/nextjs";
import Head from "next/head";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <SignInButton redirectUrl="/dashboard">
          <Button>Login</Button>
        </SignInButton>
      </main>
    </>
  );
}
