"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@/hooks/useSession";

export default function PrayersPage() {
  const { user } = useSession();
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    supabase.from('active_psalm_sessions').select('*')
      .eq('user_id', user.id)
      .then(({ data }) => setSessions(data));
  }, [user]);

  return (
    <div>
      <h2>Active Prayer Sessions</h2>
      <ul>{sessions.map(s => <li key={s.id}>{s.group_number}</li>)}</ul>
    </div>
  );
}
