// src/pages/Signup.tsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-removebg-preview.png";
import { useEffect, useRef } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);

  const handleSignup = () => {
    navigate("/dashboard");
  };

  // Subtle floating animation for orbs
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.008;
      if (orbRef1.current) {
        orbRef1.current.style.transform = `translate(${Math.sin(t) * 20}px, ${Math.cos(t * 0.7) * 15}px)`;
      }
      if (orbRef2.current) {
        orbRef2.current.style.transform = `translate(${Math.cos(t * 0.9) * 25}px, ${Math.sin(t * 0.6) * 20}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* ─── LEFT PANEL: Brand showcase ─── */}
      <div className="relative hidden lg:flex lg:w-[55%] flex-col justify-center overflow-hidden bg-[#0A0F24]">
        {/* Animated gradient orbs */}
        <div
          ref={orbRef1}
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #0E5EFF 0%, transparent 70%)",
          }}
        />
        <div
          ref={orbRef2}
          className="pointer-events-none absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top: Logo */}
        <div className="absolute top-0 left-0 z-20 p-10">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="FlowFund logo"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </div>
        </div>

        {/* Center: Value prop */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 lg:px-16">
          <div className="max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Free to Get Started
            </div>
            <h1 className="text-4xl xl:text-5xl font-semibold leading-[1.15] tracking-tight text-white mb-5">
              Start growing
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                smarter today
              </span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed max-w-md">
              Join thousands of creators who use AI-powered insights to
              understand their audience and scale their content strategy.
            </p>
          </div>

          {/* Benefits list */}
          <div className="mt-12 space-y-4">
            {[
              "Cross-platform analytics in one dashboard",
              "AI-generated hashtag & content recommendations",
              "Real-time engagement tracking & alerts",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                  <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── RIGHT PANEL: Auth form ─── */}
      <div className="relative flex flex-1 flex-col items-center justify-center bg-[#F4F4F4] px-6 py-12 lg:px-16">
        {/* Subtle top-right accent blob */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/[0.06] blur-3xl" />

        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-3 lg:hidden">
          <img
            src={logo}
            alt="FlowFund logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        <div className="w-full max-w-[380px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Get started for free — no credit card required
            </p>
          </div>

          {/* Auth buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleSignup}
              className="group relative w-full justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-6 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                  className="h-5 w-5"
                />
              </span>
              Sign up with Google
            </Button>

            <Button
              variant="outline"
              onClick={handleSignup}
              className="group relative w-full justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-6 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
                </svg>
              </span>
              Sign up with Mobile
            </Button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Placeholder */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              More sign-up options coming soon
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
            By signing up, you agree to our{" "}
            <button className="text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors">
              Privacy Policy
            </button>
          </p>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} FlowFund</span>
          <span>·</span>
          <button className="hover:text-gray-600 transition-colors">Privacy</button>
          <span>·</span>
          <button className="hover:text-gray-600 transition-colors">Terms</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
