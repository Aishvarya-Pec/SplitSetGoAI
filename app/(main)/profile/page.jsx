"use client";

import { useState } from "react";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { data: me } = useConvexQuery(api.users.getCurrentUser);
  const { mutate: updateProfile, isLoading } = useConvexMutation(
    api.users.updateProfile
  );
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (!me) return null;

  const onSave = async () => {
    await updateProfile({ name: name || undefined, bio: bio || undefined, imageUrl: imageUrl || undefined });
  };

  return (
    <div className="container mx-auto max-w-xl py-24 space-y-6">
      <h1 className="text-4xl gradient-title">Your Profile</h1>
      <div className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={me.imageUrl} />
            <AvatarFallback>{me.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">{me.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Name</label>
          <Input defaultValue={me.name} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Avatar URL</label>
          <Input defaultValue={me.imageUrl || ""} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Bio</label>
          <Textarea defaultValue={me.bio || ""} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a bit about yourself" />
        </div>
        <Button onClick={onSave} disabled={isLoading}>{isLoading ? "Saving…" : "Save changes"}</Button>
      </div>
    </div>
  );
}


