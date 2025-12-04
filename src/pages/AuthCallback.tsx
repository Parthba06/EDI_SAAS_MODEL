// src/components/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase stores session in URL hash or cookies and provides getSession
    const finishAuth = async () => {
      try {
        // Wait a short moment to let Supabase finish its redirect handling
        await new Promise((r) => setTimeout(r, 300));

        const { data } = await supabase.auth.getSession();

        if (data?.session) {
          // You can also write user data to your DB here if needed
          navigate("/dashboard");
        } else {
          // No session — send user back to login
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    };

    finishAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>
        <p className="mb-2">Finishing authentication…</p>
        <p className="text-xs text-gray-400">If nothing happens, please try signing in again.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
