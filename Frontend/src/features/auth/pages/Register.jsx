import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({
      fullname: formData.fullName,
      contact: formData.contactNumber,
      email: formData.email,
      password: formData.password,
      isSeller: formData.isSeller,
    });

    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#050505] flex font-sans text-gray-200 overflow-hidden">
      {/* Left Side: Brand Imagery */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative bg-[#0a0a0a] items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
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
            Redefining Style.
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-base font-light leading-relaxed">
            Curated collections for the contemporary wardrobe. Premium fabrics,
            flawless fits.
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
              Join Snitch
            </h1>
            <p className="text-gray-500 text-sm font-light">
              Create an account to elevate your wardrobe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <label
                  className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-[#2A2A2A] text-white px-0 py-2 focus:outline-none focus:border-[#FFD700] transition-colors placeholder-gray-700 text-sm"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="relative">
                <label
                  className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-transparent border-b border-[#2A2A2A] text-white px-0 py-2 focus:outline-none focus:border-[#FFD700] transition-colors placeholder-gray-700 text-sm"
                  required
                />
              </div>

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

            {/* Is Seller Checkbox */}
            <div className="flex items-center space-x-3 pt-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="isSeller"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-[#2A2A2A] bg-transparent checked:border-[#FFD700] checked:bg-[#FFD700] transition-all focus:outline-none"
                />
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-[#050505] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label
                htmlFor="isSeller"
                className="text-xs text-gray-400 font-light cursor-pointer select-none hover:text-white transition-colors"
              >
                Register as a Seller
              </label>
            </div>
            <div className="pt-2">
              <a
                href="/api/auth/google"
                className="text-[#FFD700] hover:text-white transition-colors"
              >
                Continue with Google
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-[#050505] font-semibold px-4 py-3 sm:py-3.5 transition-all text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-light text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#FFD700] hover:underline hover:text-[#e6c200] transition-colors font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
