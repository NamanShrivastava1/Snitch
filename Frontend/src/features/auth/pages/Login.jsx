import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({
      email: formData.email,
      password: formData.password,
    });

    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#050505] flex font-sans text-gray-200 overflow-hidden">
      {/* Left Side: Brand Imagery */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative bg-[#0a0a0a] items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Fashion"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 hover:scale-105 z-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent z-0"></div>

        <div className="relative z-10 p-12 text-center w-full">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-[#FFD700]/30 rounded-full mb-6 bg-[#050505]/40 backdrop-blur-md">
            <span className="text-[#FFD700] text-xl font-light tracking-widest uppercase">
              SN
            </span>
          </div>
          <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
            Welcome Back.
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-base font-light leading-relaxed">
            Continue your journey. Premium fabrics, flawless fits.
          </p>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-md mx-auto py-8">
          <div className="lg:hidden mb-6 inline-flex items-center justify-center w-10 h-10 border border-[#FFD700]/30 rounded-full bg-transparent">
            <span className="text-[#FFD700] text-sm font-light tracking-widest uppercase">
              SN
            </span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-light text-white tracking-tight mb-2">
              Sign In
            </h1>
            <p className="text-gray-500 text-sm font-light">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              {/* Email */}
              <div className="relative">
                <label
                  className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-[#2A2A2A] text-white px-0 py-2 focus:outline-none focus:border-[#FFD700] transition-colors placeholder-gray-700 text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#2A2A2A] text-white px-0 py-2 focus:outline-none focus:border-[#FFD700] transition-colors placeholder-gray-700 text-sm"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-[#050505] font-semibold px-4 py-3 sm:py-3.5 transition-all text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              >
                Sign In
              </button>

              <div className="mt-4 bg-white">
                <ContinueWithGoogle />
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-light text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#FFD700] hover:underline hover:text-[#e6c200] transition-colors font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
