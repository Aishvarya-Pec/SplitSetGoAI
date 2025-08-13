import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Sign in to continue to SplitSetGO
        </p>
        <SignIn appearance={{ variables: { colorPrimary: "#22C55E" } }} />
      </div>
    </div>
  );
}
