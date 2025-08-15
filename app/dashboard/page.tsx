"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single().then(({ data }) => setProfile(data));
    }
  }, [user]);

  return (
    <div>
      {profile ? (
        <>
          <h2>Welcome, {profile.full_name}!</h2>
          <p>Zchuyot score: {profile.zchuyot_score}</p>
          {/* Язык, категории, ссылки на остальные модули */}
        </>
      ) : (<span>Loading...</span>)}
    </div>
  );
}
