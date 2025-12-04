// src/components/pages/Login.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import logo from "@/assets/lgg.png";
import { supabase } from "@/utils/supabase";

const Login = () => {
  const handleGoogleLogin = async () => {
    // This triggers Supabase's Redirect-based OAuth flow.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          // Force the account chooser — avoids silent/auto login:
          prompt: "select_account",
        },
      },
    });

    // If an error occurred, log and bail out.
    if (error) {
      console.error("Supabase Google OAuth error:", error);
      return;
    }

    // Some Supabase installs return data.url for redirect-based flows.
    // If data.url is missing, user probably aborted the flow.
    if (!data?.url) {
      console.log("Login aborted or not initiated.");
      return;
    }

    // For redirect flow, Supabase will handle the redirect via data.url.
    // Nothing else to do here in the client.
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white overflow-hidden">
      {/* ... UI markup preserved from your existing Login ... */}
      <div className="relative z-10 flex w-full max-w-md flex-col px-4">
        <Card className="mx-auto w-full max-w-sm border-white/10 bg-black/70 text-white shadow-2xl shadow-black/60 backdrop-blur-xl">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
              <img src={logo} alt="Social Intel logo" className="h-10 w-10 object-contain" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold tracking-[0.18em] text-gray-300">CREATOR</CardTitle>
              <h2 className="text-xl font-semibold">Sign in</h2>
              <CardDescription className="text-xs text-gray-400">Welcome back! Please sign in to continue.</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-center border border-white/60 bg-transparent text-white hover:bg-white/5"
              onClick={handleGoogleLogin}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="h-4 w-4" />
              </span>
              Continue with Google
            </Button>
            {/* Mobile login button left as-is */}
            <Button variant="outline" className="w-full justify-center border border-white/60 bg-transparent text-white hover:bg-white/5">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <img src="https://cdn-icons-png.flaticon.com/512/159/159832.png" alt="Mobile icon" className="h-3.5 w-3.5" />
              </span>
              Login with mobile
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <span>Don't have an account?</span>
              <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">Sign up</Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 flex w-full items-center justify-center text-[10px] text-gray-500">
          <span>
            © {new Date().getFullYear()} Creator ·
            <button className="ml-1 hover:text-gray-300">Support</button> ·
            <button className="ml-1 hover:text-gray-300">Privacy</button> ·
            <button className="ml-1 hover:text-gray-300">Terms</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
