// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthed(!!data?.session);
      setLoading(false);
    };

    check();

    // Also subscribe to changes (optional but useful)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking session…</div>;

  if (!authed) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
