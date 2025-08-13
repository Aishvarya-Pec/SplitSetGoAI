import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Join SplitSetGO in seconds
        </p>
        <SignUp appearance={{ variables: { colorPrimary: "#22C55E" } }} />
      </div>
    </div>
  );
}
