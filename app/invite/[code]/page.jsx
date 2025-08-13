"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AcceptInvitePage() {
  const params = useParams();
  const router = useRouter();
  const { mutate: acceptInvite, isLoading } = useConvexMutation(
    api.groups.acceptInvite
  );
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const onAccept = async () => {
    try {
      setStatus("pending");
      const res = await acceptInvite({ code: params.code });
      // optional: confetti; ignore if not installed
      setStatus("accepted");
      router.replace(`/groups/${res.groupId}`);
    } catch (e) {
      setError(e.message);
      setStatus("error");
    }
  };

  useEffect(() => {
    onAccept();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-md py-24">
      <Card>
        <CardHeader>
          <CardTitle>Joining group…</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "pending" && <p>Please wait while we accept your invite.</p>}
          {status === "error" && (
            <div className="space-y-4">
              <p className="text-red-600">{error}</p>
              <Button onClick={onAccept} disabled={isLoading}>Try again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


